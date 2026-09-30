import { json, getPageParams, paginate, matchesSearch } from '@/lib/api';
import { tryMongo, ProblemStatement, getDemoStore, clean } from '@/lib/repository';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const theme = searchParams.get('theme') || 'All';
  const domain = searchParams.get('domain') || 'All';
  const availability = searchParams.get('availability') || 'All';
  const { page, pageSize } = getPageParams(searchParams);
  const useMongo = await tryMongo();
  let items = useMongo ? await ProblemStatement.find().sort({ statementId: 1 }).lean() : getDemoStore().problemStatements;
  items = items.filter((item) => matchesSearch(item, search, ['statementId', 'problemStatement', 'theme']) && (theme === 'All' || item.theme === theme) && (domain === 'All' || item.hardwareSoftware === domain) && (availability === 'All' || (availability === 'Available' ? item.slot > 0 : item.slot === 0)));
  const result = paginate(clean(items), page, pageSize);
  return json({ success: true, data: result.items, pagination: result.pagination, source: useMongo ? 'mongodb' : 'demo' });
}

export async function POST(request) {
  const blocked = requireAdmin(request);
  if (blocked) return blocked;
  const payload = await request.json();
  if (!payload.statementId || !payload.theme || !payload.problemStatement || !payload.hardwareSoftware) return json({ success: false, error: 'Statement ID, theme, problem statement and domain are required.' }, { status: 400 });
  const useMongo = await tryMongo();
  if (useMongo) return json({ success: true, data: clean(await ProblemStatement.create({ ...payload, slot: Math.max(0, Number(payload.slot || 0)), support: payload.support || [] })) }, { status: 201 });
  const store = getDemoStore();
  const item = { ...payload, slot: Math.max(0, Number(payload.slot || 0)), support: payload.support || [] };
  store.problemStatements.push(item);
  return json({ success: true, data: item }, { status: 201 });
}
