import { BASE_URL } from "@/src/config/config";

export type ParentMenu = {
  id?: number;
  title: string;
  url: string | null;
};

export type GlobalSchemaArgs = {
  pageTitle: string;
  metaDescription: string;
  primaryImageUrl: string;
  datePublishedIso?: string;
  dateModifiedIso?: string;
  languageTag: string;

  // Straight from the API
  parentMenus?: ParentMenu[]; // data.parent_menus
  currentPageSlug: string; // data.current_page_slug (top-level, NOT inside parent_menus)
  currentPageName: string; // data.menu_title ?? data.page_title
  canonicalUrl?:string;
};

// Joins any number of path segments onto BASE_URL with exactly one "/" between each,
// regardless of whether BASE_URL or the segments already have leading/trailing slashes.
function joinUrl(...segments: string[]): string {
  const base = BASE_URL?.replace(/\/+$/, ""); // strip trailing slash from BASE_URL
  const cleanSegments = segments
    .map((s) => s?.trim().replace(/^\/+|\/+$/g, "")) // strip leading/trailing slashes
    .filter((s) => s && s !== "#"); // drop empty/hash segments
  return cleanSegments.length ? `${base}/${cleanSegments.join("/")}` : `${base}/`;
}

// A menu url counts as a real page only if it's non-empty and not "/" or "#"
function isRealMenuUrl(url: string | null): url is string {
  if (!url) return false;
  const trimmed = url.trim().replace(/^\/+|\/+$/g, "");
  return trimmed !== "" && trimmed !== "#";
}

export function buildGlobalSchema(args: GlobalSchemaArgs) {
  const {
    pageTitle,
    metaDescription,
    primaryImageUrl,
    datePublishedIso,
    dateModifiedIso,
    languageTag,
    parentMenus = [],
    currentPageSlug,
    currentPageName,
    canonicalUrl
  } = args;

  const realParents = parentMenus.filter((menu) => isRealMenuUrl(menu.url)); 

  const breadcrumbItems: { name: string; item: string }[] = [
    { name: "Home", item: joinUrl() },
    ...realParents.map((menu, index) => ({
      name: menu.title,
      item: joinUrl(...realParents.slice(0, index + 1).map((m) => m.url as string)),
    })),
    { name: currentPageName, item: currentPageSlug },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: metaDescription,
        isPartOf: { "@id": joinUrl("#website") }, // careful, see note below
        publisher: { "@id": joinUrl("#organization") },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        primaryImageOfPage: { "@id": `${primaryImageUrl}#image` },
        datePublished: datePublishedIso,
        dateModified: dateModifiedIso,
        inLanguage: languageTag,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      },
    ],
  };
}