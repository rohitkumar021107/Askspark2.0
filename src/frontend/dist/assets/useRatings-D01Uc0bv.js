import { u as useTeacherRating } from "./useFirestoreRatings-DaeseLrE.js";
const STORAGE_KEY = "askspark_ratings";
function getRatingsMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
function getAverageRating() {
  const map = getRatingsMap();
  const vals = Object.values(map);
  if (vals.length === 0) return 0;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}
function getRatingsCount() {
  return Object.keys(getRatingsMap()).length;
}
function useFirebaseRating(teacherName) {
  return useTeacherRating(teacherName);
}
export {
  getAverageRating as a,
  getRatingsCount as g,
  useFirebaseRating as u
};
