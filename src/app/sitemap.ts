import type { MetadataRoute } from "next";
import { BASE_URL } from "../config/config";
import { apiFetch } from "../lib/api";

const SITE_URL = BASE_URL?.replace(/\/$/, "");

interface SitemapItem {
  url: string;
  lastModified?: Date;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
}

function createUrl(path: string): string {
  return `${SITE_URL}/${path.replace(/^\/+/, "")}`;
}

function createSitemapItem(
  path: string,
  priority = 0.7
): SitemapItem {
  return {
    url: createUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: SitemapItem[] = [
    createSitemapItem("", 1),
    createSitemapItem("blogs", 0.8),
    createSitemapItem("programs-offered", 0.8),
    createSitemapItem("leading-recruiters", 0.7),
  ];

  // Fetch dynamic URLs here
  const dynamicPages: SitemapItem[] = [];

  return [...staticPages, ...dynamicPages];
}