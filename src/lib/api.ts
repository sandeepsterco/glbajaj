import { API_URL, REVALIDATE } from "../config/config";

type ApiFetchOptions = Omit<RequestInit, 'cache'> & {
  revalidate?: number;
  cache?: 'no-store' | 'force-cache' | 'default';
};

const DEFAULT_REVALIDATE = Number(REVALIDATE ?? 120);

export async function apiFetch(endpoint: string, options?: ApiFetchOptions) {
    try {
      const { revalidate = DEFAULT_REVALIDATE, cache, ...restOptions } = options ?? {};
  
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...restOptions,
        ...(cache === 'no-store'
          ? { cache: 'no-store' as const }
          : { next: { revalidate } }),
      });
  
      if (!response.ok) {
        return { data: null, error: `Request failed with status ${response.status}` };
      }
  
      const data = await response.json();
      return { data, error: null };
  
    } catch (err) {
      return { data: null, error: (err as Error).message ?? 'Unknown error' };
    }
  }