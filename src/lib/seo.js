import { SEO_URL } from "@/src/config/config";
import { headers } from "next/headers";

export async function getPageSEO(slug) {
  try {
    // If no slug passed, auto-detect full URL from request headers
    if (!slug) {
      const headersList = await headers();
      const host = headersList.get("host");
      const protocol = "https";
      const pathname =
        headersList.get("x-invoke-path") ||
        headersList.get("x-pathname") ||
        "/";
      // slug = `${protocol}://${host}${pathname}`;
      slug = `${SEO_URL}${pathname}`;
    }

    const res = await fetch(`${SEO_URL}seo/${encodeURIComponent(slug)}`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("SEO data not found");

    const data = await res.json();

    return {
      title: data.data.title,
      description: data.data.description,
      keywords: data.data.keywords.length > 0 ? data.data.keywords : "GL Bajaj",
      alternates: {
        canonical: data.data.alternates?.canonical || slug,
      },
      openGraph: {
        title: data.data.openGraph?.title || data.data.title,
        description: data.data.openGraph?.description || data.data.description,
        images: data.data.openGraph?.images || [],
      },
      schema: data.data.schema || {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Article Title",
        description: "Article Description",
        image: "https://yoursite.com/image.jpg",
        datePublished: "2024-01-01",
        author: {
          "@type": "Person",
          name: "GL Bajaj",
        },
      },
    };
  } catch (error) {
    return {
      title: "GL Bajaj",
      description: "GL Bajaj",
      keywords: "GL Bajaj",
      alternates: {
        canonical: "/",
      },
    };
  }
}
