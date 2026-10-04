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

  parentMenus?: ParentMenu[]; 
  currentPageSlug: string; 
  currentPageName: string; 
  canonicalUrl?:string;
};

function joinUrl(...segments: string[]): string {
  const base = BASE_URL?.replace(/\/+$/, "");
  const cleanSegments = segments
    .map((s) => s?.trim().replace(/^\/+|\/+$/g, ""))
    .filter((s) => s && s !== "#"); 
  return cleanSegments.length ? `${base}/${cleanSegments.join("/")}` : `${base}/`;
}

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
        isPartOf: { "@id": joinUrl("#website") },
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