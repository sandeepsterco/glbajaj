import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type NewsArticleSchemaArgs = {
  articleUrl:string;
  headline: string;
  articleSummary: string;
  datePublishedIso: string;
  dateModifiedIso?: string; 

  image1x1Url?: string;
  image4x3Url?: string;
  image16x9Url?: string;

  authorProfileUrls?: string[];

  category?: string;
  keywords?: string[];

  primaryRelatedEntityId?: string; 
  secondaryRelatedEntityIds?: string[]; 
};

function cleanSlug(slug?: string) {
  return slug?.trim().replace(/^\/+|\/+$/g, "");
}

export function buildNewsArticleSchema(args: NewsArticleSchemaArgs) {
  const {
    headline,
    articleSummary,
    datePublishedIso,
    dateModifiedIso,
    image1x1Url,
    image4x3Url,
    image16x9Url,
    authorProfileUrls,
    category,
    keywords,
    primaryRelatedEntityId,
    secondaryRelatedEntityIds,
    articleUrl
  } = args;

  const baseUrl = getBaseUrl();

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
    publisher: { "@id": `${baseUrl}#organization` },
    articleSection: category,
    keywords: keywords?.length ? keywords : undefined,
    about,
    mentions,
    inLanguage: 'en-IN',
  };
}