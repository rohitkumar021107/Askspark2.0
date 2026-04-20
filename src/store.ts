import { Doubt, UserStats } from './types';

const DOUBTS_KEY = 'askspark_doubts';
const STATS_KEY = 'askspark_stats';

export const getDoubts = (): Doubt[] => {
  const data = localStorage.getItem(DOUBTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveDoubt = (doubt: Doubt) => {
  const doubts = getDoubts();
  doubts.unshift(doubt);
  localStorage.setItem(DOUBTS_KEY, JSON.stringify(doubts));
  
  // Update stats: +10 for asking a doubt
  const stats = getStats();
  stats.confidenceScore += 10;
  saveStats(stats);
};

export const updateDoubt = (updatedDoubt: Doubt) => {
  const doubts = getDoubts();
  const index = doubts.findIndex(d => d.id === updatedDoubt.id);
  if (index !== -1) {
    doubts[index] = updatedDoubt;
    localStorage.setItem(DOUBTS_KEY, JSON.stringify(doubts));
  }
};

export const getStats = (): UserStats => {
  const data = localStorage.getItem(STATS_KEY);
  return data ? JSON.parse(data) : { confidenceScore: 0 };
};

export const saveStats = (stats: UserStats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const incrementViewScore = () => {
  const stats = getStats();
  stats.confidenceScore += 5;
  saveStats(stats);
};
