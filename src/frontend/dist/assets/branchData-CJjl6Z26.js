const FULL_CLASS_LIST = [
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
  "Other"
];
const SCHOOL_CLASSES = [
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th"
];
const SCHOOL_SUBJECTS = [
  "Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Studies"
];
const COLLEGE_BRANCHES = {
  CSE: [
    "Data Structures",
    "Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "Maths",
    "OOP"
  ],
  EEE: [
    "Circuits",
    "Electrical Machines",
    "Power Systems",
    "Control Systems",
    "Maths",
    "Electronics"
  ],
  ECE: [
    "Electronics",
    "Signals & Systems",
    "Communication Systems",
    "VLSI",
    "Maths",
    "Microprocessors"
  ],
  Mechanical: [
    "Thermodynamics",
    "Mechanics",
    "Manufacturing",
    "Fluid Mechanics",
    "Maths",
    "Materials Science"
  ],
  IT: [
    "Web Technologies",
    "Data Structures",
    "Cloud Computing",
    "Networking",
    "Maths",
    "Cybersecurity"
  ],
  CSD: [
    "UI/UX Design",
    "Data Structures",
    "Algorithms",
    "Machine Learning",
    "Maths",
    "Design Thinking"
  ],
  Polytechnic: [
    "Maths",
    "Physics",
    "Chemistry",
    "Workshop Practice",
    "Engineering Drawing",
    "Electrical Basics"
  ],
  ITI: [
    "Trade Theory",
    "Workshop Calculation",
    "Engineering Drawing",
    "Social Studies",
    "Science",
    "Employability Skills"
  ],
  Medical: [
    "Anatomy",
    "Physiology",
    "Biochemistry",
    "Pharmacology",
    "Pathology",
    "Microbiology"
  ]
};
const COLLEGE_BRANCH_NAMES = Object.keys(COLLEGE_BRANCHES);
function readUserProfile() {
  return {
    userType: localStorage.getItem("userType") ?? null,
    userClass: localStorage.getItem("userClass"),
    userBranch: localStorage.getItem("userBranch")
  };
}
export {
  COLLEGE_BRANCH_NAMES as C,
  FULL_CLASS_LIST as F,
  SCHOOL_CLASSES as S,
  SCHOOL_SUBJECTS as a,
  COLLEGE_BRANCHES as b,
  readUserProfile as r
};
