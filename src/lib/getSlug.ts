import { headers } from 'next/headers';

export async function getSlug(): Promise<string> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const slug = pathname.split('/').filter(Boolean).pop() ?? '';
  return slug;
}