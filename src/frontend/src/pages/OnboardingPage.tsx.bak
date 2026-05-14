import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Loader2, School, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppRole } from "../backend";
import {
  COLLEGE_BRANCH_NAMES,
  SCHOOL_CLASSES,
  type UserType,
} from "../data/branchData";
import { useSubmitProfile, useUserProfile } from "../hooks/useQueries";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<AppRole | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userClass, setUserClass] = useState("");
  const [userBranch, setUserBranch] = useState("");
  const submitProfile = useSubmitProfile();

  const { data: existingProfile, isLoading: isProfileLoading } =
    useUserProfile();

  useEffect(() => {
    if (isProfileLoading) return;
    if (existingProfile?.role) {
      if (existingProfile.role === AppRole.teacher) {
        navigate({ to: "/dashboard/teacher" });
      } else {
        navigate({ to: "/dashboard/student" });
      }
    }
  }, [existingProfile, isProfileLoading, navigate]);

  const canProceedStep1 = displayName.trim().length > 0 && role !== null;
  const isStudent = role === AppRole.student;

  const handleStep1Next = () => {
    if (!canProceedStep1) {
      toast.error("Please fill in your name and select a role");
      return;
    }
    if (isStudent) {
      setStep(2);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    try {
      await submitProfile.mutateAsync({
        displayName: displayName.trim(),
        role: role as AppRole,
      });

      // Persist student profile choice
      if (isStudent && userType) {
        localStorage.setItem("userType", userType);
        if (userType === "school" && userClass) {
          localStorage.setItem("userClass", userClass);
          localStorage.removeItem("userBranch");
        } else if (userType === "college" && userBranch) {
          localStorage.setItem("userBranch", userBranch);
          localStorage.removeItem("userClass");
        }
      }

      toast.success("Profile created! Welcome aboard 🎉");
      if (role === AppRole.teacher) {
        navigate({ to: "/dashboard/teacher" });
      } else {
        navigate({ to: "/dashboard/student" });
      }
    } catch {
      toast.error("Failed to create profile. Please try again.");
    }
  };

  const canProceedStep2 =
    userType !== null &&
    (userType === "school" ? userClass !== "" : userBranch !== "");

  if (isProfileLoading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-9 h-9 text-primary-foreground" />
          </div>
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            Checking your profile…
          </p>
        </div>
      </div>
    );
  }

  if (existingProfile?.role) {
    return null;
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome to AskSpark
          </h1>
          <p className="text-muted-foreground mt-2">
            Let&apos;s set up your profile to get started
          </p>
        </div>

        {/* Step indicator for students */}
        {isStudent && (
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={"flex-1 flex flex-col items-center gap-1"}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= s
                        ? "gradient-primary text-white shadow-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  <div
                    className={`text-[11px] font-medium ${
                      step >= s ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s === 1 ? "Profile" : "Your Learning"}
                  </div>
                </div>
                {s < 2 && (
                  <div
                    className={`h-0.5 w-12 mx-1 rounded transition-all ${
                      step > s ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ── Step 1: Profile ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="warm-card-shadow-lg border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Create Your Profile</CardTitle>
                  <CardDescription>
                    Choose your role and enter your display name
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        placeholder="Enter your name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="border-border"
                        data-ocid="onboarding.input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>I am a...</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setRole(AppRole.student)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            role === AppRole.student
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                          data-ocid="onboarding.student.toggle"
                        >
                          <BookOpen className="w-6 h-6 text-primary mb-2" />
                          <div className="font-semibold text-foreground text-sm">
                            Student
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Submit doubts &amp; build confidence
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole(AppRole.teacher)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            role === AppRole.teacher
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                          data-ocid="onboarding.teacher.toggle"
                        >
                          <Users className="w-6 h-6 text-primary mb-2" />
                          <div className="font-semibold text-foreground text-sm">
                            Teacher
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Review &amp; answer student doubts
                          </div>
                        </button>
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold"
                      disabled={submitProfile.isPending || !canProceedStep1}
                      onClick={handleStep1Next}
                      data-ocid="onboarding.submit_button"
                    >
                      {submitProfile.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Profile...
                        </>
                      ) : isStudent ? (
                        "Next →"
                      ) : (
                        "Continue to Dashboard"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── Step 2: Student type ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="warm-card-shadow-lg border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Your Learning Path</CardTitle>
                  <CardDescription>
                    Tell us your current level so we can personalise your
                    experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {/* School / College picker */}
                    <div className="space-y-2">
                      <Label>What type of student are you?</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setUserType("school");
                            setUserBranch("");
                          }}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            userType === "school"
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                          data-ocid="onboarding.school.toggle"
                        >
                          <School className="w-6 h-6 text-primary mb-2" />
                          <div className="font-semibold text-foreground text-sm">
                            🏫 School Student
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Class 6 – 12
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setUserType("college");
                            setUserClass("");
                          }}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            userType === "college"
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                          data-ocid="onboarding.college.toggle"
                        >
                          <GraduationCap className="w-6 h-6 text-primary mb-2" />
                          <div className="font-semibold text-foreground text-sm">
                            🎓 College Student
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Engineering / Medical / ITI
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* School class selector */}
                    {userType === "school" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <Label>Select your class</Label>
                        <Select value={userClass} onValueChange={setUserClass}>
                          <SelectTrigger
                            className="border-border"
                            data-ocid="onboarding.select"
                          >
                            <SelectValue placeholder="Choose class…" />
                          </SelectTrigger>
                          <SelectContent>
                            {SCHOOL_CLASSES.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    )}

                    {/* College branch selector */}
                    {userType === "college" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <Label>Select your branch</Label>
                        <Select
                          value={userBranch}
                          onValueChange={setUserBranch}
                        >
                          <SelectTrigger
                            className="border-border"
                            data-ocid="onboarding.select"
                          >
                            <SelectValue placeholder="Choose branch…" />
                          </SelectTrigger>
                          <SelectContent>
                            {COLLEGE_BRANCH_NAMES.map((b) => (
                              <SelectItem key={b} value={b}>
                                {b}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 rounded-full"
                        onClick={() => setStep(1)}
                        data-ocid="onboarding.cancel_button"
                      >
                        ← Back
                      </Button>
                      <Button
                        type="button"
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold"
                        disabled={submitProfile.isPending || !canProceedStep2}
                        onClick={handleFinalSubmit}
                        data-ocid="onboarding.submit_button"
                      >
                        {submitProfile.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Let's Go! 🚀"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
