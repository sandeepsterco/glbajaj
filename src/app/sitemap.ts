import type { MetadataRoute } from "next";
import { BASE_URL } from "../config/config";
import { apiFetch } from "../lib/api";

const SITE_URL = (BASE_URL || "https://glbitm-development.vercel.app").replace(/\/$/, "");

interface SitemapItem {
  url: string;
  lastModified?: Date;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
}

function createUrl(path: string, siteUrl: string): string {
  const normalizedPath = path.replace(/^\/+/, "");
  return normalizedPath ? `${siteUrl}/${normalizedPath}` : `${siteUrl}/`;
}

function createSitemapItem(
  path: string,
  siteUrl: string,
  priority = 0.7
): SitemapItem {
  return {
    url: createUrl(path, siteUrl),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  };
}

type ApiRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ApiRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getProperty(value: unknown, key: string): unknown {
  return isRecord(value) ? value[key] : undefined;
}

function getRecords(value: unknown): ApiRecord[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  const records = getProperty(value, "data");
  if (Array.isArray(records)) return records.filter(isRecord);
  return [];
}

function getLastPage(value: unknown): number {
  const meta = getProperty(value, "meta");
  const lastPage = Number(
    getProperty(value, "last_page") ?? getProperty(meta, "last_page") ?? 1
  );
  return Number.isFinite(lastPage) && lastPage > 0 ? lastPage : 1;
}

async function fetchAllPages(endpoint: string, collectionKey: string): Promise<ApiRecord[]> {
  const firstResult = await apiFetch(`${endpoint}?page=1`, { cache: "no-store" });
  const collection = getProperty(firstResult.data, collectionKey);
  if (firstResult.error || !collection) return [];

  const pages = await Promise.all(
    Array.from({ length: getLastPage(collection) - 1 }, (_, index) => index + 2).map(
      (page) => apiFetch(`${endpoint}?page=${page}`, { cache: "no-store" })
    )
  );

  return [collection, ...pages.map((result) => getProperty(result.data, collectionKey))]
    .flatMap(getRecords);
}

async function fetchPrograms(): Promise<ApiRecord[]> {
  const { data, error } = await apiFetch("programs", { cache: "no-store" });
  if (error) return [];

  return getRecords(getProperty(data, "programs")).flatMap((group) =>
    getRecords(getProperty(group, "programs"))
  );
}

function getSlug(record: ApiRecord): string | null {
  const slug = record.slug;
  return typeof slug === "string" && slug ? slug : null;
}

export async function getSitemapEntries(
  siteUrl = SITE_URL
): Promise<MetadataRoute.Sitemap> {
  const fixedPaths = [
    "",
    "admissions/overview",
    "admissions/faqs",
    "alumni/overview",
    "alumni/achievements",
    "alumni/events",
    "alumni/testimonials",
    "blogs",
    "facilities/faqs",
    "faqs",
    "happenings/archives",
    "placements",
    "placements/overview",
    "placements/faqs",
    "placements/testimonials",
    "research-innovation/overview",
    "research-innovation/faqs",
    "student-corner/overview",
    "why-glbitm/achievements",
    "why-glbitm/testimonials",
    "academics/programs",
  ];

  const [blogs, programs] = await Promise.all([
    fetchAllPages("blogs", "blogs"),
    fetchPrograms(),
  ]);

  const paths = [
    ...fixedPaths.map((path) => ({ path, priority: path ? 0.7 : 1 })),
    ...blogs
      .map((blog) => getSlug(blog))
      .filter((slug): slug is string => slug !== null)
      .map((slug) => ({ path: `blogs/${slug}`, priority: 0.6 })),
    ...programs
      .map((program) => getSlug(program))
      .filter((slug): slug is string => slug !== null)
      .map((slug) => ({ path: `program/${slug}`, priority: 0.7 })),
  ];

  const uniquePaths = new Map<string, number>(
    paths.map(({ path, priority }) => [path, priority])
  );

  return [...uniquePaths].map(([path, priority]) =>
    createSitemapItem(path, siteUrl, priority)
  );
}

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemapEntries();
}