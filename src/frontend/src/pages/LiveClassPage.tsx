import LiveChatPanel from "@/components/LiveChatPanel";
import LiveDoubtPanel from "@/components/LiveDoubtPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  rtdbGet,
  rtdbListen,
  rtdbRemove,
  rtdbSet,
} from "@/hooks/useFirebaseRTDB";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import {
  Camera,
  CameraOff,
  Download,
  Mic,
  MicOff,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const STUN = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export default function LiveClassPage() {
  const { classId } = useParams({ strict: false }) as { classId: string };
  const search = useSearch({ strict: false }) as { role?: string };
  const isHost = (search.role ?? "viewer") === "host";
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") ?? "guest";

  const [classInfo, setClassInfo] = useState<{
    title: string;
    subject: string;
    hostName: string;
  } | null>(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [classEnded, setClassEnded] = useState(false);
  const chatTopicsRef = useRef<string[]>([]);

  const localStream = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const unsubs = useRef<Array<() => void>>([]);

  // Load class info
  useEffect(() => {
    const unsub = rtdbListen(`liveClasses/${classId}`, (val) => {
      const data = val as {
        title: string;
        subject: string;
        hostName: string;
        viewerCount?: number;
        active?: boolean;
      } | null;
      if (!data || !data.active) {
        if (!isHost) {
          toast.error("Class has ended.");
          navigate({ to: "/dashboard/student" });
        }
        return;
      }
      setClassInfo({
        title: data.title,
        subject: data.subject,
        hostName: data.hostName,
      });
      setViewerCount(data.viewerCount ?? 0);
    });
    unsubs.current.push(unsub);
    return () => {
      for (const u of unsubs.current) u();
      unsubs.current = [];
    };
  }, [classId, isHost, navigate]);

  // HOST: start streaming
  const startStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStream.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsStreaming(true);

      // Listen for viewer connections
      const unsub = rtdbListen(`liveClasses/${classId}/viewers`, (val) => {
        const viewers = val as Record<
          string,
          {
            offer?: { type: RTCSdpType; sdp: string };
            answer?: { type: RTCSdpType; sdp: string };
          }
        > | null;
        if (!viewers) return;
        for (const [viewerId, viewerData] of Object.entries(viewers)) {
          if (!viewerData.offer || pcsRef.current.has(viewerId)) continue;
          handleViewerOffer(viewerId, viewerData.offer);
        }
      });
      unsubs.current.push(unsub);
    } catch {
      toast.error("Could not access camera/microphone.");
    }
  }, [classId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleViewerOffer(
    viewerId: string,
    offer: { type: RTCSdpType; sdp: string },
  ) {
    const pc = new RTCPeerConnection(STUN);
    pcsRef.current.set(viewerId, pc);

    if (localStream.current) {
      for (const t of localStream.current.getTracks()) {
        pc.addTrack(t, localStream.current);
      }
    }

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        const existing =
          (rtdbGet(
            `liveClasses/${classId}/viewers/${viewerId}/hostCandidates`,
          ) as unknown[]) ?? [];
        rtdbSet(`liveClasses/${classId}/viewers/${viewerId}/hostCandidates`, [
          ...existing,
          e.candidate.toJSON(),
        ]);
      }
    };

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    rtdbSet(`liveClasses/${classId}/viewers/${viewerId}/answer`, {
      type: answer.type,
      sdp: answer.sdp,
    });

    // Listen for viewer ICE candidates
    const unsub = rtdbListen(
      `liveClasses/${classId}/viewers/${viewerId}/candidates`,
      (val) => {
        const candidates = val as RTCIceCandidateInit[] | null;
        if (!candidates) return;
        for (const c of candidates)
          pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {});
      },
    );
    unsubs.current.push(unsub);
  }

  // VIEWER: connect to host
  useEffect(() => {
    if (isHost) return;
    let pc: RTCPeerConnection | null = null;

    async function connectToHost() {
      pc = new RTCPeerConnection(STUN);
      const rs = new MediaStream();
      if (videoRef.current) videoRef.current.srcObject = rs;

      pc.ontrack = (e) => {
        for (const t of e.streams[0]?.getTracks() ?? []) rs.addTrack(t);
        if (videoRef.current)
          videoRef.current.srcObject = new MediaStream(rs.getTracks());
      };

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          const existing =
            (rtdbGet(
              `liveClasses/${classId}/viewers/${userId}/candidates`,
            ) as unknown[]) ?? [];
          rtdbSet(`liveClasses/${classId}/viewers/${userId}/candidates`, [
            ...existing,
            e.candidate.toJSON(),
          ]);
        }
      };

      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pc.setLocalDescription(offer);
      rtdbSet(`liveClasses/${classId}/viewers/${userId}/offer`, {
        type: offer.type,
        sdp: offer.sdp,
      });

      // Increment viewer count
      const current =
        (rtdbGet(`liveClasses/${classId}/viewerCount`) as number) ?? 0;
      rtdbSet(`liveClasses/${classId}/viewerCount`, current + 1);

      // Wait for answer
      const unsub = rtdbListen(
        `liveClasses/${classId}/viewers/${userId}/answer`,
        async (val) => {
          const answer = val as { type: RTCSdpType; sdp: string } | null;
          if (!answer || pc?.remoteDescription) return;
          await pc?.setRemoteDescription(new RTCSessionDescription(answer));
        },
      );
      unsubs.current.push(unsub);

      // Host ICE candidates
      const unsub2 = rtdbListen(
        `liveClasses/${classId}/viewers/${userId}/hostCandidates`,
        (val) => {
          const candidates = val as RTCIceCandidateInit[] | null;
          if (!candidates) return;
          for (const c of candidates)
            pc?.addIceCandidate(new RTCIceCandidate(c)).catch(() => {});
        },
      );
      unsubs.current.push(unsub2);
    }

    connectToHost().catch(() =>
      toast.error("Failed to connect to class stream."),
    );

    return () => {
      pc?.close();
      rtdbRemove(`liveClasses/${classId}/viewers/${userId}`);
      const current =
        (rtdbGet(`liveClasses/${classId}/viewerCount`) as number) ?? 1;
      rtdbSet(`liveClasses/${classId}/viewerCount`, Math.max(0, current - 1));
    };
  }, [classId, isHost, userId]);

  function stopStream() {
    if (localStream.current) {
      for (const t of localStream.current.getTracks()) t.stop();
    }
    localStream.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsStreaming(false);
  }

  function toggleMute() {
    const audio = localStream.current?.getAudioTracks()[0];
    if (audio) {
      audio.enabled = !audio.enabled;
      setIsMuted((m) => !m);
    }
  }

  function toggleCamera() {
    const video = localStream.current?.getVideoTracks()[0];
    if (video) {
      video.enabled = !video.enabled;
      setIsCameraOff((c) => !c);
    }
  }

  function endClass() {
    stopStream();
    for (const u of unsubs.current) u();
    for (const pc of pcsRef.current.values()) pc.close();
    pcsRef.current.clear();
    rtdbRemove(`liveClasses/${classId}`);
    toast.success("Class ended.");
    setClassEnded(true);
  }

  function downloadNotesPDF() {
    const title = classInfo?.title ?? "Live Class";
    const subject = classInfo?.subject ?? "";
    const topics =
      chatTopicsRef.current.length > 0
        ? chatTopicsRef.current.slice(0, 10)
        : ["General discussion covered during the class."];
    const lines = [
      `Notes: ${title}`,
      subject ? `Subject: ${subject}` : "",
      `Date: ${new Date().toLocaleDateString()}`,
      "",
      "Topics Covered:",
      ...topics.map((t) => `  • ${t}`),
      "",
      "Key Points:",
      "  • Review the session recording",
      "  • Practice related DPP questions on AskSpark",
      "  • Ask follow-up doubts on AskSpark",
      "",
      "Generated by AskSpark · askspark.caffeine.ai",
    ]
      .filter((l) => l !== undefined)
      .join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}_notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Notes downloaded!");
  }

  function leaveClass() {
    for (const u of unsubs.current) u();
    navigate({ to: "/dashboard/student" });
  }

  return (
    <div
      className="flex flex-col h-screen bg-gray-950"
      data-ocid="liveclass.page"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white font-bold text-sm">
            {classInfo?.title ?? "Live Class"}
          </span>
          {classInfo?.subject && (
            <Badge className="bg-purple-600/30 text-purple-300 border-purple-600/50">
              {classInfo.subject}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/60 text-xs flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {viewerCount}
          </span>
          {isHost ? (
            <div className="flex items-center gap-2">
              {classEnded ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/10"
                  onClick={downloadNotesPDF}
                  data-ocid="liveclass.save_button"
                >
                  <Download className="w-4 h-4 mr-1" /> Download Notes PDF
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={endClass}
                  data-ocid="liveclass.delete_button"
                >
                  End Class
                </Button>
              )}
              {classEnded && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white/60 hover:text-white"
                  onClick={() => navigate({ to: "/dashboard/teacher" })}
                  data-ocid="liveclass.link"
                >
                  Exit →
                </Button>
              )}
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={leaveClass}
              className="text-white border-white/30 hover:bg-white/10"
              data-ocid="liveclass.cancel_button"
            >
              <X className="w-4 h-4 mr-1" /> Leave
            </Button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative bg-black flex items-center justify-center">
            {/* biome-ignore lint/a11y/useMediaCaption: live class stream */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={isHost}
              className="w-full h-full object-contain"
            />
            {isHost && !isStreaming && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/60 mb-4">Camera is off</p>
                  <Button
                    onClick={startStream}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    data-ocid="liveclass.primary_button"
                  >
                    <Camera className="w-4 h-4 mr-2" /> Start Streaming
                  </Button>
                </div>
              </div>
            )}
            {!isHost && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-black/60 text-white border-0 text-xs">
                  {classInfo?.hostName ?? "Teacher"} is presenting
                </Badge>
              </div>
            )}
          </div>

          {/* Host controls */}
          {isHost && isStreaming && (
            <div className="flex items-center justify-center gap-4 py-3 bg-gray-900">
              <button
                type="button"
                onClick={toggleMute}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                  isMuted ? "bg-red-600" : "bg-white/20 hover:bg-white/30"
                } text-white`}
                data-ocid="liveclass.toggle"
              >
                {isMuted ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
              <button
                type="button"
                onClick={toggleCamera}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                  isCameraOff ? "bg-red-600" : "bg-white/20 hover:bg-white/30"
                } text-white`}
                data-ocid="liveclass.secondary_button"
              >
                {isCameraOff ? (
                  <CameraOff className="w-5 h-5" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </button>
              <button
                type="button"
                onClick={stopStream}
                className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="w-80 bg-gray-900/60 border-l border-white/10 flex flex-col">
          <Tabs defaultValue="chat" className="flex flex-col h-full">
            <TabsList className="m-2 grid grid-cols-2 bg-gray-800">
              <TabsTrigger
                value="chat"
                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-gray-700"
                data-ocid="liveclass.tab"
              >
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="doubts"
                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-gray-700"
                data-ocid="liveclass.tab"
              >
                Doubts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1 overflow-hidden mt-0">
              <LiveChatPanel classId={classId} isHost={isHost} />
            </TabsContent>
            <TabsContent value="doubts" className="flex-1 overflow-hidden mt-0">
              <LiveDoubtPanel classId={classId} isHost={isHost} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
