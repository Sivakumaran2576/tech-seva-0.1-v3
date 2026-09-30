import { json } from '@/lib/api';
import { isAdmin } from '@/lib/adminAuth';

export async function GET(request) {
  if (!isAdmin(request)) return json({ success: false, error: 'Admin authentication required.' }, { status: 401 });
  return json({ success: true, message: 'Admin key verified.' });
}
