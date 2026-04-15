import { API_URL } from "../config/config";

export async function apiFetch(
  endpoint: string,
  options?: RequestInit & { revalidate?: number; timeoutMs?: number },
) {
  const { revalidate = 3600, timeoutMs = 10_000, ...restOptions } = options ?? {};

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...restOptions,
      signal: restOptions.signal ?? controller.signal,
      next: {
        revalidate,
      },
    });

    if (!response.ok) {
      return {
        data: null,
        error: `Request failed with status ${response.status}`,
      };
    }

    const data = await response.json();

    return {
      data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: (err as Error).message ?? "Unknown error",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}