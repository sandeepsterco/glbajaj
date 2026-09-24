import { BASE_URL } from "@/src/config/config";

export type GlobalSchemaArgs = {
  canonicalUrl: string;
  pageTitle: string;
  metaDescription: string;
  primaryImageUrl: string;
  datePublishedIso?: string; // optional
  dateModifiedIso?: string; // optional
  languageTag: string; // e.g. "en-IN"
  parentName?: string; // optional: omit for top-level pages
  parentUrl?: string;
  currentPageName: string;
};

export function buildGlobalSchema(args: GlobalSchemaArgs) {
  const {
    canonicalUrl,
    pageTitle,
    metaDescription,
    primaryImageUrl,
    datePublishedIso,
    dateModifiedIso,
    languageTag,
    parentName,
    parentUrl,
    currentPageName,
  } = args;

  const breadcrumbItems = [
    { name: "Home", item: `${BASE_URL}` },
    ...(parentName && parentUrl ? [{ name: parentName, item: parentUrl }] : []),
    { name: currentPageName, item: canonicalUrl },
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
        datePublished: datePublishedIso, // omitted from JSON if undefined
        dateModified: dateModifiedIso, // omitted from JSON if undefined
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