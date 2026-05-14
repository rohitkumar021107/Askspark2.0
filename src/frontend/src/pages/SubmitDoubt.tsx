import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Eye,
  GraduationCap,
  Loader2,
  Send,
  Shield,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import {
  COLLEGE_BRANCHES,
  FULL_CLASS_LIST,
  SCHOOL_SUBJECTS,
  readUserProfile,
} from "../data/branchData";
import { useSubmitDoubt } from "../hooks/useQueries";

const STEPS = [
  { n: 1, title: "Describe Your Doubt", icon: "📝" },
  { n: 2, title: "Add Attachments", icon: "📎" },
  { n: 3, title: "Review & Submit", icon: "🚀" },
];

interface ImagePreview {
  url: string;
  name: string;
  file: File;
}

interface FormState {
  branch: string;
  subject: string;
  title: string;
  description: string;
  anonymous: boolean;
  images: ImagePreview[];
}

export default function SubmitDoubt() {
  const navigate = useNavigate();
  const submitDoubtMutation = useSubmitDoubt();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Read profile once on mount
  const profile = readUserProfile();

  const [form, setForm] = useState<FormState>({
    branch: profile.userBranch ?? profile.userClass ?? "",
    subject: "",
    title: "",
    description: "",
    anonymous: false,
    images: [],
  });
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Derive subject list based on selected branch/class
  const getSubjectsForBranch = (branchOrClass: string): string[] => {
    if (!branchOrClass) {
      // fallback
      if (profile.userType === "school") return SCHOOL_SUBJECTS;
      if (profile.userType === "college" && profile.userBranch) {
        return COLLEGE_BRANCHES[profile.userBranch] ?? SCHOOL_SUBJECTS;
      }
      return SCHOOL_SUBJECTS;
    }
    // college branch?
    if (COLLEGE_BRANCHES[branchOrClass]) return COLLEGE_BRANCHES[branchOrClass];
    // school class
    return SCHOOL_SUBJECTS;
  };

  const currentSubjects = getSubjectsForBranch(form.branch);

  // When branch/class changes, reset subject if it's no longer valid
  const handleBranchChange = (val: string) => {
    const subs = getSubjectsForBranch(val);
    setForm((prev) => ({
      ...prev,
      branch: val,
      subject: subs.includes(prev.subject) ? prev.subject : "",
    }));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newImgs = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 4 - form.images.length)
      .map((f) => ({ url: URL.createObjectURL(f), name: f.name, file: f }));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...newImgs] }));
  };

  const removeImage = (idx: number) =>
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));

  const canProceed1 =
    form.subject.length > 0 &&
    form.title.trim().length > 5 &&
    form.description.trim().length > 10;

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    console.log("[SubmitDoubt] handleSubmit called", {
      branch: form.branch,
      subject: form.subject,
      titleLength: form.title.trim().length,
    });

    // Safety net — always unblock the button after 10 seconds
    const safetyTimer = setTimeout(() => {
      console.warn("[SubmitDoubt] Safety timer fired — forcing loading off");
      setSubmitting(false);
    }, 10_000);

    try {
      const fullText = `${form.title.trim()}\n\n${form.description.trim()}`;

      await Promise.race([
        submitDoubtMutation.mutateAsync({
          text: fullText,
          isAnonymous: form.anonymous,
          branch: form.branch,
          subject: form.subject,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 8_000),
        ),
      ]);

      // Firestore succeeded
      toast.success(
        "Doubt submitted successfully! 🎉 A teacher will answer soon.",
      );
      setForm({
        branch: profile.userBranch ?? profile.userClass ?? "",
        subject: "",
        title: "",
        description: "",
        anonymous: false,
        images: [],
      });
      setStep(1);
    } catch (err) {
      console.error("[SubmitDoubt] submission error:", err);
      if (err instanceof Error && err.message === "saved_offline") {
        // Saved to localStorage — treat as soft success
        toast.success(
          "Doubt submitted successfully! 📱 It will sync when connection improves.",
        );
        setForm({
          branch: profile.userBranch ?? profile.userClass ?? "",
          subject: "",
          title: "",
          description: "",
          anonymous: false,
          images: [],
        });
        setStep(1);
      } else {
        const msg =
          err instanceof Error && err.message === "Request timed out"
            ? "Submission timed out. Please check your connection and try again."
            : "Failed to submit doubt. Please try again.";
        setSubmitError(msg);
        toast.error(msg);
      }
    } finally {
      clearTimeout(safetyTimer);
      setSubmitting(false);
    }
  };

  // Full class list from branchData — all 14 options in correct order
  const branchLabel = "Class / Branch";
  const branchPlaceholder = "Select your class or branch";
  const branchItems: string[] = FULL_CLASS_LIST;

  return (
    <div className="min-h-screen dashboard-gradient">
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-primary">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Submit a Doubt
          </h1>
          <p className="text-muted-foreground">
            Your questions deserve answers. Ask freely — anonymously if you
            prefer.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step > s.n
                        ? "gradient-primary text-white shadow-primary"
                        : step === s.n
                          ? "gradient-primary text-white shadow-primary"
                          : "bg-secondary/40 text-muted-foreground border border-primary/20"
                    }`}
                  >
                    {step > s.n ? <CheckCircle2 className="w-5 h-5" /> : s.n}
                  </div>
                  <div
                    className={`text-xs mt-1.5 font-medium hidden sm:block ${
                      step === s.n
                        ? "text-primary"
                        : step > s.n
                          ? "text-accent"
                          : "text-muted-foreground"
                    }`}
                  >
                    {s.title}
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 rounded transition-all duration-500 ${
                      step > s.n ? "bg-primary" : "bg-secondary/40"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="glass-card warm-shadow-lg border-primary/20">
          <CardContent className="p-6 sm:p-8">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-display text-xl font-bold text-foreground">
                  📝 Describe Your Doubt
                </h2>

                {/* Class / Branch selector */}
                <div className="space-y-2">
                  <Label>{branchLabel}</Label>
                  <Select
                    value={form.branch}
                    onValueChange={handleBranchChange}
                  >
                    <SelectTrigger
                      className="border-primary/20 bg-secondary/20"
                      data-ocid="submit.select"
                    >
                      <SelectValue placeholder={branchPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {branchItems.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject selector — changes based on branch/class */}
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select
                    value={form.subject}
                    onValueChange={(v) => updateForm("subject", v)}
                  >
                    <SelectTrigger
                      className="border-primary/20 bg-secondary/20"
                      data-ocid="submit.select"
                    >
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentSubjects.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Doubt Title</Label>
                  <Input
                    placeholder="e.g. Why does integration by parts work?"
                    value={form.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                    className="border-primary/20 bg-secondary/20 focus:border-primary/50"
                    data-ocid="submit.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Describe in Detail</Label>
                  <Textarea
                    placeholder="Explain what you understand so far and what's confusing you. The more detail, the better the answer!"
                    value={form.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                    className="border-primary/20 bg-secondary/20 focus:border-primary/50 min-h-[120px] resize-none"
                    data-ocid="submit.textarea"
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {form.description.length} chars
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-primary/20">
                  <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          Submit Anonymously
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Your name won&apos;t be shown to teachers or
                          classmates
                        </div>
                      </div>
                      <Switch
                        checked={form.anonymous}
                        onCheckedChange={(v) => updateForm("anonymous", v)}
                        data-ocid="submit.switch"
                      />
                    </div>
                    {form.anonymous && (
                      <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> You&apos;ll
                        appear as &quot;Anonymous Student&quot;
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-5 animate-slide-in-right">
                <h2 className="font-display text-xl font-bold text-foreground">
                  📎 Add Attachments{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    (optional)
                  </span>
                </h2>

                {/* Hidden file inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                  data-ocid="submit.upload_button"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                  data-ocid="submit.camera_input"
                />

                {/* Primary action buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-2.5 p-6 rounded-2xl gradient-primary text-white font-semibold shadow-primary hover:opacity-90 transition-opacity"
                    data-ocid="submit.camera_button"
                  >
                    <Camera className="w-8 h-8" />
                    <span className="text-sm">Take Photo</span>
                    <span className="text-xs opacity-80 font-normal">
                      Opens camera directly
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-2.5 p-6 rounded-2xl border-2 border-primary/20 bg-secondary/20 text-foreground font-semibold hover:border-primary/50 hover:bg-secondary/40 transition-colors"
                    data-ocid="submit.upload_button"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm">Upload Image</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      From gallery or files
                    </span>
                  </button>
                </div>

                {/* Drag-and-drop zone */}
                <button
                  type="button"
                  className={`border border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer w-full ${
                    dragOver
                      ? "border-primary bg-primary/10"
                      : "border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  data-ocid="submit.dropzone"
                >
                  <div className="text-xs text-muted-foreground">
                    Or drag &amp; drop images here · PNG, JPG up to 10MB · Max 4
                    images
                  </div>
                </button>

                {form.images.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-foreground mb-3">
                      {form.images.length} image(s) added
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {form.images.map((img, i) => (
                        <div
                          key={img.url}
                          className="relative group rounded-xl overflow-hidden border border-border warm-shadow"
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-full h-28 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            data-ocid={`submit.delete_button.${i + 1}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="p-2 text-xs text-muted-foreground truncate">
                            {img.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-5 animate-slide-in-right">
                <h2 className="font-display text-xl font-bold text-foreground">
                  🚀 Review &amp; Submit
                </h2>
                <Card className="border-primary/20 bg-secondary/20">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {form.branch && (
                          <span className="text-xs font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full">
                            {form.branch}
                          </span>
                        )}
                        <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {form.subject || "No subject"}
                        </span>
                      </div>
                      {form.anonymous && (
                        <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Anonymous
                        </span>
                      )}
                    </div>
                    <div className="font-display font-bold text-foreground text-lg">
                      {form.title || "(No title)"}
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {form.description || "(No description)"}
                    </p>
                    {form.images.length > 0 && (
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {form.images.length} attachment(s)
                        </div>
                        <div className="flex gap-2">
                          {form.images.map((img) => (
                            <img
                              key={img.url}
                              src={img.url}
                              alt={img.name}
                              className="w-14 h-14 rounded-lg object-cover border border-border"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                {submitError && (
                  <div
                    className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive"
                    data-ocid="submit.error_state"
                  >
                    <strong>Error:</strong> {submitError}
                  </div>
                )}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary">
                  <strong>What happens next?</strong> Your doubt will be
                  submitted and a teacher will respond — usually within 24
                  hours.
                </div>
                <Button
                  className="w-full rounded-xl gradient-primary text-white font-semibold border-0 shadow-primary hover:opacity-90"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={submitting}
                  data-ocid="submit.submit_button"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" /> Submit Doubt
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary/20">
              {step > 1 ? (
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setStep((s) => s - 1)}
                  data-ocid="submit.secondary_button"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="rounded-xl text-muted-foreground"
                  onClick={() => navigate({ to: "/" })}
                  data-ocid="submit.cancel_button"
                >
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              )}
              {step < 3 ? (
                <Button
                  className="rounded-xl gradient-primary text-white border-0 font-medium"
                  disabled={step === 1 ? !canProceed1 : false}
                  onClick={() => setStep((s) => s + 1)}
                  data-ocid="submit.primary_button"
                >
                  Next Step <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setStep(1)}
                  data-ocid="submit.secondary_button"
                >
                  <Eye className="w-4 h-4 mr-2" /> Edit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === s.n
                  ? "w-8 bg-primary"
                  : step > s.n
                    ? "w-2 bg-green-500"
                    : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
