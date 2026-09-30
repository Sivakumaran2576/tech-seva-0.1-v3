import { json } from '@/lib/api';
import { tryMongo, Allocation, ProblemStatement, getDemoStore, clean } from '@/lib/repository';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(_request, { params }) {
  const teamId = (await params).teamId;
  const useMongo = await tryMongo();
  const item = useMongo ? await Allocation.findOne({ teamId }).lean() : getDemoStore().allocations.find((entry) => entry.teamId === teamId);
  return json({ success: true, data: clean(item || null) });
}

export async function PATCH(request, { params }) {
  const blocked = requireAdmin(request);
  if (blocked) return blocked;
  const teamId = (await params).teamId;
  const useMongo = await tryMongo();
  if (useMongo) {
    const allocation = await Allocation.findOne({ teamId });
    if (allocation) {
      await ProblemStatement.updateOne({ statementId: allocation.problemStatementId }, { $inc: { slot: 1 } });
      await Allocation.deleteOne({ teamId });
    }
  } else {
    const store = getDemoStore();
    const index = store.allocations.findIndex((entry) => entry.teamId === teamId);
    if (index >= 0) {
      const allocation = store.allocations[index];
      const problem = store.problemStatements.find((entry) => entry.statementId === allocation.problemStatementId);
      if (problem) problem.slot += 1;
      store.allocations.splice(index, 1);
    }
  }
  return json({ success: true });
}
