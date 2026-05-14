import { c as createLucideIcon, u as useNavigate, b as useSearch, r as reactExports, A as AppRole, j as jsxRuntimeExports, m as motion, d as AnimatePresence, e as ue, g as getOrCreateUserId, a as saveUserToFirestore } from "./index-CiicjzrK.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-CrjAUlyJ.js";
import { I as Input } from "./input-D9SZkx1r.js";
import { L as Label } from "./label-Cg1KVKjU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DP7kiOU_.js";
import { S as SCHOOL_CLASSES, C as COLLEGE_BRANCH_NAMES } from "./branchData-CJjl6Z26.js";
import { a as useSubmitProfile, u as useUserProfile } from "./useQueries-vOipBcgE.js";
import { G as GraduationCap } from "./graduation-cap-BHG3WFRQ.js";
import { L as LoaderCircle } from "./loader-circle-DQccp6ji.js";
import { B as BookOpen } from "./book-open-Bmv8GHoc.js";
import { U as Users } from "./users-BBY2vuqG.js";
import "./utils-C0ugf0YY.js";
import "./index-xWxfC-pn.js";
import "./index-IXOTxK3N.js";
import "./index-BUlsMpCV.js";
import "./index-BjI1O3hJ.js";
import "./Combination-BPR_6sdE.js";
import "./index-C7zsWbmt.js";
import "./chevron-down-DQR61kK2.js";
import "./chevron-up-gQIqj1MH.js";
import "./useFirestoreDoubts-CPACqU8A.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 22v-4a2 2 0 1 0-4 0v4", key: "hhkicm" }],
  [
    "path",
    {
      d: "m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10",
      key: "1xqip1"
    }
  ],
  ["path", { d: "M18 5v17", key: "1sw6gf" }],
  ["path", { d: "m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6", key: "9d2mlk" }],
  ["path", { d: "M6 5v17", key: "1xfsm0" }],
  ["circle", { cx: "12", cy: "9", r: "2", key: "1092wv" }]
];
const School = createLucideIcon("school", __iconNode);
function OnboardingPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/onboarding" });
  const [step, setStep] = reactExports.useState(1);
  const [displayName, setDisplayName] = reactExports.useState("");
  const [role, setRole] = reactExports.useState(null);
  const [userType, setUserType] = reactExports.useState(null);
  const [userClass, setUserClass] = reactExports.useState("");
  const [userBranch, setUserBranch] = reactExports.useState("");
  const submitProfile = useSubmitProfile();
  const { data: existingProfile, isLoading: isProfileLoading } = useUserProfile();
  reactExports.useEffect(() => {
    if ((search == null ? void 0 : search.role) === "teacher") {
      setRole(AppRole.teacher);
    }
  }, [search == null ? void 0 : search.role]);
  reactExports.useEffect(() => {
    if (isProfileLoading) return;
    if (existingProfile == null ? void 0 : existingProfile.role) {
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
      ue.error("Please fill in your name and select a role");
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
        role,
        userType: userType ?? void 0,
        userClass: userClass || void 0,
        userBranch: userBranch || void 0
      });
      try {
        const uid = getOrCreateUserId();
        await saveUserToFirestore(uid, displayName.trim(), role);
      } catch {
      }
      ue.success("Profile created! Welcome aboard 🎉");
      if (role === AppRole.teacher) {
        navigate({ to: "/dashboard/teacher" });
      } else {
        navigate({ to: "/dashboard/student" });
      }
    } catch (err) {
      console.error("Failed to create profile:", err);
      const msg = err instanceof Error ? err.message : "Unknown error";
      ue.error(`Failed to create profile: ${msg}`);
    }
  };
  const canProceedStep2 = userType !== null && (userType === "school" ? userClass !== "" : userBranch !== "");
  if (isProfileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen hero-gradient flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-9 h-9 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Checking your profile…" })
    ] }) });
  }
  if (existingProfile == null ? void 0 : existingProfile.role) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen hero-gradient flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
      className: "w-full max-w-md",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-9 h-9 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Welcome to AskSpark" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Let's set up your profile to get started" })
        ] }),
        isStudent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-6", children: [1, 2].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? "gradient-primary text-white shadow-primary" : "bg-muted text-muted-foreground"}`,
                children: s
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `text-[11px] font-medium ${step >= s ? "text-primary" : "text-muted-foreground"}`,
                children: s === 1 ? "Profile" : "Your Learning"
              }
            )
          ] }),
          s < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-0.5 w-12 mx-1 rounded transition-all ${step > s ? "bg-primary" : "bg-muted"}`
            }
          )
        ] }, s)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -20 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "warm-card-shadow-lg border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Create Your Profile" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Choose your role and enter your display name" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "displayName", children: "Display Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "displayName",
                        placeholder: "Enter your name",
                        value: displayName,
                        onChange: (e) => setDisplayName(e.target.value),
                        className: "border-border",
                        "data-ocid": "onboarding.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "I am a..." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setRole(AppRole.student),
                          className: `p-4 rounded-xl border-2 transition-all text-left ${role === AppRole.student ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`,
                          "data-ocid": "onboarding.student.toggle",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-primary mb-2" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm", children: "Student" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Submit doubts & build confidence" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setRole(AppRole.teacher),
                          className: `p-4 rounded-xl border-2 transition-all text-left ${role === AppRole.teacher ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`,
                          "data-ocid": "onboarding.teacher.toggle",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-primary mb-2" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm", children: "Teacher" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Review & answer student doubts" })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold",
                      disabled: submitProfile.isPending || !canProceedStep1,
                      onClick: handleStep1Next,
                      "data-ocid": "onboarding.submit_button",
                      children: submitProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                        "Creating Profile..."
                      ] }) : isStudent ? "Next →" : "Continue to Dashboard"
                    }
                  )
                ] }) })
              ] })
            },
            "step1"
          ),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 20 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "warm-card-shadow-lg border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Your Learning Path" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Tell us your current level so we can personalise your experience" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "What type of student are you?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setUserType("school");
                            setUserBranch("");
                          },
                          className: `p-4 rounded-xl border-2 transition-all text-left ${userType === "school" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`,
                          "data-ocid": "onboarding.school.toggle",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "w-6 h-6 text-primary mb-2" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm", children: "🏫 School Student" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Class 6 – 12" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setUserType("college");
                            setUserClass("");
                          },
                          className: `p-4 rounded-xl border-2 transition-all text-left ${userType === "college" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`,
                          "data-ocid": "onboarding.college.toggle",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-6 h-6 text-primary mb-2" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm", children: "🎓 College Student" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Engineering / Medical / ITI" })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  userType === "school" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 8 },
                      animate: { opacity: 1, y: 0 },
                      className: "space-y-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Select your class" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: userClass, onValueChange: setUserClass, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectTrigger,
                            {
                              className: "border-border",
                              "data-ocid": "onboarding.select",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose class…" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SCHOOL_CLASSES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                        ] })
                      ]
                    }
                  ),
                  userType === "college" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 8 },
                      animate: { opacity: 1, y: 0 },
                      className: "space-y-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Select your branch" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Select,
                          {
                            value: userBranch,
                            onValueChange: setUserBranch,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                SelectTrigger,
                                {
                                  className: "border-border",
                                  "data-ocid": "onboarding.select",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose branch…" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COLLEGE_BRANCH_NAMES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: b }, b)) })
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        className: "flex-1 rounded-full",
                        onClick: () => setStep(1),
                        "data-ocid": "onboarding.cancel_button",
                        children: "← Back"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold",
                        disabled: submitProfile.isPending || !canProceedStep2,
                        onClick: handleFinalSubmit,
                        "data-ocid": "onboarding.submit_button",
                        children: submitProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                          "Creating..."
                        ] }) : "Let's Go! 🚀"
                      }
                    )
                  ] })
                ] }) })
              ] })
            },
            "step2"
          )
        ] })
      ]
    }
  ) });
}
export {
  OnboardingPage as default
};
