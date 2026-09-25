import { BASE_URL } from "@/src/config/config";

export type ParentMenu = {
  id: number;
  title: string;
  url: string | null;
};

// Joins any number of path segments onto BASE_URL with exactly one "/" between each,
// regardless of whether BASE_URL or the segments already have leading/trailing slashes.
export function joinUrl(...segments: string[]): string {
  const base = BASE_URL?.replace(/\/+$/, "");
  const cleanSegments = segments
    .map((s) => s?.trim().replace(/^\/+|\/+$/g, ""))
    .filter((s) => s && s !== "#");
  return cleanSegments.length ? `${base}/${cleanSegments.join("/")}` : `${base}/`;
}

// A menu url counts as a real page only if it's non-empty and not "/" or "#"
export function isRealMenuUrl(url: string | null): url is string {
  if (!url) return false;
  const trimmed = url.trim().replace(/^\/+|\/+$/g, "");
  return trimmed !== "" && trimmed !== "#";
}

export function getBaseUrl(): string {
  return BASE_URL?.replace(/\/+$/, "") || '/';
}

// Shared breadcrumb builder: Home -> real parents (accumulated) -> current page
export function buildBreadcrumbItems(
  parentMenus: ParentMenu[],
  currentPageSlug: string,
  currentPageName: string
): { name: string; item: string }[] {
  const realParents = parentMenus.filter((menu) => isRealMenuUrl(menu.url));

  const canonicalUrl = joinUrl(...realParents.map((m) => m.url as string), currentPageSlug);

  return [
    { name: "Home", item: joinUrl() },
    ...realParents.map((menu, index) => ({
      name: menu.title,
      item: joinUrl(...realParents.slice(0, index + 1).map((m) => m.url as string)),
    })),
    { name: currentPageName, item: canonicalUrl },
  ];
}

export function buildCanonicalUrl(parentMenus: ParentMenu[], currentPageSlug: string): string {
  const realParents = parentMenus.filter((menu) => isRealMenuUrl(menu.url));
  return joinUrl(...realParents.map((m) => m.url as string), currentPageSlug);
}