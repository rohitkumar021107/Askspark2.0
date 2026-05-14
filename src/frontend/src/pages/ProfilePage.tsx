import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Camera,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  RefreshCw,
  Upload,
  User,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { loadLocalProfile, saveLocalProfile } from "../hooks/useLocalProfile";
import type { LocalProfile } from "../hooks/useLocalProfile";
import { saveUserToFirestore } from "../lib/useFirestoreUsers";
import {
  isTeacherInitialized,
  saveTeacherCode,
  switchRole,
  verifyTeacherCode,
} from "../lib/useRoleSwitch";
import { AppRole } from "../types/appTypes";

const INTERESTS = ["Maths", "Physics", "Programming", "Electronics", "Biology"];

function getDashboardPath(role?: AppRole): string {
  if (role === AppRole.teacher) return "/dashboard/teacher";
  return "/dashboard/student";
}

type SwitchStep =
  | "idle"
  | "confirm"
  | "teacher-code"
  | "create-teacher-code"
  | "reset-teacher-code"
  | "change-teacher-code";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<LocalProfile | null>(() =>
    loadLocalProfile(),
  );

  const [displayName, setDisplayName] = useState(profile?.displayName ?? "");
  const [interests, setInterests] = useState<string[]>(
    profile?.interests ?? [],
  );
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    profile?.profileImageUrl,
  );

  // Camera state
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);

  // Role switch state
  const [switchStep, setSwitchStep] = useState<SwitchStep>("idle");
  const [teacherCode, setTeacherCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [teacherCodeError, setTeacherCodeError] = useState("");
  const [switching, setSwitching] = useState(false);
  const [handling, setHandling] = useState(false);
  const [teacherAlreadyInitialized, setTeacherAlreadyInitialized] =
    useState<boolean>(() => loadLocalProfile()?.isTeacherInitialized ?? false);

  // Create / reset code state
  const [newCode, setNewCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [showNewCode, setShowNewCode] = useState(false);
  const [codeSetupError, setCodeSetupError] = useState("");
  const [savingCode, setSavingCode] = useState(false);

  // Change teacher code state (from profile page, without switch flow)
  const [currentCode, setCurrentCode] = useState("");

  const dashboardPath = getDashboardPath(profile?.role);
  const currentRole = profile?.role ?? AppRole.student;
  const targetRole: "teacher" | "student" =
    currentRole === AppRole.teacher ? "student" : "teacher";
  const targetLabel = targetRole === "teacher" ? "Teacher" : "Student";

  const goBack = () => navigate({ to: dashboardPath });

  // ---- Camera ----
  const startCamera = useCallback(async () => {
    setCameraError(null);
    setCaptured(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
      setCameraStream(stream);
      setCameraOpen(true);
    } catch {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraStream(stream);
        setCameraOpen(true);
      } catch (err) {
        setCameraError("Camera access denied or unavailable.");
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const stopCamera = useCallback(() => {
    for (const t of cameraStream?.getTracks() ?? []) t.stop();
    setCameraStream(null);
    setCameraOpen(false);
    setCaptured(null);
  }, [cameraStream]);

  useEffect(() => {
    return () => {
      for (const t of cameraStream?.getTracks() ?? []) t.stop();
    };
  }, [cameraStream]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    setCaptured(canvas.toDataURL("image/jpeg", 0.85));
  };

  const useCapturedPhoto = () => {
    if (captured) {
      setProfileImageUrl(captured);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfileImageUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  // ---- Save profile ----
  const handleSave = async () => {
    const currentProfile = profile ?? loadLocalProfile();
    if (!currentProfile) {
      toast.error("Profile not found. Please restart the app.");
      return;
    }
    if (!displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    const safetyTimer = setTimeout(() => setSaving(false), 8000);
    try {
      const saved = saveLocalProfile({
        ...currentProfile,
        displayName: displayName.trim(),
        interests,
        profileImageUrl,
      });
      setProfile(saved);
      try {
        await Promise.race([
          saveUserToFirestore(
            saved.userId,
            saved.displayName,
            saved.role as string,
          ),
          new Promise<void>((resolve) => setTimeout(resolve, 5000)),
        ]);
      } catch {
        /* ignore */
      }
      toast.success("Profile saved!");
      setTimeout(() => navigate({ to: getDashboardPath(saved.role) }), 800);
    } catch (err) {
      console.error("Profile save error:", err);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      clearTimeout(safetyTimer);
      setSaving(false);
    }
  };

  // ---- Role switch ----
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
        const alreadyInit =
          teacherAlreadyInitialized ||
          (profile ? await isTeacherInitialized(profile.userId) : false);
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
      // First time: switch role immediately (no code needed), then show create-code modal
      const cp = profile ?? loadLocalProfile();
      if (cp) {
        const updated = { ...cp, role: AppRole.teacher };
        saveLocalProfile(updated);
        setProfile(updated);
        localStorage.setItem("askspark_role", "teacher");
        // Fire-and-forget Firebase update
        void saveUserToFirestore(cp.userId, cp.displayName, "teacher");
      }
      setNewCode("");
      setConfirmCode("");
      setCodeSetupError("");
      setSwitchStep("create-teacher-code");
    } else {
      performSwitch("student", undefined);
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
    const safetyTimer = setTimeout(() => setSavingCode(false), 8000);
    try {
      await Promise.race([
        saveTeacherCode(currentProfile.userId, newCode.trim()),
        new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 8000),
        ),
      ]);
      setTeacherAlreadyInitialized(true);
      clearTimeout(safetyTimer);
      // Role was already switched in handleConfirmContinue; just navigate
      toast.success("Teacher code created! Welcome to Teacher mode.");
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
    const safetyTimer = setTimeout(() => setSavingCode(false), 8000);
    try {
      await Promise.race([
        saveTeacherCode(currentProfile.userId, newCode.trim()),
        new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 8000),
        ),
      ]);
      clearTimeout(safetyTimer);
      toast.success("Teacher code updated! You can now switch to Teacher.");
      resetSwitchState();
    } catch (err) {
      console.error(err);
      setCodeSetupError("Failed to update code. Please try again.");
    } finally {
      clearTimeout(safetyTimer);
      setSavingCode(false);
    }
  };

  // ---- Change Teacher Code (from profile, without switch flow) ----
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
    const safetyTimer = setTimeout(() => setSavingCode(false), 8000);
    try {
      let valid: boolean;
      try {
        valid = await Promise.race([
          verifyTeacherCode(currentProfile.userId, currentCode.trim()),
          new Promise<boolean>((_, reject) =>
            setTimeout(
              () =>
                reject(new Error("Verification timed out. Please try again.")),
              8000,
            ),
          ),
        ]);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Verification timed out. Please try again.";
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
        new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 8000),
        ),
      ]);
      clearTimeout(safetyTimer);
      toast.success("Teacher code updated successfully!");
      resetSwitchState();
    } catch (err) {
      console.error(err);
      setCodeSetupError("Failed to update code. Please try again.");
    } finally {
      clearTimeout(safetyTimer);
      setSavingCode(false);
    }
  };

  const performSwitch = async (
    role: "student" | "teacher",
    code: string | undefined,
  ) => {
    const currentProfile = profile ?? loadLocalProfile();
    if (!currentProfile) return;
    setSwitching(true);
    setTeacherCodeError("");
    const safetyTimer = setTimeout(() => setSwitching(false), 8000);
    try {
      const result = await switchRole(currentProfile.userId, role, code);
      if (!result.success) {
        setTeacherCodeError(result.error ?? "Switch failed.");
        return;
      }
      resetSwitchState();
      toast.success(
        `Role switched to ${role === "teacher" ? "Teacher" : "Student"}!`,
      );
      navigate({
        to: role === "teacher" ? "/dashboard/teacher" : "/dashboard/student",
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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 text-center warm-shadow">
          <p className="text-muted-foreground mb-4">No profile found.</p>
          <Button onClick={() => navigate({ to: "/onboarding" })}>
            Create Profile
          </Button>
        </div>
      </div>
    );
  }

  const isStudent = profile.role === AppRole.student;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-muted/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="font-display font-bold text-foreground text-base">
            Edit Profile
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Profile Image */}
        <div className="glass-card rounded-2xl p-6 warm-shadow border-white/40 space-y-5">
          <h2 className="font-display font-semibold text-base text-foreground">
            Profile Photo
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-white/60">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full gradient-primary flex items-center justify-center">
                  <User className="w-12 h-12 text-white/80" />
                </div>
              )}
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={startCamera}
                className="min-h-[44px] gap-2"
              >
                <Camera className="w-4 h-4" /> Take Photo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[44px] gap-2"
              >
                <Upload className="w-4 h-4" /> Upload Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          {cameraError && (
            <p className="text-sm text-destructive text-center">
              {cameraError}
            </p>
          )}
          {cameraOpen && (
            <div className="space-y-3 border border-border rounded-xl p-4 bg-muted/30">
              <canvas ref={canvasRef} className="hidden" />
              {!captured ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded-xl aspect-video object-cover bg-black"
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={capturePhoto}
                      className="flex-1 gradient-primary text-white border-0 min-h-[44px]"
                    >
                      📸 Capture
                    </Button>
                    <Button
                      variant="outline"
                      onClick={stopCamera}
                      className="min-h-[44px]"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={captured}
                    alt="Captured"
                    className="w-full rounded-xl aspect-video object-cover"
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={useCapturedPhoto}
                      className="flex-1 gradient-primary text-white border-0 min-h-[44px]"
                    >
                      Use This Photo
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCaptured(null)}
                      className="min-h-[44px]"
                    >
                      Retake
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="glass-card rounded-2xl p-6 warm-shadow border-white/40 space-y-4">
          <h2 className="font-display font-semibold text-base text-foreground">
            Your Name
          </h2>
          <div className="space-y-2">
            <Label
              htmlFor="displayName"
              className="text-sm text-muted-foreground"
            >
              Display Name
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="h-11 rounded-xl bg-white/60"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={`capitalize ${
                currentRole === AppRole.teacher
                  ? "bg-amber-100 text-amber-800 border-amber-200"
                  : "bg-blue-100 text-blue-800 border-blue-200"
              }`}
            >
              {currentRole === AppRole.teacher ? "👨‍🏫 Teacher" : "🎓 Student"}
            </Badge>
            {(profile.userClass || profile.userBranch) && (
              <Badge variant="outline" className="text-muted-foreground">
                {profile.userClass ?? profile.userBranch}
              </Badge>
            )}
          </div>
        </div>

        {/* Interests (students only) */}
        {isStudent && (
          <div className="glass-card rounded-2xl p-6 warm-shadow border-white/40 space-y-4">
            <h2 className="font-display font-semibold text-base text-foreground">
              Your Interests
            </h2>
            <p className="text-sm text-muted-foreground">
              Select subjects you enjoy learning about.
            </p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => {
                const selected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 min-h-[44px] ${
                      selected
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/60 text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Switch Role */}
        <div className="glass-card rounded-2xl p-6 warm-shadow space-y-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-base text-foreground">
              Switch Role
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current role</p>
              <Badge
                className={`capitalize ${
                  currentRole === AppRole.teacher
                    ? "bg-amber-100 text-amber-800 border-amber-200"
                    : "bg-blue-100 text-blue-800 border-blue-200"
                }`}
              >
                {currentRole === AppRole.teacher
                  ? "👨‍🏫 Teacher"
                  : "🎓 Student"}
              </Badge>
            </div>
            <Button
              variant="outline"
              onClick={handleSwitchClick}
              disabled={handling || switching}
              className="gap-2 min-h-[44px] border-primary/30 text-primary hover:bg-primary/5"
            >
              <RefreshCw className="w-4 h-4" />
              Switch to {targetLabel}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {teacherAlreadyInitialized && targetRole === "teacher"
              ? "Re-switching to Teacher requires your personal teacher code."
              : !teacherAlreadyInitialized && targetRole === "teacher"
                ? "You'll create a personal teacher code on first switch."
                : "Switching roles won't delete any of your data."}
          </p>
        </div>

        {/* Change Teacher Code (teachers only) */}
        {!isStudent && (
          <div
            className="glass-card rounded-2xl p-6 warm-shadow space-y-4"
            data-ocid="teacher_code.card"
          >
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-primary" />
              <h2 className="font-display font-semibold text-base text-foreground">
                Teacher Code
              </h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Update your personal teacher code anytime.
              </p>
              <Button
                variant="outline"
                onClick={handleChangeCodeClick}
                data-ocid="teacher_code.open_modal_button"
                className="gap-2 min-h-[44px] border-primary/30 text-primary hover:bg-primary/5 shrink-0"
              >
                <KeyRound className="w-4 h-4" />
                Change Code
              </Button>
            </div>
          </div>
        )}

        {/* Save */}
        <Button
          onClick={handleSave}
          disabled={saving}
          data-ocid="profile.submit_button"
          className="w-full gradient-primary text-white border-0 shadow-primary font-semibold h-12 rounded-xl"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : (
            "Save Profile"
          )}
        </Button>
        <div className="h-8" />
      </main>

      {/* Dialog: Confirmation */}
      <Dialog
        open={switchStep === "confirm"}
        onOpenChange={(open) => {
          if (!open) resetSwitchState();
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Switch Role</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 pt-1">
                <p>
                  Are you sure you want to switch to{" "}
                  <strong>{targetLabel}</strong> mode?
                </p>
                {targetRole === "teacher" && !teacherAlreadyInitialized && (
                  <p className="text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2 border border-green-200">
                    First time switching to Teacher — you'll create your own
                    personal code next.
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Your existing data will be preserved.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={resetSwitchState}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmContinue}
              disabled={switching}
              className="flex-1 gradient-primary text-white border-0"
            >
              {switching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Switching…
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Create Teacher Code (first time) */}
      <Dialog
        open={switchStep === "create-teacher-code"}
        onOpenChange={(open) => {
          if (!open) resetSwitchState();
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>🔑 Create Your Teacher Code</DialogTitle>
            <DialogDescription>
              Set a personal code you'll use every time you switch to Teacher
              mode. Keep it somewhere safe — minimum 6 characters.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-code" className="text-sm">
                New Teacher Code
              </Label>
              <div className="relative">
                <Input
                  id="new-code"
                  type={showNewCode ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={newCode}
                  onChange={(e) => {
                    setNewCode(e.target.value);
                    setCodeSetupError("");
                  }}
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewCode((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showNewCode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-code" className="text-sm">
                Confirm Code
              </Label>
              <Input
                id="confirm-code"
                type={showNewCode ? "text" : "password"}
                placeholder="Re-enter your code"
                value={confirmCode}
                onChange={(e) => {
                  setConfirmCode(e.target.value);
                  setCodeSetupError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateCodeSubmit();
                }}
                className="h-11 rounded-xl"
              />
            </div>
            {codeSetupError && (
              <p className="text-sm text-destructive">{codeSetupError}</p>
            )}
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={resetSwitchState}
              disabled={savingCode}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateCodeSubmit}
              disabled={savingCode || !newCode || !confirmCode}
              className="flex-1 gradient-primary text-white border-0"
            >
              {savingCode ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save & Switch"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Enter Teacher Code (returning teacher) */}
      <Dialog
        open={switchStep === "teacher-code"}
        onOpenChange={(open) => {
          if (!open) resetSwitchState();
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Enter Teacher Code</DialogTitle>
            <DialogDescription>
              Enter your personal teacher code to switch back to Teacher mode.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label htmlFor="teacher-code" className="text-sm">
                Teacher Code
              </Label>
              <div className="relative">
                <Input
                  id="teacher-code"
                  type={showCode ? "text" : "password"}
                  placeholder="Enter your teacher code"
                  value={teacherCode}
                  onChange={(e) => {
                    setTeacherCode(e.target.value);
                    setTeacherCodeError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTeacherCodeSubmit();
                  }}
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCode((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showCode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {teacherCodeError && (
              <p className="text-sm text-destructive">{teacherCodeError}</p>
            )}
            <button
              type="button"
              onClick={handleForgotCode}
              className="text-sm text-primary hover:underline underline-offset-2"
            >
              Forgot Teacher Code?
            </button>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={resetSwitchState}
              disabled={switching}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleTeacherCodeSubmit}
              disabled={switching || !teacherCode.trim()}
              className="flex-1 gradient-primary text-white border-0"
            >
              {switching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Switching…
                </>
              ) : (
                "Confirm Switch"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Reset Teacher Code */}
      <Dialog
        open={switchStep === "reset-teacher-code"}
        onOpenChange={(open) => {
          if (!open) resetSwitchState();
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>🔄 Reset Teacher Code</DialogTitle>
            <DialogDescription>
              Create a new teacher code. Your old code will be permanently
              replaced.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="reset-new-code" className="text-sm">
                New Teacher Code
              </Label>
              <div className="relative">
                <Input
                  id="reset-new-code"
                  type={showNewCode ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={newCode}
                  onChange={(e) => {
                    setNewCode(e.target.value);
                    setCodeSetupError("");
                  }}
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewCode((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showNewCode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reset-confirm-code" className="text-sm">
                Confirm New Code
              </Label>
              <Input
                id="reset-confirm-code"
                type={showNewCode ? "text" : "password"}
                placeholder="Re-enter new code"
                value={confirmCode}
                onChange={(e) => {
                  setConfirmCode(e.target.value);
                  setCodeSetupError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleResetCodeSubmit();
                }}
                className="h-11 rounded-xl"
              />
            </div>
            {codeSetupError && (
              <p className="text-sm text-destructive">{codeSetupError}</p>
            )}
            <p className="text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              ⚠️ After resetting, use your new code next time you switch to
              Teacher.
            </p>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setSwitchStep("teacher-code")}
              disabled={savingCode}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleResetCodeSubmit}
              disabled={savingCode || !newCode || !confirmCode}
              className="flex-1 gradient-primary text-white border-0"
            >
              {savingCode ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                "Reset Code"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Change Teacher Code (from profile, no switch) */}
      <Dialog
        open={switchStep === "change-teacher-code"}
        onOpenChange={(open) => {
          if (!open) resetSwitchState();
        }}
      >
        <DialogContent
          className="sm:max-w-md rounded-2xl"
          data-ocid="teacher_code.dialog"
        >
          <DialogHeader>
            <DialogTitle>🔑 Change Teacher Code</DialogTitle>
            <DialogDescription>
              Enter your current code to verify, then set a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Current code */}
            <div className="space-y-2">
              <Label htmlFor="current-code" className="text-sm">
                Current Teacher Code
              </Label>
              <div className="relative">
                <Input
                  id="current-code"
                  type={showCode ? "text" : "password"}
                  placeholder="Enter your current code"
                  value={currentCode}
                  onChange={(e) => {
                    setCurrentCode(e.target.value);
                    setCodeSetupError("");
                  }}
                  data-ocid="teacher_code.input"
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCode((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showCode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {/* New code */}
            <div className="space-y-2">
              <Label htmlFor="change-new-code" className="text-sm">
                New Teacher Code
              </Label>
              <div className="relative">
                <Input
                  id="change-new-code"
                  type={showNewCode ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={newCode}
                  onChange={(e) => {
                    setNewCode(e.target.value);
                    setCodeSetupError("");
                  }}
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewCode((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showNewCode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {/* Confirm new code */}
            <div className="space-y-2">
              <Label htmlFor="change-confirm-code" className="text-sm">
                Confirm New Code
              </Label>
              <Input
                id="change-confirm-code"
                type={showNewCode ? "text" : "password"}
                placeholder="Re-enter new code"
                value={confirmCode}
                onChange={(e) => {
                  setConfirmCode(e.target.value);
                  setCodeSetupError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleChangeCodeSubmit();
                }}
                className="h-11 rounded-xl"
              />
            </div>
            {codeSetupError && (
              <p
                className="text-sm text-destructive"
                data-ocid="teacher_code.error_state"
              >
                {codeSetupError}
              </p>
            )}
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={resetSwitchState}
              disabled={savingCode}
              data-ocid="teacher_code.cancel_button"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangeCodeSubmit}
              disabled={
                savingCode || !currentCode.trim() || !newCode || !confirmCode
              }
              data-ocid="teacher_code.submit_button"
              className="flex-1 gradient-primary text-white border-0"
            >
              {savingCode ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                "Update Code"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
