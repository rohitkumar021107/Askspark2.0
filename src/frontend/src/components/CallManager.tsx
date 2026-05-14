import { rtdbListen, rtdbRemove } from "@/hooks/useFirebaseRTDB";
import { useNavigate } from "@tanstack/react-router";
import { Phone, PhoneOff, Video } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface IncomingCall {
  callId: string;
  callerName: string;
  callType: "audio" | "video";
}

export default function CallManager() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") ?? "";
  const [incoming, setIncoming] = useState<IncomingCall | null>(null);
  const ringRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!userId) return;
    const unsub = rtdbListen(`calls/${userId}/incoming`, (val) => {
      const data = val as IncomingCall | null;
      if (data?.callId) {
        setIncoming(data);
      } else {
        setIncoming(null);
      }
    });
    return unsub;
  }, [userId]);

  // Ring timeout — auto-decline after 30s
  useEffect(() => {
    if (incoming) {
      ringRef.current = setTimeout(() => decline(), 30_000);
    }
    return () => {
      if (ringRef.current) clearTimeout(ringRef.current);
    };
  }, [incoming]); // eslint-disable-line react-hooks/exhaustive-deps

  function accept() {
    if (!incoming) return;
    rtdbRemove(`calls/${userId}/incoming`);
    navigate({
      to: `/call/${incoming.callId}`,
      search: { role: "callee", callType: incoming.callType },
    });
    setIncoming(null);
  }

  function decline() {
    if (!incoming) return;
    rtdbRemove(`calls/${userId}/incoming`);
    rtdbRemove(`calls/${incoming.callId}`);
    setIncoming(null);
  }

  return (
    <AnimatePresence>
      {incoming && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md"
          data-ocid="call.modal"
        >
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 40 }}
            className="flex flex-col items-center gap-6 p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
          >
            {/* Pulsing avatar ring */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-green-400/30"
                animate={{ scale: [1, 1.6, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.6,
                  ease: "easeInOut",
                }}
              />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white z-10">
                {incoming.callerName.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="text-center">
              <div className="text-white font-bold text-xl">
                {incoming.callerName}
              </div>
              <div className="text-white/70 text-sm mt-1 flex items-center justify-center gap-1.5">
                {incoming.callType === "video" ? (
                  <>
                    <Video className="w-4 h-4" /> Incoming video call
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4" /> Incoming audio call
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-8">
              <button
                type="button"
                onClick={decline}
                className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors shadow-lg"
                data-ocid="call.cancel_button"
              >
                <PhoneOff className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={accept}
                className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors shadow-lg"
                data-ocid="call.confirm_button"
              >
                <Phone className="w-7 h-7" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
