import { json } from '@/lib/api';
import { tryMongo, Participant, ProblemStatement, Allocation, getDemoStore, clean } from '@/lib/repository';

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export async function POST(request) {
  try {
    const { teamId } = await request.json();
    if (!teamId) return json({ success: false, error: 'Please select a participant first.' }, { status: 400 });
    const useMongo = await tryMongo();
    if (!useMongo) {
      const store = getDemoStore();
      const participant = store.participants.find((item) => item.teamId === teamId);
      if (!participant) return json({ success: false, error: 'Participant team not found.' }, { status: 404 });
      const existing = store.allocations.find((item) => item.teamId === teamId);
      if (existing) return json({ success: true, existing: true, allocation: existing });
      const eligible = store.problemStatements.filter((item) => item.theme === participant.theme && item.hardwareSoftware === participant.domain && item.slot > 0);
      if (!eligible.length) return json({ success: false, error: 'No problem statements are currently available for this theme and category.' }, { status: 409 });
      const selected = pickRandom(eligible);
      selected.slot = Math.max(0, selected.slot - 1);
      const allocation = { teamId, participantId: teamId, participantName: participant.name, theme: participant.theme, domain: participant.domain, problemStatementId: selected.statementId, problemStatement: selected.problemStatement, support: selected.support, allocatedAt: new Date().toISOString(), status: 'ALLOCATED' };
      store.allocations.push(allocation);
      return json({ success: true, allocation, problem: selected });
    }

    const participant = await Participant.findOne({ teamId }).lean();
    if (!participant) return json({ success: false, error: 'Participant team not found.' }, { status: 404 });
    const existing = await Allocation.findOne({ teamId }).lean();
    if (existing) return json({ success: true, existing: true, allocation: clean(existing) });
    const prior = await Allocation.find({ teamId }).select('problemStatementId').lean();
    const excluded = prior.map((item) => item.problemStatementId);
    const candidates = await ProblemStatement.find({ theme: participant.theme, hardwareSoftware: participant.domain, slot: { $gt: 0 }, statementId: { $nin: excluded } }).lean();
    if (!candidates.length) return json({ success: false, error: 'No problem statements are currently available for this theme and category.' }, { status: 409 });
    for (const candidate of candidates.sort(() => Math.random() - 0.5)) {
      const claimed = await ProblemStatement.findOneAndUpdate({ _id: candidate._id, slot: { $gt: 0 } }, { $inc: { slot: -1 } }, { new: true }).lean();
      if (!claimed) continue;
      const allocationPayload = { teamId, participantId: teamId, participantName: participant.name, theme: participant.theme, domain: participant.domain, problemStatementId: claimed.statementId, problemStatement: claimed.problemStatement, support: claimed.support, allocatedAt: new Date(), status: 'ALLOCATED' };
      try {
        const allocation = await Allocation.create(allocationPayload);
        return json({ success: true, allocation: clean(allocation), problem: clean(claimed) });
      } catch (error) {
        await ProblemStatement.updateOne({ _id: claimed._id }, { $inc: { slot: 1 } });
        if (error.code === 11000) {
          const winner = await Allocation.findOne({ teamId }).lean();
          if (winner) return json({ success: true, existing: true, allocation: clean(winner) });
        }
      }
    }
    return json({ success: false, error: 'That last slot was just taken. Please try again.' }, { status: 409 });
  } catch (error) {
    console.error('[techseva] spin failed', error);
    return json({ success: false, error: 'Unable to connect to the allocation server. Please try again.' }, { status: 500 });
  }
}
