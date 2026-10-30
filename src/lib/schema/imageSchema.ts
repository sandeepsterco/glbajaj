import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type ImageSchemaArgs = {
  imageUrl: string;
  imageTitle: string;
  widthPx?: number;
  heightPx?: number;

  caption?: string; 
  imageContext?: string; 
  creditText?: string; 
  copyrightNotice?: string; 
};

export function buildImageSchema(args: ImageSchemaArgs) {
  const { imageUrl, imageTitle, widthPx, heightPx, caption, imageContext, creditText, copyrightNotice } = args;

  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${imageUrl}#image`,
    url: imageUrl,
    contentUrl: imageUrl,
    name: imageTitle,
    caption,
    description: imageContext,
    width: widthPx,
    height: heightPx,
    creator: { "@id": `${baseUrl}/#organization` },
    creditText,
    copyrightNotice,
  };
}