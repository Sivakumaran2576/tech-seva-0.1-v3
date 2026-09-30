export const DEMO_ADMIN_KEY = 'techseva-admin';

export function getExpectedAdminKey() {
  return process.env.ADMIN_KEY || DEMO_ADMIN_KEY;
}

export function isAdmin(request) {
  const key = request.headers.get('x-admin-key');
  return Boolean(key && key === getExpectedAdminKey());
}

export function requireAdmin(request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ success: false, error: 'Admin authentication required.' }), {
      status: 401,
      headers: { 'content-type': 'application/json' }
    });
  }
  return null;
}
