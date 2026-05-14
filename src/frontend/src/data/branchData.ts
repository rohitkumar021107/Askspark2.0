export type UserType = "school" | "college";
export const FULL_CLASS_LIST: string[] = [
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "Inter 1st Year",
  "Inter 2nd Year",
  "Diploma",
  "BTech CSE",
  "BTech EEE",
  "BTech ECE",
  "BCom",
  "Degree",
  "Other",
];

export const SCHOOL_CLASSES = [
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
];

export const SCHOOL_SUBJECTS = [
  "Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Studies",
];

export const COLLEGE_BRANCHES: Record<string, string[]> = {
  CSE: [
    "Data Structures",
    "Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "Maths",
    "OOP",
  ],
  EEE: [
    "Circuits",
    "Electrical Machines",
    "Power Systems",
    "Control Systems",
    "Maths",
    "Electronics",
  ],
  ECE: [
    "Electronics",
    "Signals & Systems",
    "Communication Systems",
    "VLSI",
    "Maths",
    "Microprocessors",
  ],
  Mechanical: [
    "Thermodynamics",
    "Mechanics",
    "Manufacturing",
    "Fluid Mechanics",
    "Maths",
    "Materials Science",
  ],
  IT: [
    "Web Technologies",
    "Data Structures",
    "Cloud Computing",
    "Networking",
    "Maths",
    "Cybersecurity",
  ],
  CSD: [
    "UI/UX Design",
    "Data Structures",
    "Algorithms",
    "Machine Learning",
    "Maths",
    "Design Thinking",
  ],
  Polytechnic: [
    "Maths",
    "Physics",
    "Chemistry",
    "Workshop Practice",
    "Engineering Drawing",
    "Electrical Basics",
  ],
  ITI: [
    "Trade Theory",
    "Workshop Calculation",
    "Engineering Drawing",
    "Social Studies",
    "Science",
    "Employability Skills",
  ],
  Medical: [
    "Anatomy",
    "Physiology",
    "Biochemistry",
    "Pharmacology",
    "Pathology",
    "Microbiology",
  ],
};

export const COLLEGE_BRANCH_NAMES = Object.keys(COLLEGE_BRANCHES);

/** Read user profile from localStorage */
export function readUserProfile(): {
  userType: UserType | null;
  userClass: string | null;
  userBranch: string | null;
} {
  return {
    userType: (localStorage.getItem("userType") as UserType | null) ?? null,
    userClass: localStorage.getItem("userClass"),
    userBranch: localStorage.getItem("userBranch"),
  };
}

/** Get subjects for current user profile */
export function getSubjectsForProfile(
  userType: UserType | null,
  _userClass: string | null,
  userBranch: string | null,
): string[] {
  if (userType === "school") return SCHOOL_SUBJECTS;
  if (userType === "college" && userBranch && COLLEGE_BRANCHES[userBranch]) {
    return COLLEGE_BRANCHES[userBranch];
  }
  // fallback — all unique subjects
  return [
    ...SCHOOL_SUBJECTS,
    ...Object.values(COLLEGE_BRANCHES)
      .flat()
      .filter((v, i, a) => a.indexOf(v) === i),
  ];
}

/** Human-readable label for the user's context */
export function getUserContextLabel(
  userType: UserType | null,
  _userClass: string | null,
  userBranch: string | null,
): string | null {
  if (userType === "school" && _userClass) return `🏫 ${_userClass}`;
  if (userType === "college" && userBranch) return `🎓 ${userBranch} Branch`;
  return null;
}
