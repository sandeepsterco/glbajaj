import { BACKEND_SITEMAP_URL } from "@/src/config/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(): Promise<Response> {
  try {
    if (!BACKEND_SITEMAP_URL) {
      return new Response("Unable to fetch sitemap", { status: 502 });
    }

    const response = await fetch(BACKEND_SITEMAP_URL, {
      cache: "no-store",
    });

    if (!response.ok || !response.body) {
      return new Response("Unable to fetch sitemap", { status: 502 });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return new Response("Unable to fetch sitemap", { status: 502 });
  }
}
