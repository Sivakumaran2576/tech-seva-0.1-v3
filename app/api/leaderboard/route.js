import { json, matchesSearch } from '@/lib/api';
import { tryMongo, Leaderboard, getDemoStore, clean } from '@/lib/repository';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const theme = searchParams.get('theme') || 'All';
  const domain = searchParams.get('domain') || 'All';
  const sort = searchParams.get('sort') || 'score';
  const useMongo = await tryMongo();
  let items = useMongo ? await Leaderboard.find().lean() : getDemoStore().leaderboard;
  items = items.filter((item) => matchesSearch(item, search, ['teamId', 'teamName', 'problemStatement', 'theme']) && (theme === 'All' || item.theme === theme) && (domain === 'All' || item.domain === domain));
  items.sort((a, b) => sort === 'team' ? String(a.teamId).localeCompare(String(b.teamId)) : Number(b.score) - Number(a.score));
  const ranked = items.map((item, index) => ({ ...clean(item), rank: index + 1 }));
  return json({ success: true, data: ranked, source: useMongo ? 'mongodb' : 'demo' });
}

export async function POST(request) {
  const blocked = requireAdmin(request);
  if (blocked) return blocked;
  const payload = await request.json();
  if (!payload.teamId || !payload.teamName) return json({ success: false, error: 'Team ID and team name are required.' }, { status: 400 });
  const useMongo = await tryMongo();
  if (useMongo) return json({ success: true, data: clean(await Leaderboard.findOneAndUpdate({ teamId: payload.teamId }, { $set: { ...payload, updatedAt: new Date() } }, { new: true, upsert: true })) });
  const store = getDemoStore();
  const current = store.leaderboard.find((entry) => entry.teamId === payload.teamId);
  if (current) Object.assign(current, payload, { updatedAt: new Date().toISOString() });
  else store.leaderboard.push({ ...payload, updatedAt: new Date().toISOString() });
  return json({ success: true, data: current || store.leaderboard.at(-1) });
}
