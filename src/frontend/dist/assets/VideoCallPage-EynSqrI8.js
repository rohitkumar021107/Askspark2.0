import { r as reactExports, a3 as rtdbGet, i as rtdbSet, f as rtdbListen, a4 as rtdbRemove, Y as useParams, b as useSearch, u as useNavigate, l as loadLocalProfile, j as jsxRuntimeExports, m as motion, a5 as Phone } from "./index-CiicjzrK.js";
import { a as MicOff, M as Mic } from "./mic-BzIhrvTG.js";
import { C as CameraOff } from "./camera-off-Dj72jOoH.js";
import { C as Camera } from "./camera-6BIszl99.js";
const STUN = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
function useWebRTC(callId, isInitiator) {
  const pcRef = reactExports.useRef(null);
  const [localStream, setLocalStream] = reactExports.useState(null);
  const [remoteStream, setRemoteStream] = reactExports.useState(null);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [isCameraOff, setIsCameraOff] = reactExports.useState(false);
  const [callState, setCallState] = reactExports.useState("idle");
  const unsubs = reactExports.useRef([]);
  const cleanup = reactExports.useCallback(() => {
    for (const u of unsubs.current) u();
    unsubs.current = [];
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    setLocalStream((s) => {
      if (s) {
        for (const t of s.getTracks()) t.stop();
      }
      return null;
    });
    setRemoteStream(null);
  }, []);
  reactExports.useEffect(() => () => cleanup(), [cleanup]);
  const buildPC = reactExports.useCallback(
    (stream) => {
      const pc = new RTCPeerConnection(STUN);
      pcRef.current = pc;
      for (const t of stream.getTracks()) pc.addTrack(t, stream);
      const rs = new MediaStream();
      setRemoteStream(rs);
      pc.ontrack = (e) => {
        var _a;
        for (const t of ((_a = e.streams[0]) == null ? void 0 : _a.getTracks()) ?? []) rs.addTrack(t);
        setRemoteStream(new MediaStream(rs.getTracks()));
      };
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          const role = isInitiator ? "caller" : "callee";
          const existing = rtdbGet(`calls/${callId}/iceCandidates/${role}`) ?? [];
          rtdbSet(`calls/${callId}/iceCandidates/${role}`, [
            ...existing,
            e.candidate.toJSON()
          ]);
        }
      };
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") setCallState("connected");
        if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
          setCallState("ended");
        }
      };
      const remoteRole = isInitiator ? "callee" : "caller";
      const unsub = rtdbListen(
        `calls/${callId}/iceCandidates/${remoteRole}`,
        (val) => {
          const candidates = val;
          if (!candidates) return;
          for (const c of candidates) {
            pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {
            });
          }
        }
      );
      unsubs.current.push(unsub);
      return pc;
    },
    [callId, isInitiator]
  );
  const startCall = reactExports.useCallback(
    async (video) => {
      setCallState("connecting");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video
      });
      setLocalStream(stream);
      const pc = buildPC(stream);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      rtdbSet(`calls/${callId}/offer`, { type: offer.type, sdp: offer.sdp });
      const unsub = rtdbListen(`calls/${callId}/answer`, async (val) => {
        const answer = val;
        if (!answer || pc.remoteDescription) return;
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      });
      unsubs.current.push(unsub);
    },
    [callId, buildPC]
  );
  const answerCall = reactExports.useCallback(async () => {
    setCallState("connecting");
    const offerData = rtdbGet(`calls/${callId}/offer`);
    if (!offerData) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    setLocalStream(stream);
    const pc = buildPC(stream);
    await pc.setRemoteDescription(new RTCSessionDescription(offerData));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    rtdbSet(`calls/${callId}/answer`, { type: answer.type, sdp: answer.sdp });
  }, [callId, buildPC]);
  const endCall = reactExports.useCallback(() => {
    cleanup();
    rtdbRemove(`calls/${callId}`);
    setCallState("ended");
  }, [callId, cleanup]);
  const toggleMute = reactExports.useCallback(() => {
    setLocalStream((s) => {
      if (!s) return s;
      const audio = s.getAudioTracks()[0];
      if (audio) audio.enabled = !audio.enabled;
      setIsMuted((m) => !m);
      return s;
    });
  }, []);
  const toggleCamera = reactExports.useCallback(() => {
    setLocalStream((s) => {
      if (!s) return s;
      const video = s.getVideoTracks()[0];
      if (video) video.enabled = !video.enabled;
      setIsCameraOff((c) => !c);
      return s;
    });
  }, []);
  return {
    localStream,
    remoteStream,
    isMuted,
    isCameraOff,
    callState,
    startCall,
    answerCall,
    endCall,
    toggleMute,
    toggleCamera
  };
}
function VideoCallPage() {
  const { callId } = useParams({ strict: false });
  const search = useSearch({ strict: false });
  const role = search.role ?? "callee";
  const callType = search.callType ?? "video";
  const isInitiator = role === "caller";
  const navigate = useNavigate();
  const localProfile = loadLocalProfile();
  const myName = (localProfile == null ? void 0 : localProfile.displayName) ?? "You";
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
    toggleCamera
  } = useWebRTC(callId, isInitiator);
  const localVideoRef = reactExports.useRef(null);
  const remoteVideoRef = reactExports.useRef(null);
  const startCallRef = reactExports.useRef(startCall);
  const answerCallRef = reactExports.useRef(answerCall);
  reactExports.useEffect(() => {
    startCallRef.current = startCall;
  }, [startCall]);
  reactExports.useEffect(() => {
    answerCallRef.current = answerCall;
  }, [answerCall]);
  const [seconds, setSeconds] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (callState !== "connected") return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1e3);
    return () => clearInterval(t);
  }, [callState]);
  function fmtTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }
  reactExports.useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);
  reactExports.useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);
  const isInitiatorRef = reactExports.useRef(isInitiator);
  const callTypeRef = reactExports.useRef(callType);
  reactExports.useEffect(() => {
    if (isInitiatorRef.current) {
      startCallRef.current(callTypeRef.current === "video");
    } else {
      answerCallRef.current();
    }
  }, []);
  reactExports.useEffect(() => {
    if (callState === "ended") {
      const profile = loadLocalProfile();
      navigate({
        to: (profile == null ? void 0 : profile.role) === "teacher" ? "/dashboard/teacher" : "/dashboard/student"
      });
    }
  }, [callState, navigate]);
  const isVideoCall = callType === "video";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 bg-gray-950 flex flex-col",
      "data-ocid": "call.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative flex items-center justify-center", children: [
          isVideoCall ? (
            // biome-ignore lint/a11y/useMediaCaption: video call — captions not applicable
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                ref: remoteVideoRef,
                autoPlay: true,
                playsInline: true,
                className: "w-full h-full object-cover"
              }
            )
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-5xl font-bold text-white", children: "?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm", children: "Audio call in progress" })
          ] }),
          callState === "connecting" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { opacity: [0.4, 1, 0.4] },
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.4
              },
              className: "text-lg font-semibold",
              children: isInitiator ? "Calling…" : "Connecting…"
            }
          ) }) }),
          isVideoCall && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 right-6 w-32 h-24 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              ref: localVideoRef,
              autoPlay: true,
              playsInline: true,
              muted: true,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/60 to-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm", children: myName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/60 text-xs", children: callState === "connected" ? fmtTime(seconds) : callState })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/60 text-xs", children: callType === "video" ? "📹 Video" : "📞 Audio" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 py-6 bg-gray-900/90 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: toggleMute,
              className: `w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isMuted ? "bg-red-600 text-white" : "bg-white/20 text-white hover:bg-white/30"}`,
              "data-ocid": "call.toggle",
              children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-6 h-6" })
            }
          ),
          isVideoCall && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: toggleCamera,
              className: `w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isCameraOff ? "bg-red-600 text-white" : "bg-white/20 text-white hover:bg-white/30"}`,
              "data-ocid": "call.secondary_button",
              children: isCameraOff ? /* @__PURE__ */ jsxRuntimeExports.jsx(CameraOff, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: endCall,
              className: "w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors",
              "data-ocid": "call.delete_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-7 h-7 rotate-[135deg]" })
            }
          )
        ] })
      ]
    }
  );
}
export {
  VideoCallPage as default
};
