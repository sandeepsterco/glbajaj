import { BASE_URL } from "@/src/config/config";

export type ParentMenu = {
  id: number;
  title: string;
  url: string | null;
};

export type GlobalSchemaArgs = {
  canonicalUrl: string; // full URL built from the current path
  pageTitle: string;
  metaDescription: string;
  primaryImageUrl: string;
  datePublishedIso?: string;
  dateModifiedIso?: string;
  languageTag: string;

  // Straight from the API
  parentMenus?: ParentMenu[]; // data.parent_menus
  currentPageName: string; // data.menu_title ?? data.page_title
};

// Build full URL from a path, e.g. "/about-us/our-inspiration"
export function buildCanonicalUrl(pathname: string) {
  const clean = pathname.replace(/\/+$/, ""); // strip trailing slash
  return `${BASE_URL}${clean.startsWith("/") ? clean : `/${clean}`}`;
}

// Returns absolute URL, or undefined if the menu has no real page
function resolveMenuUrl(url: string | null): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (trimmed === "" || trimmed === "#") return undefined; // "/" = Home, not a real parent
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `${trimmed.startsWith("/") ? `${BASE_URL}` : `/${trimmed}`}`;
}

export function buildGlobalSchema(args: GlobalSchemaArgs) {
  const {
    canonicalUrl,
    pageTitle,
    metaDescription,
    primaryImageUrl,
    datePublishedIso,
    dateModifiedIso,
    languageTag,
    parentMenus = [],
    currentPageName,
  } = args;

  const breadcrumbItems: { name: string; item?: string }[] = [
    { name: "Home", item: `${BASE_URL}` }, // mandatory, base URL
    ...parentMenus.map((menu) => ({
      name: menu.title,
      item: resolveMenuUrl(menu.url), // undefined if null or "/"
    })),
    { name: currentPageName, item: canonicalUrl }, // always the real page URL
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
        isPartOf: { "@id": `${BASE_URL}#website` },
        publisher: { "@id": `${BASE_URL}#organization` },
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
          item: crumb.item, // omitted from JSON when undefined
        })),
      },
    ],
  };
}