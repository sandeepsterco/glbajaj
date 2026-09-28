import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type BlogSchemaArgs = {
  headline: string;
  summary: string;
  datePublishedIso: string;
  dateModifiedIso?: string; // omit if never edited since publish
  blogUrl:string;
  images?:string[];

  image1x1Url?: string;
  image4x3Url?: string;
  image16x9Url?: string;

  authorProfileUrl?: string;

  category?: string; // articleSection

  primaryRelatedEntityId?: string; // "about"
};

function cleanSlug(slug: string) {
  return slug?.trim().replace(/^\/+|\/+$/g, "");
}

export function buildBlogDetailSchema(args: BlogSchemaArgs) {
  const {
    headline,
    summary,
    datePublishedIso,
    dateModifiedIso,
    authorProfileUrl,
    category,
    primaryRelatedEntityId,
    blogUrl,
    images
  } = args;

  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${blogUrl}#article`,
    url: blogUrl,
    mainEntityOfPage: { "@id": `${blogUrl}#webpage` },
    headline,
    description: summary,
    image: images?.length ? images : undefined,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    author: authorProfileUrl ? { "@id": `${authorProfileUrl}#person` } : undefined,
    publisher: { "@id": `${baseUrl}#organization` },
    articleSection: category,
    about: primaryRelatedEntityId ? [{ "@id": primaryRelatedEntityId }] : undefined,
    inLanguage: 'en-IN',
  };
}