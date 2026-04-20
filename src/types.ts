export interface Teacher {
  id: string;
  name: string;
  photo: string;
  expertise: string[];
  bio: string;
  rating: number;
}

export interface Answer {
  id: string;
  content: string;
  teacher?: Teacher;
  teacherName: string; // fallback
  timestamp: string;
}

export interface Doubt {
  id: string;
  question: string;
  description: string;
  image?: string | null;
  timestamp: string;
  status: 'Pending' | 'Answered';
  answer?: Answer;
}

export interface UserStats {
  confidenceScore: number;
}
