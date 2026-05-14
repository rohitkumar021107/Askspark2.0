import { useCallback, useEffect, useRef, useState } from "react";
import { rtdbGet, rtdbListen, rtdbRemove, rtdbSet } from "./useFirebaseRTDB";

const STUN = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export interface UseWebRTCReturn {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isMuted: boolean;
  isCameraOff: boolean;
  callState: "idle" | "connecting" | "connected" | "ended";
  startCall: (video: boolean) => Promise<void>;
  answerCall: () => Promise<void>;
  endCall: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
}

export function useWebRTC(
  callId: string,
  isInitiator: boolean,
): UseWebRTCReturn {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callState, setCallState] = useState<
    "idle" | "connecting" | "connected" | "ended"
  >("idle");
  const unsubs = useRef<Array<() => void>>([]);

  const cleanup = useCallback(() => {
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

  useEffect(() => () => cleanup(), [cleanup]);

  const buildPC = useCallback(
    (stream: MediaStream) => {
      const pc = new RTCPeerConnection(STUN);
      pcRef.current = pc;

      for (const t of stream.getTracks()) pc.addTrack(t, stream);

      const rs = new MediaStream();
      setRemoteStream(rs);

      pc.ontrack = (e) => {
        for (const t of e.streams[0]?.getTracks() ?? []) rs.addTrack(t);
        setRemoteStream(new MediaStream(rs.getTracks()));
      };

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          const role = isInitiator ? "caller" : "callee";
          const existing =
            (rtdbGet(`calls/${callId}/iceCandidates/${role}`) as unknown[]) ??
            [];
          rtdbSet(`calls/${callId}/iceCandidates/${role}`, [
            ...existing,
            e.candidate.toJSON(),
          ]);
        }
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") setCallState("connected");
        if (
          pc.connectionState === "disconnected" ||
          pc.connectionState === "failed"
        ) {
          setCallState("ended");
        }
      };

      // Listen for remote ICE candidates
      const remoteRole = isInitiator ? "callee" : "caller";
      const unsub = rtdbListen(
        `calls/${callId}/iceCandidates/${remoteRole}`,
        (val) => {
          const candidates = val as RTCIceCandidateInit[] | null;
          if (!candidates) return;
          for (const c of candidates) {
            pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {
              /* ignore */
            });
          }
        },
      );
      unsubs.current.push(unsub);

      return pc;
    },
    [callId, isInitiator],
  );

  const startCall = useCallback(
    async (video: boolean) => {
      setCallState("connecting");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video,
      });
      setLocalStream(stream);

      const pc = buildPC(stream);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      rtdbSet(`calls/${callId}/offer`, { type: offer.type, sdp: offer.sdp });

      // Listen for answer
      const unsub = rtdbListen(`calls/${callId}/answer`, async (val) => {
        const answer = val as { type: RTCSdpType; sdp: string } | null;
        if (!answer || pc.remoteDescription) return;
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      });
      unsubs.current.push(unsub);
    },
    [callId, buildPC],
  );

  const answerCall = useCallback(async () => {
    setCallState("connecting");
    const offerData = rtdbGet(`calls/${callId}/offer`) as {
      type: RTCSdpType;
      sdp: string;
    } | null;
    if (!offerData) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(stream);

    const pc = buildPC(stream);
    await pc.setRemoteDescription(new RTCSessionDescription(offerData));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    rtdbSet(`calls/${callId}/answer`, { type: answer.type, sdp: answer.sdp });
  }, [callId, buildPC]);

  const endCall = useCallback(() => {
    cleanup();
    rtdbRemove(`calls/${callId}`);
    setCallState("ended");
  }, [callId, cleanup]);

  const toggleMute = useCallback(() => {
    setLocalStream((s) => {
      if (!s) return s;
      const audio = s.getAudioTracks()[0];
      if (audio) audio.enabled = !audio.enabled;
      setIsMuted((m) => !m);
      return s;
    });
  }, []);

  const toggleCamera = useCallback(() => {
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
    toggleCamera,
  };
}
