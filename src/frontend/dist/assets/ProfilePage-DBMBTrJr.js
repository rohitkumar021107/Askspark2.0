import { c as createLucideIcon, u as useNavigate, r as reactExports, l as loadLocalProfile, A as AppRole, j as jsxRuntimeExports, e as ue, s as saveLocalProfile, a as saveUserToFirestore, Z as isTeacherInitialized, _ as saveTeacherCode, $ as verifyTeacherCode, a0 as switchRole } from "./index-CiicjzrK.js";
import { B as Badge } from "./badge-Ncr4NsWM.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-DaVgRmoe.js";
import { I as Input } from "./input-D9SZkx1r.js";
import { L as Label } from "./label-Cg1KVKjU.js";
import { A as ArrowLeft } from "./arrow-left-KPljXCER.js";
import { U as User } from "./user-BMsLaia6.js";
import { C as Camera } from "./camera-6BIszl99.js";
import { U as Upload, E as Eye } from "./upload-D3X2lgRl.js";
import { L as LoaderCircle } from "./loader-circle-DQccp6ji.js";
import "./utils-C0ugf0YY.js";
import "./index-BUlsMpCV.js";
import "./Combination-BPR_6sdE.js";
import "./index-C7zsWbmt.js";
import "./index-UGGF_iej.js";
import "./x-Sd9Di6ji.js";
import "./index-xWxfC-pn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const INTERESTS = ["Maths", "Physics", "Programming", "Electronics", "Biology"];
function getDashboardPath(role) {
  if (role === AppRole.teacher) return "/dashboard/teacher";
  return "/dashboard/student";
}
function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = reactExports.useState(
    () => loadLocalProfile()
  );
  const [displayName, setDisplayName] = reactExports.useState((profile == null ? void 0 : profile.displayName) ?? "");
  const [interests, setInterests] = reactExports.useState(
    (profile == null ? void 0 : profile.interests) ?? []
  );
  const [profileImageUrl, setProfileImageUrl] = reactExports.useState(
    profile == null ? void 0 : profile.profileImageUrl
  );
  const [cameraOpen, setCameraOpen] = reactExports.useState(false);
  const [cameraStream, setCameraStream] = reactExports.useState(null);
  const [captured, setCaptured] = reactExports.useState(null);
  const [cameraError, setCameraError] = reactExports.useState(null);
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [switchStep, setSwitchStep] = reactExports.useState("idle");
  const [teacherCode, setTeacherCode] = reactExports.useState("");
  const [showCode, setShowCode] = reactExports.useState(false);
  const [teacherCodeError, setTeacherCodeError] = reactExports.useState("");
  const [switching, setSwitching] = reactExports.useState(false);
  const [handling, setHandling] = reactExports.useState(false);
  const [teacherAlreadyInitialized, setTeacherAlreadyInitialized] = reactExports.useState(() => {
    var _a;
    return ((_a = loadLocalProfile()) == null ? void 0 : _a.isTeacherInitialized) ?? false;
  });
  const [newCode, setNewCode] = reactExports.useState("");
  const [confirmCode, setConfirmCode] = reactExports.useState("");
  const [showNewCode, setShowNewCode] = reactExports.useState(false);
  const [codeSetupError, setCodeSetupError] = reactExports.useState("");
  const [savingCode, setSavingCode] = reactExports.useState(false);
  const [currentCode, setCurrentCode] = reactExports.useState("");
  const dashboardPath = getDashboardPath(profile == null ? void 0 : profile.role);
  const currentRole = (profile == null ? void 0 : profile.role) ?? AppRole.student;
  const targetRole = currentRole === AppRole.teacher ? "student" : "teacher";
  const targetLabel = targetRole === "teacher" ? "Teacher" : "Student";
  const goBack = () => navigate({ to: dashboardPath });
  const startCamera = reactExports.useCallback(async () => {
    setCameraError(null);
    setCaptured(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } }
      });
      setCameraStream(stream);
      setCameraOpen(true);
    } catch {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        setCameraStream(stream);
        setCameraOpen(true);
      } catch (err) {
        setCameraError("Camera access denied or unavailable.");
        console.error(err);
      }
    }
  }, []);
  reactExports.useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);
  const stopCamera = reactExports.useCallback(() => {
    for (const t of (cameraStream == null ? void 0 : cameraStream.getTracks()) ?? []) t.stop();
    setCameraStream(null);
    setCameraOpen(false);
    setCaptured(null);
  }, [cameraStream]);
  reactExports.useEffect(() => {
    return () => {
      for (const t of (cameraStream == null ? void 0 : cameraStream.getTracks()) ?? []) t.stop();
    };
  }, [cameraStream]);
  const capturePhoto = () => {
    var _a;
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    (_a = canvas.getContext("2d")) == null ? void 0 : _a.drawImage(video, 0, 0);
    setCaptured(canvas.toDataURL("image/jpeg", 0.85));
  };
  const useCapturedPhoto = () => {
    if (captured) {
      setProfileImageUrl(captured);
      stopCamera();
    }
  };
  const handleFileUpload = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return setProfileImageUrl((_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const toggleInterest = (interest) => {
    setInterests(
      (prev) => prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };
  const handleSave = async () => {
    const currentProfile = profile ?? loadLocalProfile();
    if (!currentProfile) {
      ue.error("Profile not found. Please restart the app.");
      return;
    }
    if (!displayName.trim()) {
      ue.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    const safetyTimer = setTimeout(() => setSaving(false), 8e3);
    try {
      const saved = saveLocalProfile({
        ...currentProfile,
        displayName: displayName.trim(),
        interests,
        profileImageUrl
      });
      setProfile(saved);
      try {
        await Promise.race([
          saveUserToFirestore(
            saved.userId,
            saved.displayName,
            saved.role
          ),
          new Promise((resolve) => setTimeout(resolve, 5e3))
        ]);
      } catch {
      }
      ue.success("Profile saved!");
      setTimeout(() => navigate({ to: getDashboardPath(saved.role) }), 800);
    } catch (err) {
      console.error("Profile save error:", err);
      ue.error("Failed to save profile. Please try again.");
    } finally {
      clearTimeout(safetyTimer);
      setSaving(false);
    }
  };
  const resetSwitchState = () => {
    setSwitchStep("idle");
    setTeacherCode("");
    setTeacherCodeError("");
    setNewCode("");
    setConfirmCode("");
    setCodeSetupError("");
    setShowCode(false);
    setShowNewCode(false);
    setCurrentCode("");
  };
  const handleSwitchClick = async () => {
    if (handling || switching) return;
    setHandling(true);
    try {
      if (targetRole === "teacher") {
        const alreadyInit = teacherAlreadyInitialized || (profile ? await isTeacherInitialized(profile.userId) : false);
        setTeacherAlreadyInitialized(alreadyInit);
        setSwitchStep("confirm");
      } else {
        setSwitchStep("confirm");
      }
    } finally {
      setHandling(false);
    }
  };
  const handleConfirmContinue = () => {
    if (targetRole === "teacher" && teacherAlreadyInitialized) {
      setTeacherCode("");
      setTeacherCodeError("");
      setShowCode(false);
      setSwitchStep("teacher-code");
    } else if (targetRole === "teacher" && !teacherAlreadyInitialized) {
      const cp = profile ?? loadLocalProfile();
      if (cp) {
        const updated = { ...cp, role: AppRole.teacher };
        saveLocalProfile(updated);
        setProfile(updated);
        localStorage.setItem("askspark_role", "teacher");
        void saveUserToFirestore(cp.userId, cp.displayName, "teacher");
      }
      setNewCode("");
      setConfirmCode("");
      setCodeSetupError("");
      setSwitchStep("create-teacher-code");
    } else {
      performSwitch("student", void 0);
    }
  };
  const handleCreateCodeSubmit = async () => {
    if (newCode.trim().length < 6) {
      setCodeSetupError("Code must be at least 6 characters.");
      return;
    }
    if (newCode !== confirmCode) {
      setCodeSetupError("Codes do not match. Please try again.");
      return;
    }
    const currentProfile = profile ?? loadLocalProfile();
    if (!currentProfile) return;
    setSavingCode(true);
    setCodeSetupError("");
    const safetyTimer = setTimeout(() => setSavingCode(false), 8e3);
    try {
      await Promise.race([
        saveTeacherCode(currentProfile.userId, newCode.trim()),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error("timeout")), 8e3)
        )
      ]);
      setTeacherAlreadyInitialized(true);
      clearTimeout(safetyTimer);
      ue.success("Teacher code created! Welcome to Teacher mode.");
      resetSwitchState();
      navigate({ to: "/dashboard/teacher" });
    } catch (err) {
      console.error(err);
      setCodeSetupError("Failed to save code. Please try again.");
    } finally {
      clearTimeout(safetyTimer);
      setSavingCode(false);
    }
  };
  const handleTeacherCodeSubmit = async () => {
    await performSwitch("teacher", teacherCode);
  };
  const handleForgotCode = () => {
    setNewCode("");
    setConfirmCode("");
    setCodeSetupError("");
    setShowNewCode(false);
    setSwitchStep("reset-teacher-code");
  };
  const handleResetCodeSubmit = async () => {
    if (newCode.trim().length < 6) {
      setCodeSetupError("Code must be at least 6 characters.");
      return;
    }
    if (newCode !== confirmCode) {
      setCodeSetupError("Codes do not match. Please try again.");
      return;
    }
    const currentProfile = profile ?? loadLocalProfile();
    if (!currentProfile) return;
    setSavingCode(true);
    setCodeSetupError("");
    const safetyTimer = setTimeout(() => setSavingCode(false), 8e3);
    try {
      await Promise.race([
        saveTeacherCode(currentProfile.userId, newCode.trim()),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error("timeout")), 8e3)
        )
      ]);
      clearTimeout(safetyTimer);
      ue.success("Teacher code updated! You can now switch to Teacher.");
      resetSwitchState();
    } catch (err) {
      console.error(err);
      setCodeSetupError("Failed to update code. Please try again.");
    } finally {
      clearTimeout(safetyTimer);
      setSavingCode(false);
    }
  };
  const handleChangeCodeClick = () => {
    setCurrentCode("");
    setNewCode("");
    setConfirmCode("");
    setCodeSetupError("");
    setShowCode(false);
    setShowNewCode(false);
    setSwitchStep("change-teacher-code");
  };
  const handleChangeCodeSubmit = async () => {
    const currentProfile = profile ?? loadLocalProfile();
    if (!currentProfile) return;
    setSavingCode(true);
    setCodeSetupError("");
    const safetyTimer = setTimeout(() => setSavingCode(false), 8e3);
    try {
      let valid;
      try {
        valid = await Promise.race([
          verifyTeacherCode(currentProfile.userId, currentCode.trim()),
          new Promise(
            (_, reject) => setTimeout(
              () => reject(new Error("Verification timed out. Please try again.")),
              8e3
            )
          )
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Verification timed out. Please try again.";
        setCodeSetupError(msg);
        return;
      }
      if (!valid) {
        setCodeSetupError("Current code is incorrect.");
        return;
      }
      if (newCode.trim().length < 6) {
        setCodeSetupError("New code must be at least 6 characters.");
        return;
      }
      if (newCode !== confirmCode) {
        setCodeSetupError("New codes do not match.");
        return;
      }
      await Promise.race([
        saveTeacherCode(currentProfile.userId, newCode.trim()),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error("timeout")), 8e3)
        )
      ]);
      clearTimeout(safetyTimer);
      ue.success("Teacher code updated successfully!");
      resetSwitchState();
    } catch (err) {
      console.error(err);
      setCodeSetupError("Failed to update code. Please try again.");
    } finally {
      clearTimeout(safetyTimer);
      setSavingCode(false);
    }
  };
  const performSwitch = async (role, code) => {
    const currentProfile = profile ?? loadLocalProfile();
    if (!currentProfile) return;
    setSwitching(true);
    setTeacherCodeError("");
    const safetyTimer = setTimeout(() => setSwitching(false), 8e3);
    try {
      const result = await switchRole(currentProfile.userId, role, code);
      if (!result.success) {
        setTeacherCodeError(result.error ?? "Switch failed.");
        return;
      }
      resetSwitchState();
      ue.success(
        `Role switched to ${role === "teacher" ? "Teacher" : "Student"}!`
      );
      navigate({
        to: role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"
      });
    } catch (err) {
      console.error(err);
      setTeacherCodeError("Something went wrong. Please try again.");
    } finally {
      clearTimeout(safetyTimer);
      setSwitching(false);
    }
  };
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-8 text-center warm-shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "No profile found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({ to: "/onboarding" }), children: "Create Profile" })
    ] }) });
  }
  const isStudent = profile.role === AppRole.student;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: goBack,
          className: "w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-muted/60 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-base", children: "Edit Profile" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 warm-shadow border-white/40 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Profile Photo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-white/60", children: profileImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: profileImageUrl,
              alt: "Profile",
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full gradient-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-12 h-12 text-white/80" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: startCamera,
                className: "min-h-[44px] gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                  " Take Photo"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: "min-h-[44px] gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  " Upload Photo"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleFileUpload
              }
            )
          ] })
        ] }),
        cameraError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive text-center", children: cameraError }),
        cameraOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border border-border rounded-xl p-4 bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
          !captured ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                ref: videoRef,
                autoPlay: true,
                playsInline: true,
                muted: true,
                className: "w-full rounded-xl aspect-video object-cover bg-black"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: capturePhoto,
                  className: "flex-1 gradient-primary text-white border-0 min-h-[44px]",
                  children: "📸 Capture"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: stopCamera,
                  className: "min-h-[44px]",
                  children: "Cancel"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: captured,
                alt: "Captured",
                className: "w-full rounded-xl aspect-video object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: useCapturedPhoto,
                  className: "flex-1 gradient-primary text-white border-0 min-h-[44px]",
                  children: "Use This Photo"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setCaptured(null),
                  className: "min-h-[44px]",
                  children: "Retake"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 warm-shadow border-white/40 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Your Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "displayName",
              className: "text-sm text-muted-foreground",
              children: "Display Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "displayName",
              value: displayName,
              onChange: (e) => setDisplayName(e.target.value),
              className: "h-11 rounded-xl bg-white/60",
              placeholder: "Enter your name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `capitalize ${currentRole === AppRole.teacher ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-blue-100 text-blue-800 border-blue-200"}`,
              children: currentRole === AppRole.teacher ? "👨‍🏫 Teacher" : "🎓 Student"
            }
          ),
          (profile.userClass || profile.userBranch) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-muted-foreground", children: profile.userClass ?? profile.userBranch })
        ] })
      ] }),
      isStudent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 warm-shadow border-white/40 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Your Interests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Select subjects you enjoy learning about." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: INTERESTS.map((interest) => {
          const selected = interests.includes(interest);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleInterest(interest),
              className: `px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 min-h-[44px] ${selected ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-muted/60 text-muted-foreground border-border hover:bg-muted"}`,
              children: interest
            },
            interest
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 warm-shadow space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Switch Role" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Current role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `capitalize ${currentRole === AppRole.teacher ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-blue-100 text-blue-800 border-blue-200"}`,
                children: currentRole === AppRole.teacher ? "👨‍🏫 Teacher" : "🎓 Student"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: handleSwitchClick,
              disabled: handling || switching,
              className: "gap-2 min-h-[44px] border-primary/30 text-primary hover:bg-primary/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                "Switch to ",
                targetLabel
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: teacherAlreadyInitialized && targetRole === "teacher" ? "Re-switching to Teacher requires your personal teacher code." : !teacherAlreadyInitialized && targetRole === "teacher" ? "You'll create a personal teacher code on first switch." : "Switching roles won't delete any of your data." })
      ] }),
      !isStudent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card rounded-2xl p-6 warm-shadow space-y-4",
          "data-ocid": "teacher_code.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Teacher Code" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Update your personal teacher code anytime." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: handleChangeCodeClick,
                  "data-ocid": "teacher_code.open_modal_button",
                  className: "gap-2 min-h-[44px] border-primary/30 text-primary hover:bg-primary/5 shrink-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4" }),
                    "Change Code"
                  ]
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleSave,
          disabled: saving,
          "data-ocid": "profile.submit_button",
          className: "w-full gradient-primary text-white border-0 shadow-primary font-semibold h-12 rounded-xl",
          children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            "Saving…"
          ] }) : "Save Profile"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: switchStep === "confirm",
        onOpenChange: (open) => {
          if (!open) resetSwitchState();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Switch Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Are you sure you want to switch to",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: targetLabel }),
                " mode?"
              ] }),
              targetRole === "teacher" && !teacherAlreadyInitialized && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2 border border-green-200", children: "First time switching to Teacher — you'll create your own personal code next." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your existing data will be preserved." })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex gap-2 sm:gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: resetSwitchState,
                className: "flex-1",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleConfirmContinue,
                disabled: switching,
                className: "flex-1 gradient-primary text-white border-0",
                children: switching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Switching…"
                ] }) : "Continue"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: switchStep === "create-teacher-code",
        onOpenChange: (open) => {
          if (!open) resetSwitchState();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "🔑 Create Your Teacher Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Set a personal code you'll use every time you switch to Teacher mode. Keep it somewhere safe — minimum 6 characters." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-code", className: "text-sm", children: "New Teacher Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "new-code",
                    type: showNewCode ? "text" : "password",
                    placeholder: "Min. 6 characters",
                    value: newCode,
                    onChange: (e) => {
                      setNewCode(e.target.value);
                      setCodeSetupError("");
                    },
                    className: "h-11 rounded-xl pr-10"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowNewCode((v) => !v),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                    children: showNewCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm-code", className: "text-sm", children: "Confirm Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "confirm-code",
                  type: showNewCode ? "text" : "password",
                  placeholder: "Re-enter your code",
                  value: confirmCode,
                  onChange: (e) => {
                    setConfirmCode(e.target.value);
                    setCodeSetupError("");
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter") handleCreateCodeSubmit();
                  },
                  className: "h-11 rounded-xl"
                }
              )
            ] }),
            codeSetupError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: codeSetupError })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex gap-2 sm:gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: resetSwitchState,
                disabled: savingCode,
                className: "flex-1",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleCreateCodeSubmit,
                disabled: savingCode || !newCode || !confirmCode,
                className: "flex-1 gradient-primary text-white border-0",
                children: savingCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Saving…"
                ] }) : "Save & Switch"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: switchStep === "teacher-code",
        onOpenChange: (open) => {
          if (!open) resetSwitchState();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Enter Teacher Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Enter your personal teacher code to switch back to Teacher mode." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "teacher-code", className: "text-sm", children: "Teacher Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "teacher-code",
                    type: showCode ? "text" : "password",
                    placeholder: "Enter your teacher code",
                    value: teacherCode,
                    onChange: (e) => {
                      setTeacherCode(e.target.value);
                      setTeacherCodeError("");
                    },
                    onKeyDown: (e) => {
                      if (e.key === "Enter") handleTeacherCodeSubmit();
                    },
                    className: "h-11 rounded-xl pr-10"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowCode((v) => !v),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                    children: showCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            teacherCodeError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: teacherCodeError }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleForgotCode,
                className: "text-sm text-primary hover:underline underline-offset-2",
                children: "Forgot Teacher Code?"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex gap-2 sm:gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: resetSwitchState,
                disabled: switching,
                className: "flex-1",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleTeacherCodeSubmit,
                disabled: switching || !teacherCode.trim(),
                className: "flex-1 gradient-primary text-white border-0",
                children: switching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Switching…"
                ] }) : "Confirm Switch"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: switchStep === "reset-teacher-code",
        onOpenChange: (open) => {
          if (!open) resetSwitchState();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "🔄 Reset Teacher Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a new teacher code. Your old code will be permanently replaced." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reset-new-code", className: "text-sm", children: "New Teacher Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reset-new-code",
                    type: showNewCode ? "text" : "password",
                    placeholder: "Min. 6 characters",
                    value: newCode,
                    onChange: (e) => {
                      setNewCode(e.target.value);
                      setCodeSetupError("");
                    },
                    className: "h-11 rounded-xl pr-10"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowNewCode((v) => !v),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                    children: showNewCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reset-confirm-code", className: "text-sm", children: "Confirm New Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "reset-confirm-code",
                  type: showNewCode ? "text" : "password",
                  placeholder: "Re-enter new code",
                  value: confirmCode,
                  onChange: (e) => {
                    setConfirmCode(e.target.value);
                    setCodeSetupError("");
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter") handleResetCodeSubmit();
                  },
                  className: "h-11 rounded-xl"
                }
              )
            ] }),
            codeSetupError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: codeSetupError }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg px-3 py-2", children: "⚠️ After resetting, use your new code next time you switch to Teacher." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex gap-2 sm:gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setSwitchStep("teacher-code"),
                disabled: savingCode,
                className: "flex-1",
                children: "Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleResetCodeSubmit,
                disabled: savingCode || !newCode || !confirmCode,
                className: "flex-1 gradient-primary text-white border-0",
                children: savingCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Saving…"
                ] }) : "Reset Code"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: switchStep === "change-teacher-code",
        onOpenChange: (open) => {
          if (!open) resetSwitchState();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "sm:max-w-md rounded-2xl",
            "data-ocid": "teacher_code.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "🔑 Change Teacher Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Enter your current code to verify, then set a new one." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "current-code", className: "text-sm", children: "Current Teacher Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "current-code",
                        type: showCode ? "text" : "password",
                        placeholder: "Enter your current code",
                        value: currentCode,
                        onChange: (e) => {
                          setCurrentCode(e.target.value);
                          setCodeSetupError("");
                        },
                        "data-ocid": "teacher_code.input",
                        className: "h-11 rounded-xl pr-10"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowCode((v) => !v),
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                        children: showCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "change-new-code", className: "text-sm", children: "New Teacher Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "change-new-code",
                        type: showNewCode ? "text" : "password",
                        placeholder: "Min. 6 characters",
                        value: newCode,
                        onChange: (e) => {
                          setNewCode(e.target.value);
                          setCodeSetupError("");
                        },
                        className: "h-11 rounded-xl pr-10"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowNewCode((v) => !v),
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                        children: showNewCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "change-confirm-code", className: "text-sm", children: "Confirm New Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "change-confirm-code",
                      type: showNewCode ? "text" : "password",
                      placeholder: "Re-enter new code",
                      value: confirmCode,
                      onChange: (e) => {
                        setConfirmCode(e.target.value);
                        setCodeSetupError("");
                      },
                      onKeyDown: (e) => {
                        if (e.key === "Enter") handleChangeCodeSubmit();
                      },
                      className: "h-11 rounded-xl"
                    }
                  )
                ] }),
                codeSetupError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm text-destructive",
                    "data-ocid": "teacher_code.error_state",
                    children: codeSetupError
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex gap-2 sm:gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: resetSwitchState,
                    disabled: savingCode,
                    "data-ocid": "teacher_code.cancel_button",
                    className: "flex-1",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleChangeCodeSubmit,
                    disabled: savingCode || !currentCode.trim() || !newCode || !confirmCode,
                    "data-ocid": "teacher_code.submit_button",
                    className: "flex-1 gradient-primary text-white border-0",
                    children: savingCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                      "Saving…"
                    ] }) : "Update Code"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  ProfilePage as default
};
