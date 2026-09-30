import { json, getPageParams, paginate, matchesSearch } from '@/lib/api';
import { tryMongo, Participant, getDemoStore, clean } from '@/lib/repository';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const teamId = searchParams.get('teamId') || 'All';
  const theme = searchParams.get('theme') || 'All';
  const domain = searchParams.get('domain') || 'All';
  const { page, pageSize } = getPageParams(searchParams);
  const useMongo = await tryMongo();
  let items = useMongo ? await Participant.find().sort({ teamId: 1, name: 1 }).lean() : getDemoStore().participants;
  items = items.filter((item) => matchesSearch(item, search, ['teamId', 'name', 'theme', 'domain']) && (teamId === 'All' || item.teamId === teamId) && (theme === 'All' || item.theme === theme) && (domain === 'All' || item.domain === domain));
  const result = paginate(clean(items), page, pageSize);
  return json({ success: true, data: result.items, pagination: result.pagination, source: useMongo ? 'mongodb' : 'demo' });
}

export async function POST(request) {
  const blocked = requireAdmin(request);
  if (blocked) return blocked;
  const payload = await request.json();
  if (!payload.teamId || !payload.name || !payload.theme || !payload.domain) return json({ success: false, error: 'Team ID, name, theme and domain are required.' }, { status: 400 });
  const useMongo = await tryMongo();
  if (useMongo) return json({ success: true, data: clean(await Participant.create(payload)) }, { status: 201 });
  const store = getDemoStore();
  const item = { teamId: payload.teamId, name: payload.name, theme: payload.theme, domain: payload.domain };
  store.participants.push(item);
  return json({ success: true, data: item }, { status: 201 });
}
