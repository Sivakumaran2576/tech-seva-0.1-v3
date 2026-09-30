export function json(data, init = {}) {
  return Response.json(data, { headers: { 'cache-control': 'no-store', ...init.headers }, ...init });
}

export function getPageParams(searchParams) {
  const page = Math.max(1, Number(searchParams.get('page') || 1));
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get('pageSize') || 12)));
  return { page, pageSize };
}

export function paginate(items, page, pageSize) {
  const total = items.length;
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), pagination: { page, pageSize, total, pages: Math.max(1, Math.ceil(total / pageSize)) } };
}

export function matchesSearch(item, search, keys) {
  if (!search) return true;
  const q = search.toLowerCase();
  return keys.some((key) => String(item[key] ?? '').toLowerCase().includes(q)) || (Array.isArray(item.support) && item.support.some((part) => part.toLowerCase().includes(q)));
}
