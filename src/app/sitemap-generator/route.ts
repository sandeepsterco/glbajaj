import { load } from "cheerio";
import { getSitemapEntries } from "../sitemap";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_PAGES = 1000;
const MAX_DEPTH = 12;
const CONCURRENCY = 8;
const REQUEST_TIMEOUT_MS = 5000;
const MAX_CRAWL_TIME_MS = 50_000;

interface CrawlTarget {
  url: string;
  depth: number;
}

interface CrawledPage {
  url: string;
  lastModified: Date;
}

function normalizeTarget(href: string, origin: string): string | null {
  try {
    const url = new URL(href, origin);
    if (url.origin !== origin || !["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    if (
      url.pathname.startsWith("/_next/") ||
      url.pathname.startsWith("/api/") ||
      url.pathname === "/sitemap-generator" ||
      url.pathname === "/sitemap.xml" ||
      /\.(?:avif|css|gif|ico|jpe?g|js|json|pdf|png|svg|webp|woff2?)$/i.test(url.pathname)
    ) {
      return null;
    }

    url.hash = "";
    const page = url.searchParams.get("page");
    url.search = "";
    if (page && /^\d+$/.test(page) && Number(page) > 1 && Number(page) <= 100) {
      url.searchParams.set("page", page);
    }

    if (url.pathname.length > 1) {
      url.pathname = url.pathname.replace(/\/+$/, "");
    }

    return url.href;
  } catch {
    return null;
  }
}

function sitemapUrl(crawlUrl: string): string {
  const url = new URL(crawlUrl);
  url.search = "";
  return url.href;
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: { Accept: "text/html" },
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
      return null;
    }

    return await response.text();
  } catch {
    return null;
  }
}

async function crawlSite(origin: string): Promise<CrawledPage[]> {
  const discoveredAt = new Date();
  const pages = new Map<string, Date>();
  const queued = new Set<string>();
  const queue: CrawlTarget[] = [];
  const sitemapEntries = await getSitemapEntries(origin);

  const enqueue = (href: string, depth: number) => {
    if (depth > MAX_DEPTH || queued.size >= MAX_PAGES) return;
    const target = normalizeTarget(href, origin);
    if (!target || queued.has(target)) return;
    queued.add(target);
    queue.push({ url: target, depth });
  };

  enqueue(origin, 0);
  for (const entry of sitemapEntries) enqueue(entry.url, 0);

  const startedAt = Date.now();
  while (
    queue.length > 0 &&
    queued.size <= MAX_PAGES &&
    Date.now() - startedAt < MAX_CRAWL_TIME_MS
  ) {
    const batch = queue.splice(0, CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (target) => ({
        target,
        html: await fetchPage(target.url),
      }))
    );

    for (const { target, html } of results) {
      if (!html) continue;

      const canonical = sitemapUrl(target.url);
      if (!pages.has(canonical)) pages.set(canonical, discoveredAt);

      const $ = load(html);
      $("a[href]").each((_, anchor) => {
        const href = $(anchor).attr("href");
        if (href) enqueue(href, target.depth + 1);
      });
    }
  }

  return [...pages].map(([url, lastModified]) => ({ url, lastModified }));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: Request): Promise<Response> {
  const origin = new URL(request.url).origin;
  const pages = await crawlSite(origin);
  const urls = pages
    .map(({ url, lastModified }) =>
      `<url><loc>${escapeXml(url)}</loc><lastmod>${lastModified.toISOString()}</lastmod></url>`
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}