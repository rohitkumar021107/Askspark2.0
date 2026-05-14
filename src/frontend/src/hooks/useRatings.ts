import { useTeacherRating } from "../lib/useFirestoreRatings";

const STORAGE_KEY = "askspark_ratings";

type RatingsMap = Record<string, number>;

function getRatingsMap(): RatingsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as RatingsMap;
  } catch {
    return {};
  }
}

export function getRating(doubtId: string): number | null {
  const map = getRatingsMap();
  return map[doubtId] ?? null;
}

export function saveRating(doubtId: string, rating: number): void {
  const map = getRatingsMap();
  map[doubtId] = rating;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getAverageRating(): number {
  const map = getRatingsMap();
  const vals = Object.values(map);
  if (vals.length === 0) return 0;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

export function getRatingsCount(): number {
  return Object.keys(getRatingsMap()).length;
}

/** Firebase-backed average rating for a teacher */
export function useFirebaseRating(teacherName: string) {
  return useTeacherRating(teacherName);
}
