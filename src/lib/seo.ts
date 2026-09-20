import { SEO_URL } from "@/src/config/config";
import { cache } from "react";

// ✅ Explicit type — TypeScript knows schema is always present (or null)
type SEOResult = {
  title: string;
  description: string;
  keywords: string;
  alternates: { canonical: string };
  openGraph?: {
    title: string;
    description: string;
    type: string;
    images: any[];
    url: string;
  };
  schema: Record<string, any> | null;
};

function defaultSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Article Title",
    description: "Article Description",
    image: "https://yoursite.com/image.jpg",
    datePublished: "2024-01-01",
    author: { "@type": "Person", name: "GL Bajaj" },
  };
}

function defaultSEO(): SEOResult {
  return {
    title: "GL Bajaj",
    description: "GL Bajaj",
    keywords: "GL Bajaj",
    alternates: { canonical: "/" },
    schema: null, // ✅ always present — no more union type mismatch
  };
}

async function fetchPageSEO(slug: string): Promise<SEOResult> {
  try {
    if (!slug) return defaultSEO();

    const encodedSlug = slug
      .split("/")
      .map(encodeURIComponent)
      .join("/");

    const res = await fetch(`${SEO_URL}seo/${encodedSlug}`, {
      cache: "force-cache",
      next: { revalidate: 360 },
    });

    if (!res.ok) throw new Error("SEO data not found");

    const data = await res.json();

    return {
      title: data.data.title,
      description: data.data.description,
      keywords: data.data.keywords?.length > 0 ? data.data.keywords : "GL Bajaj",
      alternates: {
        canonical: data.data.alternates?.canonical || slug,
      },
      openGraph: {
        title: data.data.openGraph?.title || data.data.title,
        description: data.data.openGraph?.description || data.data.description,
        type: data.data.openGraph?.type || "website",
        images: data.data.openGraph?.images || [],
        url: data.data.openGraph?.url || data.data.alternates?.canonical || slug,
      },
      schema: data.data.schema || defaultSchema(),
    };
  } catch {
    return defaultSEO();
  }
}

export const getPageSEO = cache(fetchPageSEO);
