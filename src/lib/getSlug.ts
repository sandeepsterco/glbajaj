import { headers } from 'next/headers';

export async function getSlug(segmentIndex = -1): Promise<string> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const parts = pathname.split('/').filter(Boolean);

  // Support negative indexing: -1 = last, -2 = second-to-last
  const index = segmentIndex < 0 ? parts.length + segmentIndex : segmentIndex;
  return parts[index] ?? '';
}