import { connectMongo, hasMongo } from './mongodb';
import Participant from '@/models/Participant';
import ProblemStatement from '@/models/ProblemStatement';
import Allocation from '@/models/Allocation';
import Leaderboard from '@/models/Leaderboard';
import { getDemoStore } from './demoData';

export function clean(value) {
  if (value === null || value === undefined) return value;
  if (typeof value?.toObject === 'function') return clean(value.toObject());
  if (Array.isArray(value)) return value.map(clean);
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([key]) => key !== '__v').map(([key, item]) => [key, clean(item)]));
  return value;
}

export async function tryMongo() {
  if (!hasMongo()) return false;
  try {
    await connectMongo();
    return true;
  } catch (error) {
    console.warn('[techseva] MongoDB unavailable; using demo store:', error.message);
    return false;
  }
}

export { Participant, ProblemStatement, Allocation, Leaderboard, getDemoStore };
