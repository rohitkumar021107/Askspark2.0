import { u as useNavigate, l as loadLocalProfile, r as reactExports, j as jsxRuntimeExports, V as Video, h as getAllStudents, i as rtdbSet, e as ue } from "./index-CiicjzrK.js";
import { A as AvatarButton, L as LogOut, V as VideoCallModal } from "./VideoCallModal-SOfFU6_f.js";
import { B as Badge } from "./badge-Ncr4NsWM.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { C as Card, d as CardContent } from "./card-CrjAUlyJ.js";
import { I as Input } from "./input-D9SZkx1r.js";
import { L as Label } from "./label-Cg1KVKjU.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CKDsVIvG.js";
import { T as Textarea } from "./textarea-B84xdT9O.js";
import { u as useNotifications, B as Bell } from "./useNotifications-DtVnhzgN.js";
import { u as useFirebaseRating } from "./useRatings-D01Uc0bv.js";
import { a as useAllDoubts, b as answerDoubt } from "./useFirestoreDoubts-CPACqU8A.js";
import { C as CircleCheck } from "./circle-check-Dos6jNK6.js";
import { U as User } from "./user-BMsLaia6.js";
import { S as Star } from "./star-CdBg9GkG.js";
import { M as MessageSquare } from "./message-square-BVVl9NSs.js";
import { T as TrendingUp } from "./trending-up-ei6Zm_la.js";
import { M as Mic } from "./mic-BzIhrvTG.js";
import { C as Clock } from "./clock-DKrs62zG.js";
import { C as ChevronUp } from "./chevron-up-gQIqj1MH.js";
import { C as ChevronDown } from "./chevron-down-DQR61kK2.js";
import { L as LoaderCircle } from "./loader-circle-DQccp6ji.js";
import { S as Send } from "./send-adheBpJl.js";
import "./dialog-DaVgRmoe.js";
import "./index-BUlsMpCV.js";
import "./utils-C0ugf0YY.js";
import "./Combination-BPR_6sdE.js";
import "./index-C7zsWbmt.js";
import "./index-UGGF_iej.js";
import "./x-Sd9Di6ji.js";
import "./monitor-BQbe68LJ.js";
import "./index-xWxfC-pn.js";
import "./index-BjI1O3hJ.js";
import "./useFirestoreRatings-DaeseLrE.js";
function LiveClassForm({
  navigate,
  teacherName,
  userId
}) {
  const [title, setTitle] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("");
  function startClass() {
    if (!title.trim()) return;
    const classId = Date.now().toString(36);
    rtdbSet(`liveClasses/${classId}`, {
      title: title.trim(),
      subject: subject.trim() || "General",
      hostId: userId,
      hostName: teacherName,
      startedAt: Date.now(),
      active: true,
      viewerCount: 0
    });
    navigate({ to: `/live/${classId}`, search: { role: "host" } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Class Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: "e.g. Algebra - Chapter 5",
          className: "bg-white/60 border-white/50 rounded-xl",
          "data-ocid": "liveclass.input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Subject" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: subject,
          onChange: (e) => setSubject(e.target.value),
          placeholder: "e.g. Mathematics",
          className: "bg-white/60 border-white/50 rounded-xl"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: "w-full gradient-primary text-white rounded-xl font-bold",
        onClick: startClass,
        disabled: !title.trim(),
        "data-ocid": "liveclass.primary_button",
        children: "🎥 Go Live"
      }
    )
  ] });
}
function CallStudents({
  navigate,
  teacherName,
  userId
}) {
  const [students, setStudents] = reactExports.useState([]);
  reactExports.useEffect(() => {
    getAllStudents().then(setStudents).catch(() => setStudents([]));
  }, []);
  function initiateCall(student, callType) {
    const callId = `${userId}_${Date.now().toString(36)}`;
    rtdbSet(`calls/${student.id}/incoming`, {
      callId,
      callerName: teacherName,
      callType,
      callerUserId: userId
    });
    navigate({ to: `/call/${callId}`, search: { role: "caller", callType } });
  }
  if (students.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center text-muted-foreground text-sm py-4",
        "data-ocid": "call.empty_state",
        children: "No students found. Students will appear here once they register."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: students.slice(0, 6).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between p-3 rounded-2xl bg-white/50 border border-white/50",
      "data-ocid": `call.item.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold", children: s.name.charAt(0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Student" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200 border-0",
              onClick: () => initiateCall(s, "audio"),
              "data-ocid": `call.secondary_button.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0",
              onClick: () => initiateCall(s, "video"),
              "data-ocid": `call.edit_button.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ]
    },
    s.id
  )) });
}
function FirestoreDoubtCard({
  doubt,
  expanded,
  onToggle,
  teacherName,
  onAnswered
}) {
  const [answerText, setAnswerText] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [videoCallOpen, setVideoCallOpen] = reactExports.useState(false);
  const subjectColor = "bg-indigo-100 text-indigo-700";
  async function handleSubmitAnswer() {
    if (!answerText.trim()) {
      ue.error("Please type an answer");
      return;
    }
    setSubmitting(true);
    try {
      await answerDoubt(doubt.id, answerText.trim(), teacherName, doubt.userId);
      ue.success("Answer submitted!");
      setAnswerText("");
      onAnswered();
    } catch {
      ue.error("Failed to submit answer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  const timeAgo = (() => {
    const diff = Date.now() - doubt.createdAt;
    const mins = Math.floor(diff / 6e4);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return new Date(doubt.createdAt).toLocaleDateString();
  })();
  const borderAccent = doubt.status === "answered" ? "border-l-4 border-l-green-400" : "border-l-4 border-l-amber-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `glass-card rounded-2xl border-white/50 warm-shadow hover:warm-shadow-lg transition-all duration-300 overflow-hidden ${borderAccent}`,
      "data-ocid": `teacher.item.${doubt.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-start gap-3 cursor-pointer w-full text-left",
            onClick: onToggle,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-sm font-bold text-indigo-700 flex-shrink-0", children: doubt.isAnonymous ? "?" : doubt.studentName.charAt(0) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${subjectColor} border-0 text-xs`, children: doubt.subject || "General" }),
                  doubt.status === "answered" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-700 border-0 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                    " Answered"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-100 text-amber-700 border-0 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
                    " Pending"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm line-clamp-2", children: doubt.question }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: doubt.isAnonymous ? "Anonymous" : doubt.studentName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                    timeAgo
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-2", children: [
                doubt.status !== "answered" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-indigo-500 text-white rounded-full px-3 py-1 text-xs font-bold hover:bg-indigo-600 transition-colors", children: "Reply" }),
                expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
              ] })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/50 rounded-xl p-4 mb-4 border border-white/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium mb-1", children: "Full Question" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: doubt.question })
          ] }),
          doubt.status === "answered" && doubt.answer ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-display font-bold text-foreground", children: "✅ Your Response" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-100 rounded-xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: doubt.answer }),
              doubt.teacherName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
                "— ",
                doubt.teacherName,
                doubt.answeredAt ? `, ${new Date(doubt.answeredAt).toLocaleString()}` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "rounded-full gradient-primary text-white border-0 shadow-primary mt-2",
                onClick: () => setVideoCallOpen(true),
                "data-ocid": "teacher.primary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4 mr-2" }),
                  " Start Video Call"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              VideoCallModal,
              {
                open: videoCallOpen,
                onClose: () => setVideoCallOpen(false),
                studentName: doubt.isAnonymous ? "Student" : doubt.studentName,
                isTeacher: true
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: answerText,
                onChange: (e) => setAnswerText(e.target.value),
                placeholder: "Type your answer...",
                rows: 4,
                className: "bg-white/60 border-white/50 rounded-xl",
                "data-ocid": "teacher.textarea"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full gradient-primary text-white rounded-xl font-bold",
                onClick: handleSubmitAnswer,
                disabled: submitting || !answerText.trim(),
                "data-ocid": "teacher.submit_button",
                children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 w-4 h-4 animate-spin" }),
                  " ",
                  "Submitting..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 w-4 h-4" }),
                  " Submit Answer"
                ] })
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function TeacherRatingCard({ teacherName }) {
  const { average, count } = useFirebaseRating(teacherName);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "glass-card border-white/50 warm-shadow rounded-3xl col-span-2 lg:col-span-1",
      "data-ocid": "teacher.card.5",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground", children: average > 0 ? `${average.toFixed(1)} / 5` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "Avg Rating ",
          count > 0 ? `(${count})` : ""
        ] }),
        average > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mt-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xs ${star <= Math.round(average) ? "text-yellow-400" : "text-muted-foreground/30"}`,
            children: "★"
          },
          star
        )) })
      ] })
    }
  );
}
function TeacherDashboard() {
  const navigate = useNavigate();
  const localProfile = loadLocalProfile();
  const userId = (localProfile == null ? void 0 : localProfile.userId) ?? "";
  const teacherName = (localProfile == null ? void 0 : localProfile.displayName) ?? "Teacher";
  const firestoreDoubts = useAllDoubts();
  const allDoubts = firestoreDoubts;
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [filterTab, setFilterTab] = reactExports.useState(
    "pending"
  );
  const { average: avgRating } = useFirebaseRating(teacherName);
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications(userId);
  const [notifOpen, setNotifOpen] = reactExports.useState(false);
  const notifRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  const pending = firestoreDoubts.filter((d) => d.status === "pending");
  const answered = firestoreDoubts.filter((d) => d.status === "answered");
  const displayDoubts = filterTab === "pending" ? pending : filterTab === "answered" ? answered : firestoreDoubts;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-gradient", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 px-4 sm:px-6 py-3 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AvatarButton,
          {
            imageUrl: localProfile == null ? void 0 : localProfile.profileImageUrl,
            name: teacherName
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-foreground text-sm", children: teacherName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-0 text-xs", children: "Teacher" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: notifRef, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "relative w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-white/70 transition-colors",
              onClick: () => setNotifOpen((o) => !o),
              "aria-label": "Notifications",
              "data-ocid": "teacher.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-foreground" }),
                unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-0.5", children: unreadCount })
              ]
            }
          ),
          notifOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute top-full mt-2 right-0 w-80 glass-card rounded-2xl shadow-xl border-white/50 overflow-hidden z-50",
              "data-ocid": "teacher.popover",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-white/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: "Notifications" }),
                  unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-xs text-primary hover:underline",
                      onClick: () => {
                        markAllRead();
                      },
                      "data-ocid": "teacher.secondary_button",
                      children: "Mark all read"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-72 overflow-y-auto", children: notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6 text-center text-sm text-muted-foreground", children: "No notifications yet" }) : notifications.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/40 transition-colors border-b border-white/20 last:border-0 ${n.read ? "opacity-60" : ""}`,
                    onClick: () => {
                      markRead(n.id);
                      setNotifOpen(false);
                      if (n.navigateTo) {
                        navigate({ to: n.navigateTo });
                      }
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground leading-snug", children: n.message }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: new Date(n.createdAt).toLocaleTimeString() })
                      ] }),
                      !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" })
                    ]
                  },
                  n.id
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "rounded-full hover:bg-white/50",
            onClick: () => navigate({ to: "/" }),
            "data-ocid": "teacher.link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-1" }),
              " Exit"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-3xl p-6 border-white/50 warm-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground", children: "Teacher Dashboard 👨‍🏫" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage doubts, run live classes, and track your impact" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 w-full sm:w-auto", children: [
          {
            label: "Doubts Solved",
            value: allDoubts.filter((d) => d.status === "answered").length,
            icon: CircleCheck,
            color: "text-green-600",
            bg: "bg-green-50"
          },
          {
            label: "Students Helped",
            value: new Set(allDoubts.map((d) => d.userId)).size,
            icon: User,
            color: "text-blue-600",
            bg: "bg-blue-50"
          },
          {
            label: "Avg Rating",
            value: `${(avgRating || 0).toFixed(1)}★`,
            icon: Star,
            color: "text-amber-600",
            bg: "bg-amber-50"
          }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `${stat.bg} rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-1 min-w-0`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                stat.icon,
                {
                  className: `w-5 h-5 ${stat.color} flex-shrink-0`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xl font-bold ${stat.color}`, children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground text-center leading-tight break-words", children: stat.label })
            ]
          },
          stat.label
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-5 gap-4", children: [
        [
          {
            label: "Total Doubts",
            value: firestoreDoubts.length,
            icon: MessageSquare,
            color: "text-indigo-600",
            bg: "from-indigo-50 to-violet-50",
            iconBg: "from-indigo-500 to-violet-500"
          },
          {
            label: "Answered",
            value: answered.length,
            icon: CircleCheck,
            color: "text-green-600",
            bg: "from-green-50 to-emerald-50",
            iconBg: "from-green-500 to-emerald-500"
          },
          {
            label: "Pending",
            value: pending.length,
            icon: () => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "⏳" }),
            color: "text-amber-600",
            bg: "from-amber-50 to-orange-50",
            iconBg: "from-amber-400 to-orange-400"
          },
          {
            label: "Response Rate",
            value: firestoreDoubts.length > 0 ? `${Math.round(answered.length / firestoreDoubts.length * 100)}%` : "0%",
            icon: TrendingUp,
            color: "text-violet-600",
            bg: "from-violet-50 to-purple-50",
            iconBg: "from-violet-500 to-purple-500"
          }
        ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: `border-white/50 warm-shadow rounded-3xl bg-gradient-to-br ${s.bg} hover:-translate-y-1 hover:shadow-xl transition-all duration-200`,
            "data-ocid": `teacher.card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-xl bg-gradient-to-br ${s.iconBg} flex items-center justify-center mb-3`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-5 h-5 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-display font-bold ${s.color}`, children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label })
            ] })
          },
          s.label
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TeacherRatingCard, { teacherName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card rounded-3xl p-6 border-white/50 warm-shadow",
          style: {
            background: "linear-gradient(135deg, rgba(239,68,68,0.05) 0%, rgba(251,113,133,0.08) 100%)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: "Start Live Class" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Broadcast to all your students in real-time" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              LiveClassForm,
              {
                navigate,
                teacherName,
                userId
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "Student Doubts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Tabs,
          {
            value: filterTab,
            onValueChange: (v) => setFilterTab(v),
            "data-ocid": "teacher.tab",
            id: "pending-doubts",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-white/50 border border-white/50 rounded-2xl p-1 gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "all",
                    className: "rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm",
                    "data-ocid": "teacher.tab",
                    children: [
                      "All",
                      firestoreDoubts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 bg-muted text-muted-foreground border-0 text-xs", children: firestoreDoubts.length })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "pending",
                    className: "rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm",
                    "data-ocid": "teacher.tab",
                    children: [
                      "Pending",
                      pending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 bg-amber-100 text-amber-700 border-0 text-xs", children: pending.length })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "answered",
                    className: "rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm",
                    "data-ocid": "teacher.tab",
                    children: "Answered"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: filterTab, className: "mt-4 space-y-3", children: displayDoubts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center py-16 text-muted-foreground glass-card rounded-3xl border-white/50",
                  "data-ocid": "teacher.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 mx-auto mb-3 text-green-300" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: filterTab === "pending" ? "All caught up! No pending doubts. 🎉" : "No doubts in this category." })
                  ]
                }
              ) : displayDoubts.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                FirestoreDoubtCard,
                {
                  doubt: d,
                  expanded: expandedId === d.id,
                  onToggle: () => setExpandedId(expandedId === d.id ? null : d.id),
                  teacherName,
                  onAnswered: () => setExpandedId(null)
                },
                d.id
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 border-white/50 warm-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4 text-white" }) }),
          "Call a Student"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CallStudents,
          {
            navigate,
            teacherName,
            userId
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 border-white/50 warm-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-5", children: "Performance Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
          {
            label: "Total Doubts",
            value: allDoubts.length,
            icon: "📚",
            color: "from-indigo-100 to-violet-100"
          },
          {
            label: "Answered",
            value: allDoubts.filter((d) => d.status === "answered").length,
            icon: "✅",
            color: "from-green-100 to-emerald-100"
          },
          {
            label: "Pending",
            value: allDoubts.filter((d) => d.status !== "answered").length,
            icon: "⏳",
            color: "from-amber-100 to-orange-100"
          },
          {
            label: "Students",
            value: new Set(allDoubts.map((d) => d.userId)).size,
            icon: "👥",
            color: "from-sky-100 to-blue-100"
          }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-2xl p-4 bg-gradient-to-br ${s.color} flex flex-col items-center text-center gap-1 hover:-translate-y-1 transition-transform duration-200`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl", children: s.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground", children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label })
            ]
          },
          s.label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground py-6", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with ❤️ using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : ""
            )}`,
            target: "_blank",
            rel: "noreferrer",
            className: "underline hover:text-foreground transition-colors",
            children: "caffeine.ai"
          }
        )
      ] })
    ] })
  ] });
}
export {
  TeacherDashboard as default
};
