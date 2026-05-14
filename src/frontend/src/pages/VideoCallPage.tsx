import { loadLocalProfile } from "@/hooks/useLocalProfile";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Camera, CameraOff, Mic, MicOff, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function VideoCallPage() {
  const { callId } = useParams({ strict: false }) as { callId: string };
  const search = useSearch({ strict: false }) as {
    role?: string;
    callType?: string;
  };
  const role = search.role ?? "callee";
  const callType = search.callType ?? "video";
  const isInitiator = role === "caller";
  const navigate = useNavigate();
  const localProfile = loadLocalProfile();
  const myName = localProfile?.displayName ?? "You";

  const {
    localStream,
    remoteStream,
    isMuted,
    isCameraOff,
    callState,
    startCall,
    answerCall,
    endCall,
    toggleMute,
    toggleCamera,
  } = useWebRTC(callId, isInitiator);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  // Keep stable refs so the auto-start effect doesn't re-run
  const startCallRef = useRef(startCall);
  const answerCallRef = useRef(answerCall);
  useEffect(() => {
    startCallRef.current = startCall;
  }, [startCall]);
  useEffect(() => {
    answerCallRef.current = answerCall;
  }, [answerCall]);

  // Duration timer
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (callState !== "connected") return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [callState]);

  function fmtTime(s: number) {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  // Attach streams to video elements
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Auto-start on mount only
  const isInitiatorRef = useRef(isInitiator);
  const callTypeRef = useRef(callType);
  useEffect(() => {
    if (isInitiatorRef.current) {
      startCallRef.current(callTypeRef.current === "video");
    } else {
      answerCallRef.current();
    }
  }, []);

  // Navigate back when call ends
  useEffect(() => {
    if (callState === "ended") {
      const profile = loadLocalProfile();
      navigate({
        to:
          profile?.role === "teacher"
            ? "/dashboard/teacher"
            : "/dashboard/student",
      });
    }
  }, [callState, navigate]);

  const isVideoCall = callType === "video";

  return (
    <div
      className="fixed inset-0 bg-gray-950 flex flex-col"
      data-ocid="call.page"
    >
      {/* Remote area */}
      <div className="flex-1 relative flex items-center justify-center">
        {isVideoCall ? (
          // biome-ignore lint/a11y/useMediaCaption: video call — captions not applicable
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-5xl font-bold text-white">
              ?
            </div>
            <p className="text-white/60 text-sm">Audio call in progress</p>
          </div>
        )}

        {/* Call state overlay */}
        {callState === "connecting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center text-white">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.4,
                }}
                className="text-lg font-semibold"
              >
                {isInitiator ? "Calling…" : "Connecting…"}
              </motion.div>
            </div>
          </div>
        )}

        {/* Local PiP video */}
        {isVideoCall && (
          <div className="absolute bottom-6 right-6 w-32 h-24 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-gray-900">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="text-white">
            <div className="font-bold text-sm">{myName}</div>
            <div className="text-white/60 text-xs">
              {callState === "connected" ? fmtTime(seconds) : callState}
            </div>
          </div>
          <div className="text-white/60 text-xs">
            {callType === "video" ? "📹 Video" : "📞 Audio"}
          </div>
        </div>
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-center gap-6 py-6 bg-gray-900/90 backdrop-blur-md">
        <button
          type="button"
          onClick={toggleMute}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
            isMuted
              ? "bg-red-600 text-white"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
          data-ocid="call.toggle"
        >
          {isMuted ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        {isVideoCall && (
          <button
            type="button"
            onClick={toggleCamera}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isCameraOff
                ? "bg-red-600 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
            data-ocid="call.secondary_button"
          >
            {isCameraOff ? (
              <CameraOff className="w-6 h-6" />
            ) : (
              <Camera className="w-6 h-6" />
            )}
          </button>
        )}

        <button
          type="button"
          onClick={endCall}
          className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors"
          data-ocid="call.delete_button"
        >
          <Phone className="w-7 h-7 rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
}
