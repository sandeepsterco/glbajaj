import { BASE_URL } from "@/src/config/config";

export type ParentMenu = {
  id: number;
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
  } = args;

  const realParents = parentMenus.filter((menu) => isRealMenuUrl(menu.url)); // drops "About GLBITM" entirely

  // baseurl + each real parent's url, in order + current_page_slug last
  // e.g. joinUrl("about-us", "our-inspiration") -> "http://localhost:3000/about-us/our-inspiration"
  const canonicalUrl = joinUrl(
    ...realParents.map((m) => m.url as string),
    currentPageSlug
  );

  const breadcrumbItems: { name: string; item: string }[] = [
    { name: "Home", item: joinUrl() }, // "http://localhost:3000/"
    ...realParents.map((menu, index) => ({
      name: menu.title,
      // each parent crumb accumulates only the parents up to itself
      item: joinUrl(...realParents.slice(0, index + 1).map((m) => m.url as string)),
    })),
    { name: currentPageName, item: canonicalUrl }, // full nested path, last crumb
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