import { c as createLucideIcon, u as useNavigate, j as jsxRuntimeExports, r as reactExports, e as ue, V as Video, P as PhoneOff } from "./index-CiicjzrK.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { D as Dialog, a as DialogContent } from "./dialog-DaVgRmoe.js";
import { a as MicOff, M as Mic } from "./mic-BzIhrvTG.js";
import { M as Monitor } from "./monitor-BQbe68LJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const VideoOff = createLucideIcon("video-off", __iconNode);
function getInitials(name) {
  return name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
function AvatarButton({
  imageUrl,
  name,
  size = "sm"
}) {
  const navigate = useNavigate();
  const dim = size === "md" ? "w-14 h-14" : "w-10 h-10";
  const textSize = size === "md" ? "text-lg" : "text-sm";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => navigate({ to: "/profile" }),
      className: `${dim} rounded-full flex-shrink-0 overflow-hidden shadow-md hover:ring-2 hover:ring-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/60`,
      "aria-label": "Go to profile",
      "data-ocid": "nav.link",
      children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageUrl, alt: name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-full h-full gradient-primary flex items-center justify-center text-white font-bold ${textSize}`,
          children: getInitials(name)
        }
      )
    }
  );
}
function VideoCallModal({
  open,
  onClose,
  studentName,
  isTeacher = true
}) {
  const [muted, setMuted] = reactExports.useState(false);
  const [cameraOn, setCameraOn] = reactExports.useState(true);
  const [seconds, setSeconds] = reactExports.useState(0);
  const videoRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) return;
    setSeconds(0);
    timerRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1e3);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }).catch(() => {
      ue.info("Camera unavailable — showing placeholder");
    });
    ue.info(
      "Video call feature — in real deployment this connects via WebRTC to the student.",
      { duration: 5e3 }
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
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && handleEndCall(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl p-0 overflow-hidden rounded-2xl bg-gray-950 border-gray-800",
      "data-ocid": "videocall.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-gray-900/80 border-b border-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-red-500 rounded-full animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-sm font-semibold", children: "AskIQ Video Session" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 text-sm font-mono", children: formatTime(seconds) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 p-4 bg-gray-950", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900 to-violet-900 aspect-video flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3", children: studentName.charAt(0) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 text-sm font-medium", children: studentName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/40 text-xs mt-1", children: isTeacher ? "Student" : "Teacher" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg", children: studentName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 relative rounded-xl overflow-hidden bg-gray-800 aspect-video flex items-center justify-center", children: [
            cameraOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                ref: videoRef,
                autoPlay: true,
                muted: true,
                playsInline: true,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "w-8 h-8 text-gray-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 text-xs", children: "Camera off" })
            ] }),
            !streamRef.current && cameraOn && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "w-8 h-8 text-gray-500 mx-auto mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 text-xs", children: "Camera unavailable" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg", children: "You" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 px-5 py-4 bg-gray-900/80 border-t border-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              variant: "secondary",
              className: `rounded-full w-12 h-12 ${muted ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-gray-700 text-white hover:bg-gray-600"}`,
              onClick: toggleMute,
              "data-ocid": "videocall.toggle",
              children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              variant: "secondary",
              className: `rounded-full w-12 h-12 ${!cameraOn ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-gray-700 text-white hover:bg-gray-600"}`,
              onClick: toggleCamera,
              "data-ocid": "videocall.toggle",
              children: cameraOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              variant: "secondary",
              className: "rounded-full w-12 h-12 bg-gray-700 text-white hover:bg-gray-600",
              onClick: () => ue.info("Screen sharing would require WebRTC in production."),
              "data-ocid": "videocall.secondary_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              className: "rounded-full w-14 h-14 bg-red-500 hover:bg-red-600 text-white border-0",
              onClick: handleEndCall,
              "data-ocid": "videocall.delete_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "w-6 h-6" })
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  AvatarButton as A,
  LogOut as L,
  VideoCallModal as V
};
