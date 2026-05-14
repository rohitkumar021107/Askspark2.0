import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Mic, MicOff, Monitor, PhoneOff, Video, VideoOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface VideoCallModalProps {
  open: boolean;
  onClose: () => void;
  studentName: string;
  isTeacher?: boolean;
}

export default function VideoCallModal({
  open,
  onClose,
  studentName,
  isTeacher = true,
}: VideoCallModalProps) {
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!open) return;

    // Start timer
    setSeconds(0);
    timerRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // Request camera
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        toast.info("Camera unavailable — showing placeholder");
      });

    toast.info(
      "Video call feature — in real deployment this connects via WebRTC to the student.",
      { duration: 5000 },
    );

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        for (const t of streamRef.current.getTracks()) t.stop();
        streamRef.current = null;
      }
    };
  }, [open]);

  const handleEndCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (streamRef.current) {
      for (const t of streamRef.current.getTracks()) t.stop();
      streamRef.current = null;
    }
    onClose();
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      for (const t of streamRef.current.getVideoTracks()) {
        t.enabled = cameraOn;
      }
    }
    setCameraOn((v) => !v);
  };

  const toggleMute = () => {
    if (streamRef.current) {
      for (const t of streamRef.current.getAudioTracks()) {
        t.enabled = muted;
      }
    }
    setMuted((v) => !v);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleEndCall()}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden rounded-2xl bg-gray-950 border-gray-800"
        data-ocid="videocall.dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-900/80 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold">
              AskIQ Video Session
            </span>
          </div>
          <div className="text-gray-400 text-sm font-mono">
            {formatTime(seconds)}
          </div>
        </div>

        {/* Video panels */}
        <div className="flex gap-2 p-4 bg-gray-950">
          {/* Student / Remote panel */}
          <div className="flex-1 relative rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900 to-violet-900 aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
                {studentName.charAt(0)}
              </div>
              <div className="text-white/80 text-sm font-medium">
                {studentName}
              </div>
              <div className="text-white/40 text-xs mt-1">
                {isTeacher ? "Student" : "Teacher"}
              </div>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
              {studentName}
            </div>
          </div>

          {/* Self / Teacher panel */}
          <div className="w-48 relative rounded-xl overflow-hidden bg-gray-800 aspect-video flex items-center justify-center">
            {cameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <VideoOff className="w-8 h-8 text-gray-500" />
                <span className="text-gray-500 text-xs">Camera off</span>
              </div>
            )}
            {!streamRef.current && cameraOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <VideoOff className="w-8 h-8 text-gray-500 mx-auto mb-1" />
                  <span className="text-gray-500 text-xs">
                    Camera unavailable
                  </span>
                </div>
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
              You
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 px-5 py-4 bg-gray-900/80 border-t border-gray-800">
          <Button
            size="icon"
            variant="secondary"
            className={`rounded-full w-12 h-12 ${
              muted
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            onClick={toggleMute}
            data-ocid="videocall.toggle"
          >
            {muted ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>

          <Button
            size="icon"
            variant="secondary"
            className={`rounded-full w-12 h-12 ${
              !cameraOn
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            onClick={toggleCamera}
            data-ocid="videocall.toggle"
          >
            {cameraOn ? (
              <Video className="w-5 h-5" />
            ) : (
              <VideoOff className="w-5 h-5" />
            )}
          </Button>

          <Button
            size="icon"
            variant="secondary"
            className="rounded-full w-12 h-12 bg-gray-700 text-white hover:bg-gray-600"
            onClick={() =>
              toast.info("Screen sharing would require WebRTC in production.")
            }
            data-ocid="videocall.secondary_button"
          >
            <Monitor className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600 text-white border-0"
            onClick={handleEndCall}
            data-ocid="videocall.delete_button"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
