import { c as createLucideIcon, l as loadLocalProfile, r as reactExports, f as rtdbListen, j as jsxRuntimeExports, Q as rtdbPush, e as ue, i as rtdbSet, Y as useParams, b as useSearch, u as useNavigate, a3 as rtdbGet, a4 as rtdbRemove } from "./index-CiicjzrK.js";
import { B as Badge } from "./badge-Ncr4NsWM.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { I as Input } from "./input-D9SZkx1r.js";
import { S as ScrollArea } from "./scroll-area-QUII3CK_.js";
import { S as Send } from "./send-adheBpJl.js";
import { T as Textarea } from "./textarea-B84xdT9O.js";
import { C as CircleHelp } from "./circle-help-Ca6S-XBl.js";
import { C as CircleCheck } from "./circle-check-Dos6jNK6.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CKDsVIvG.js";
import { U as Users } from "./users-BBY2vuqG.js";
import { X } from "./x-Sd9Di6ji.js";
import { C as Camera } from "./camera-6BIszl99.js";
import { a as MicOff, M as Mic } from "./mic-BzIhrvTG.js";
import { C as CameraOff } from "./camera-off-Dj72jOoH.js";
import "./utils-C0ugf0YY.js";
import "./index-BUlsMpCV.js";
import "./index-UGGF_iej.js";
import "./index-C7zsWbmt.js";
import "./index-BjI1O3hJ.js";
import "./index-IXOTxK3N.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
function LiveChatPanel({ classId, isHost }) {
  const profile = loadLocalProfile();
  const userId = localStorage.getItem("userId") ?? "guest";
  const userName = (profile == null ? void 0 : profile.displayName) ?? "Student";
  const [messages, setMessages] = reactExports.useState([]);
  const [text, setText] = reactExports.useState("");
  const bottomRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const unsub = rtdbListen(`liveClasses/${classId}/chat`, (val) => {
      const raw = val;
      if (!raw) {
        setMessages([]);
        return;
      }
      const msgs = Object.entries(raw).map(([id, m]) => ({ ...m, id })).sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgs);
    });
    return unsub;
  }, [classId]);
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const msg = {
      userId,
      userName,
      text: trimmed,
      timestamp: Date.now(),
      isHost
    };
    rtdbPush(`liveClasses/${classId}/chat`, msg);
    setText("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollArea, { className: "flex-1 px-3 py-2", children: [
      messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground text-xs py-6", children: "No messages yet. Say hi! 👋" }),
      messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `mb-2 flex gap-2 ${m.userId === userId ? "flex-row-reverse" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0", children: m.userName.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `max-w-[80%] ${m.userId === userId ? "items-end" : "items-start"} flex flex-col`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: m.userName }),
                    m.isHost && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] px-1.5 py-0 bg-amber-100 text-amber-700 border-amber-200", children: "Teacher" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `rounded-2xl px-3 py-1.5 text-sm ${m.userId === userId ? "bg-primary text-primary-foreground" : "bg-muted"}`,
                      children: m.text
                    }
                  )
                ]
              }
            )
          ]
        },
        m.id ?? m.timestamp
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 p-3 border-t border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: text,
          onChange: (e) => setText(e.target.value),
          placeholder: "Type a message…",
          className: "flex-1 text-sm",
          onKeyDown: (e) => e.key === "Enter" && send(),
          "data-ocid": "livechat.input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: send,
          disabled: !text.trim(),
          "data-ocid": "livechat.primary_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
        }
      )
    ] })
  ] });
}
function LiveDoubtPanel({ classId, isHost }) {
  const profile = loadLocalProfile();
  const userId = localStorage.getItem("userId") ?? "guest";
  const userName = (profile == null ? void 0 : profile.displayName) ?? "Student";
  const [doubts, setDoubts] = reactExports.useState([]);
  const [text, setText] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const unsub = rtdbListen(`liveClasses/${classId}/doubts`, (val) => {
      const raw = val;
      if (!raw) {
        setDoubts([]);
        return;
      }
      const list = Object.entries(raw).map(([id, d]) => ({ ...d, id })).sort((a, b) => a.timestamp - b.timestamp);
      setDoubts(list);
    });
    return unsub;
  }, [classId]);
  function ask() {
    const trimmed = text.trim();
    if (!trimmed) return;
    rtdbPush(`liveClasses/${classId}/doubts`, {
      userId,
      userName,
      text: trimmed,
      timestamp: Date.now(),
      answered: false
    });
    setText("");
    setSubmitted(true);
    ue.success("Doubt sent to teacher!");
    setTimeout(() => setSubmitted(false), 3e3);
  }
  function markAnswered(doubt) {
    rtdbSet(`liveClasses/${classId}/doubts/${doubt.id}/answered`, true);
  }
  const pending = doubts.filter((d) => !d.answered);
  const answered = doubts.filter((d) => d.answered);
  if (!isHost) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full p-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 text-amber-500" }),
        "Ask a Doubt"
      ] }),
      submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center flex-1 text-center gap-2 text-green-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Doubt sent!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Teacher will address it shortly." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: text,
            onChange: (e) => setText(e.target.value),
            placeholder: "What would you like to ask?",
            className: "flex-1 resize-none text-sm min-h-[100px]",
            "data-ocid": "doubt.textarea"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: ask,
            disabled: !text.trim(),
            className: "w-full",
            "data-ocid": "doubt.primary_button",
            children: "Ask Doubt"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: doubts.filter((d) => d.userId === userId).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground mb-2", children: "Your doubts" }),
        doubts.filter((d) => d.userId === userId).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-2 p-2.5 rounded-xl bg-muted/50 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: d.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `mt-1 text-[10px] ${d.answered ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`,
                  children: d.answered ? "Answered" : "Pending"
                }
              )
            ]
          },
          d.id
        ))
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 text-amber-500" }),
      "Live Doubts",
      pending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-100 text-amber-700 ml-auto", children: [
        pending.length,
        " pending"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollArea, { className: "flex-1 px-3 py-2", children: [
      pending.length === 0 && answered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground text-xs py-6", children: "No doubts yet" }),
      pending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-amber-600 mb-2 uppercase tracking-wide", children: "Unanswered" }),
        pending.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mb-2 p-3 rounded-xl bg-amber-50 border border-amber-200",
            "data-ocid": "doubt.card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: d.userName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-0.5", children: d.text }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: new Date(d.timestamp).toLocaleTimeString() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "flex-shrink-0 text-xs",
                  onClick: () => markAnswered(d),
                  "data-ocid": "doubt.save_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1" }),
                    "Answered"
                  ]
                }
              )
            ] })
          },
          d.id
        ))
      ] }),
      answered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide", children: "Answered" }),
        answered.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-2 p-3 rounded-xl bg-muted/40 opacity-60",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: d.userName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-0.5", children: d.text })
            ]
          },
          d.id
        ))
      ] })
    ] })
  ] });
}
const STUN = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
function LiveClassPage() {
  const { classId } = useParams({ strict: false });
  const search = useSearch({ strict: false });
  const isHost = (search.role ?? "viewer") === "host";
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") ?? "guest";
  const [classInfo, setClassInfo] = reactExports.useState(null);
  const [viewerCount, setViewerCount] = reactExports.useState(0);
  const [isStreaming, setIsStreaming] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [isCameraOff, setIsCameraOff] = reactExports.useState(false);
  const [classEnded, setClassEnded] = reactExports.useState(false);
  const chatTopicsRef = reactExports.useRef([]);
  const localStream = reactExports.useRef(null);
  const videoRef = reactExports.useRef(null);
  const pcsRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const unsubs = reactExports.useRef([]);
  reactExports.useEffect(() => {
    const unsub = rtdbListen(`liveClasses/${classId}`, (val) => {
      const data = val;
      if (!data || !data.active) {
        if (!isHost) {
          ue.error("Class has ended.");
          navigate({ to: "/dashboard/student" });
        }
        return;
      }
      setClassInfo({
        title: data.title,
        subject: data.subject,
        hostName: data.hostName
      });
      setViewerCount(data.viewerCount ?? 0);
    });
    unsubs.current.push(unsub);
    return () => {
      for (const u of unsubs.current) u();
      unsubs.current = [];
    };
  }, [classId, isHost, navigate]);
  const startStream = reactExports.useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      localStream.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsStreaming(true);
      const unsub = rtdbListen(`liveClasses/${classId}/viewers`, (val) => {
        const viewers = val;
        if (!viewers) return;
        for (const [viewerId, viewerData] of Object.entries(viewers)) {
          if (!viewerData.offer || pcsRef.current.has(viewerId)) continue;
          handleViewerOffer(viewerId, viewerData.offer);
        }
      });
      unsubs.current.push(unsub);
    } catch {
      ue.error("Could not access camera/microphone.");
    }
  }, [classId]);
  async function handleViewerOffer(viewerId, offer) {
    const pc = new RTCPeerConnection(STUN);
    pcsRef.current.set(viewerId, pc);
    if (localStream.current) {
      for (const t of localStream.current.getTracks()) {
        pc.addTrack(t, localStream.current);
      }
    }
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        const existing = rtdbGet(
          `liveClasses/${classId}/viewers/${viewerId}/hostCandidates`
        ) ?? [];
        rtdbSet(`liveClasses/${classId}/viewers/${viewerId}/hostCandidates`, [
          ...existing,
          e.candidate.toJSON()
        ]);
      }
    };
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    rtdbSet(`liveClasses/${classId}/viewers/${viewerId}/answer`, {
      type: answer.type,
      sdp: answer.sdp
    });
    const unsub = rtdbListen(
      `liveClasses/${classId}/viewers/${viewerId}/candidates`,
      (val) => {
        const candidates = val;
        if (!candidates) return;
        for (const c of candidates)
          pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {
          });
      }
    );
    unsubs.current.push(unsub);
  }
  reactExports.useEffect(() => {
    if (isHost) return;
    let pc = null;
    async function connectToHost() {
      pc = new RTCPeerConnection(STUN);
      const rs = new MediaStream();
      if (videoRef.current) videoRef.current.srcObject = rs;
      pc.ontrack = (e) => {
        var _a;
        for (const t of ((_a = e.streams[0]) == null ? void 0 : _a.getTracks()) ?? []) rs.addTrack(t);
        if (videoRef.current)
          videoRef.current.srcObject = new MediaStream(rs.getTracks());
      };
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          const existing = rtdbGet(
            `liveClasses/${classId}/viewers/${userId}/candidates`
          ) ?? [];
          rtdbSet(`liveClasses/${classId}/viewers/${userId}/candidates`, [
            ...existing,
            e.candidate.toJSON()
          ]);
        }
      };
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      await pc.setLocalDescription(offer);
      rtdbSet(`liveClasses/${classId}/viewers/${userId}/offer`, {
        type: offer.type,
        sdp: offer.sdp
      });
      const current = rtdbGet(`liveClasses/${classId}/viewerCount`) ?? 0;
      rtdbSet(`liveClasses/${classId}/viewerCount`, current + 1);
      const unsub = rtdbListen(
        `liveClasses/${classId}/viewers/${userId}/answer`,
        async (val) => {
          const answer = val;
          if (!answer || (pc == null ? void 0 : pc.remoteDescription)) return;
          await (pc == null ? void 0 : pc.setRemoteDescription(new RTCSessionDescription(answer)));
        }
      );
      unsubs.current.push(unsub);
      const unsub2 = rtdbListen(
        `liveClasses/${classId}/viewers/${userId}/hostCandidates`,
        (val) => {
          const candidates = val;
          if (!candidates) return;
          for (const c of candidates)
            pc == null ? void 0 : pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {
            });
        }
      );
      unsubs.current.push(unsub2);
    }
    connectToHost().catch(
      () => ue.error("Failed to connect to class stream.")
    );
    return () => {
      pc == null ? void 0 : pc.close();
      rtdbRemove(`liveClasses/${classId}/viewers/${userId}`);
      const current = rtdbGet(`liveClasses/${classId}/viewerCount`) ?? 1;
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
    var _a;
    const audio = (_a = localStream.current) == null ? void 0 : _a.getAudioTracks()[0];
    if (audio) {
      audio.enabled = !audio.enabled;
      setIsMuted((m) => !m);
    }
  }
  function toggleCamera() {
    var _a;
    const video = (_a = localStream.current) == null ? void 0 : _a.getVideoTracks()[0];
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
    ue.success("Class ended.");
    setClassEnded(true);
  }
  function downloadNotesPDF() {
    const title = (classInfo == null ? void 0 : classInfo.title) ?? "Live Class";
    const subject = (classInfo == null ? void 0 : classInfo.subject) ?? "";
    const topics = chatTopicsRef.current.length > 0 ? chatTopicsRef.current.slice(0, 10) : ["General discussion covered during the class."];
    const lines = [
      `Notes: ${title}`,
      subject ? `Subject: ${subject}` : "",
      `Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`,
      "",
      "Topics Covered:",
      ...topics.map((t) => `  • ${t}`),
      "",
      "Key Points:",
      "  • Review the session recording",
      "  • Practice related DPP questions on AskSpark",
      "  • Ask follow-up doubts on AskSpark",
      "",
      "Generated by AskSpark · askspark.caffeine.ai"
    ].filter((l) => l !== void 0).join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}_notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("Notes downloaded!");
  }
  function leaveClass() {
    for (const u of unsubs.current) u();
    navigate({ to: "/dashboard/student" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-screen bg-gray-950",
      "data-ocid": "liveclass.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: (classInfo == null ? void 0 : classInfo.title) ?? "Live Class" }),
            (classInfo == null ? void 0 : classInfo.subject) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-purple-600/30 text-purple-300 border-purple-600/50", children: classInfo.subject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/60 text-xs flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
              " ",
              viewerCount
            ] }),
            isHost ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              classEnded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "border-green-500 text-green-400 hover:bg-green-500/10",
                  onClick: downloadNotesPDF,
                  "data-ocid": "liveclass.save_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-1" }),
                    " Download Notes PDF"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "destructive",
                  onClick: endClass,
                  "data-ocid": "liveclass.delete_button",
                  children: "End Class"
                }
              ),
              classEnded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "text-white/60 hover:text-white",
                  onClick: () => navigate({ to: "/dashboard/teacher" }),
                  "data-ocid": "liveclass.link",
                  children: "Exit →"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: leaveClass,
                className: "text-white border-white/30 hover:bg-white/10",
                "data-ocid": "liveclass.cancel_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1" }),
                  " Leave"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative bg-black flex items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "video",
                {
                  ref: videoRef,
                  autoPlay: true,
                  playsInline: true,
                  muted: isHost,
                  className: "w-full h-full object-contain"
                }
              ),
              isHost && !isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 mb-4", children: "Camera is off" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: startStream,
                    className: "bg-purple-600 hover:bg-purple-700 text-white",
                    "data-ocid": "liveclass.primary_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 mr-2" }),
                      " Start Streaming"
                    ]
                  }
                )
              ] }) }),
              !isHost && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-black/60 text-white border-0 text-xs", children: [
                (classInfo == null ? void 0 : classInfo.hostName) ?? "Teacher",
                " is presenting"
              ] }) })
            ] }),
            isHost && isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 py-3 bg-gray-900", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: toggleMute,
                  className: `w-11 h-11 rounded-full flex items-center justify-center transition-colors ${isMuted ? "bg-red-600" : "bg-white/20 hover:bg-white/30"} text-white`,
                  "data-ocid": "liveclass.toggle",
                  children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: toggleCamera,
                  className: `w-11 h-11 rounded-full flex items-center justify-center transition-colors ${isCameraOff ? "bg-red-600" : "bg-white/20 hover:bg-white/30"} text-white`,
                  "data-ocid": "liveclass.secondary_button",
                  children: isCameraOff ? /* @__PURE__ */ jsxRuntimeExports.jsx(CameraOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: stopStream,
                  className: "w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 bg-gray-900/60 border-l border-white/10 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "chat", className: "flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "m-2 grid grid-cols-2 bg-gray-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: "chat",
                  className: "text-white/70 data-[state=active]:text-white data-[state=active]:bg-gray-700",
                  "data-ocid": "liveclass.tab",
                  children: "Chat"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: "doubts",
                  className: "text-white/70 data-[state=active]:text-white data-[state=active]:bg-gray-700",
                  "data-ocid": "liveclass.tab",
                  children: "Doubts"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "chat", className: "flex-1 overflow-hidden mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveChatPanel, { classId, isHost }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "doubts", className: "flex-1 overflow-hidden mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveDoubtPanel, { classId, isHost }) })
          ] }) })
        ] })
      ]
    }
  );
}
export {
  LiveClassPage as default
};
