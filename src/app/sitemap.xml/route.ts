const BACKEND_SITEMAP_URL =
  "https://glbitm.project-demo.in/assets/sitemap/sitemap.xml";

export const revalidate = 100;

export async function GET(): Promise<Response> {
  try {
    const response = await fetch(BACKEND_SITEMAP_URL, {
      next: { revalidate },
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