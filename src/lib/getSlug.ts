export function parseSlugFromPath(pathname: string, segmentIndex = -1): string {
  const parts = pathname.split('/').filter(Boolean);
  const index = segmentIndex < 0 ? parts.length + segmentIndex : segmentIndex;
  return parts[index] ?? '';
}