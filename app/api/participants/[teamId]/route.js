import { json } from '@/lib/api';
import { tryMongo, Participant, getDemoStore, clean } from '@/lib/repository';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(_request, { params }) {
  const teamId = (await params).teamId;
  const useMongo = await tryMongo();
  const items = useMongo ? await Participant.find({ teamId }).sort({ name: 1 }).lean() : getDemoStore().participants.filter((item) => item.teamId === teamId);
  if (!items.length) return json({ success: false, error: 'Participant team not found.' }, { status: 404 });
  return json({ success: true, data: clean(items) });
}

export async function PATCH(request, { params }) {
  const blocked = requireAdmin(request);
  if (blocked) return blocked;
  const teamId = (await params).teamId;
  const payload = await request.json();
  const useMongo = await tryMongo();
  if (useMongo) return json({ success: true, data: clean(await Participant.findOneAndUpdate({ teamId }, { $set: payload }, { new: true })) });
  const store = getDemoStore();
  const items = store.participants.filter((item) => item.teamId === teamId);
  items.forEach((item) => Object.assign(item, payload));
  return json({ success: true, data: items });
}

export async function DELETE(request, { params }) {
  const blocked = requireAdmin(request);
  if (blocked) return blocked;
  const teamId = (await params).teamId;
  const useMongo = await tryMongo();
  if (useMongo) {
    await Participant.deleteMany({ teamId });
    return json({ success: true });
  }
  const store = getDemoStore();
  store.participants = store.participants.filter((item) => item.teamId !== teamId);
  return json({ success: true });
}
