import { json } from '@/lib/api';
import { tryMongo, Leaderboard, getDemoStore, clean } from '@/lib/repository';
import { requireAdmin } from '@/lib/adminAuth';

export async function PATCH(request, { params }) {
  const blocked = requireAdmin(request);
  if (blocked) return blocked;
  const teamId = (await params).teamId;
  const payload = await request.json();
  const score = Math.max(0, Number(payload.score ?? 0));
  const useMongo = await tryMongo();
  if (useMongo) return json({ success: true, data: clean(await Leaderboard.findOneAndUpdate({ teamId }, { $set: { score, updatedAt: new Date(), ...(payload.status ? { status: payload.status } : {}) } }, { new: true })) });
  const item = getDemoStore().leaderboard.find((entry) => entry.teamId === teamId);
  if (!item) return json({ success: false, error: 'Team not found.' }, { status: 404 });
  Object.assign(item, { score, updatedAt: new Date().toISOString(), ...(payload.status ? { status: payload.status } : {}) });
  return json({ success: true, data: item });
}
