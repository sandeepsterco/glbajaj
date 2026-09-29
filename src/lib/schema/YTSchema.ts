import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type VideoChapter = {
  name: string;
  startSeconds: number;
  endSeconds: number;
};

export type YoutubeVideoSchemaArgs = {
  pageUrl: string; // full URL of the page this video is embedded on
  videoId: string; // your internal id, used to make @id unique when a page has multiple videos
  videoTitle: string;
  videoDescription: string;
  thumbnailUrl: string;
  uploadDateIso: string;
  durationIso: string; // ISO 8601 duration, e.g. "PT12M30S"
  youtubeVideoId: string; // the actual YouTube video id, e.g. "dQw4w9WgXcQ"

  transcript?: string; // only if a transcript is actually maintained
  primaryRelatedEntityId?: string; // "about"
  secondaryRelatedEntityIds?: string[]; // "mentions"
  chapters?: VideoChapter[]; // "hasPart" — omit entirely if the video has no chapters
};

export function buildYoutubeVideoSchema(args: YoutubeVideoSchemaArgs) {
  const {
    pageUrl,
    videoId,
    videoTitle,
    videoDescription,
    thumbnailUrl,
    uploadDateIso,
    durationIso,
    youtubeVideoId,
    transcript,
    primaryRelatedEntityId,
    secondaryRelatedEntityIds,
    chapters,
  } = args;

  const baseUrl = getBaseUrl();

  const about = primaryRelatedEntityId ? [{ "@id": primaryRelatedEntityId }] : undefined;

  const mentions = secondaryRelatedEntityIds?.length
    ? secondaryRelatedEntityIds.map((id) => ({ "@id": id }))
    : undefined;

  const hasPart = chapters?.length
    ? chapters.map((chapter) => ({
        "@type": "Clip",
        name: chapter.name,
        startOffset: chapter.startSeconds,
        endOffset: chapter.endSeconds,
        url: `https://www.youtube.com/watch?v=${youtubeVideoId}&t=${chapter.startSeconds}s`,
      }))
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video-${videoId}`,
    name: videoTitle,
    description: videoDescription,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: uploadDateIso,
    duration: durationIso,
    embedUrl: `https://www.youtube.com/embed/${youtubeVideoId}`,
    sameAs: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
    url: pageUrl,
    publisher: { "@id": `${baseUrl}#organization` },
    creator: { "@id": `${baseUrl}#organization` },
    transcript,
    about,
    mentions,
    hasPart,
  };
}