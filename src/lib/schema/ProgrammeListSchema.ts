import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type ProgrammeListItem = {
  url: string; // full programme page URL, e.g. "http://localhost:3000/academics/programmes/btech-cse"
  entityId?: string; // defaults to `${url}#programme` if not given (matches buildProgrammeSchema's @id)
};

export type ProgrammeListSchemaArgs = {
  listingUrl: string; // full URL of this listing page, e.g. "http://localhost:3000/academics/programmes"
  items: ProgrammeListItem[];
};

export function buildProgrammeListSchema(args: ProgrammeListSchemaArgs) {
  const { listingUrl, items } = args;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${listingUrl}#list`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.url,
      item: { "@id": item.entityId ?? `${item.url}#programme` },
    })),
  };
}