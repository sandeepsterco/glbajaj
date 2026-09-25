import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type NewsArticleSchemaArgs = {
  headline: string;
  articleSummary: string;
  datePublishedIso: string;
  dateModifiedIso?: string; // omit if never edited since publish
  languageTag: string;

  // Passed via props, since there's no parent_menus for modular pages
  staticSegments: { name: string; slug: string }[]; // e.g. [{name:"News", slug:"news"}] — used to build the URL only, not emitted here
  articleSlug: string;

  // Images — pass whichever aspect ratios you actually have; only non-empty ones are included
  image1x1Url?: string;
  image4x3Url?: string;
  image16x9Url?: string;

  // Author(s) — url of an existing faculty/person profile page (from buildFacultySchema), if the author has one
  authorProfileUrls?: string[];

  category?: string; // articleSection, e.g. "Campus News"
  keywords?: string[];

  // Related entities already defined elsewhere in your schemas, e.g. a programme, department, or event @id
  primaryRelatedEntityId?: string; // "about" — the article's main subject
  secondaryRelatedEntityIds?: string[]; // "mentions" — things referenced in passing
};

function cleanSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

export function buildNewsArticleSchema(args: NewsArticleSchemaArgs) {
  const {
    headline,
    articleSummary,
    datePublishedIso,
    dateModifiedIso,
    languageTag,
    staticSegments,
    articleSlug,
    image1x1Url,
    image4x3Url,
    image16x9Url,
    authorProfileUrls,
    category,
    keywords,
    primaryRelatedEntityId,
    secondaryRelatedEntityIds,
  } = args;

  const baseUrl = getBaseUrl();
  const pathSegments = [...staticSegments.map((s) => cleanSlug(s.slug)), cleanSlug(articleSlug)];
  const articleUrl = `${baseUrl}/${pathSegments.join("/")}`;

  const images = [image1x1Url, image4x3Url, image16x9Url].filter((url): url is string => Boolean(url));

  const author = authorProfileUrls?.length
    ? authorProfileUrls.map((url) => ({ "@id": `${url}#person` }))
    : undefined;

  const about = primaryRelatedEntityId ? [{ "@id": primaryRelatedEntityId }] : undefined;

  const mentions = secondaryRelatedEntityIds?.length
    ? secondaryRelatedEntityIds.map((id) => ({ "@id": id }))
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${articleUrl}#article`,
    url: articleUrl,
    mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
    headline,
    description: articleSummary,
    image: images.length ? images : undefined,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author,
    publisher: { "@id": `${baseUrl}/#organization` },
    articleSection: category,
    keywords: keywords?.length ? keywords : undefined,
    about,
    mentions,
    inLanguage: languageTag,
  };
}