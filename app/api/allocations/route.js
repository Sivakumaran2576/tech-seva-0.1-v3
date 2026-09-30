import { json } from '@/lib/api';
import { tryMongo, Allocation, getDemoStore, clean } from '@/lib/repository';

export async function GET() {
  const useMongo = await tryMongo();
  const items = useMongo ? await Allocation.find().sort({ allocatedAt: -1 }).lean() : getDemoStore().allocations;
  return json({ success: true, data: clean(items), source: useMongo ? 'mongodb' : 'demo' });
}
