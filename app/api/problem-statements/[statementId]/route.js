import { json } from '@/lib/api';
import { tryMongo, ProblemStatement, getDemoStore, clean } from '@/lib/repository';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(_request, { params }) {
  const statementId = (await params).statementId;
  const useMongo = await tryMongo();
  const item = useMongo ? await ProblemStatement.findOne({ statementId }).lean() : getDemoStore().problemStatements.find((entry) => entry.statementId === statementId);
  if (!item) return json({ success: false, error: 'Problem statement not found.' }, { status: 404 });
  return json({ success: true, data: clean(item) });
}

export async function PATCH(request, { params }) {
  const blocked = requireAdmin(request);
  if (blocked) return blocked;
  const statementId = (await params).statementId;
  const payload = await request.json();
  if (payload.slot !== undefined) payload.slot = Math.max(0, Number(payload.slot));
  const useMongo = await tryMongo();
  if (useMongo) return json({ success: true, data: clean(await ProblemStatement.findOneAndUpdate({ statementId }, { $set: payload }, { new: true })) });
  const item = getDemoStore().problemStatements.find((entry) => entry.statementId === statementId);
  if (!item) return json({ success: false, error: 'Problem statement not found.' }, { status: 404 });
  Object.assign(item, payload);
  return json({ success: true, data: item });
}

export async function DELETE(request, { params }) {
  const blocked = requireAdmin(request);
  if (blocked) return blocked;
  const statementId = (await params).statementId;
  const useMongo = await tryMongo();
  if (useMongo) await ProblemStatement.deleteOne({ statementId });
  else {
    const store = getDemoStore();
    store.problemStatements = store.problemStatements.filter((entry) => entry.statementId !== statementId);
  }
  return json({ success: true });
}
