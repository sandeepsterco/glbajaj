import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type JobLocation = {
  streetAddress?: string;
  city: string;
  state: string;
  pin?: string;
};

export type JobPostingSchemaArgs = {
  jobTitle: string;
  visibleFullJobDescriptionHtml: string; // full HTML description, as published on the page
  datePostedIso: string;
  validThroughIso?: string;
  employmentType: string; 
  jobUrl:string;
  jobLocation?: JobLocation;

  educationRequirements?: string;
  experienceRequirements?: string;
};

function cleanSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

export function buildJobPostingSchema(args: JobPostingSchemaArgs) {
  const {
    jobTitle,
    visibleFullJobDescriptionHtml,
    datePostedIso,
    validThroughIso,
    employmentType,
    jobUrl,
    jobLocation,
    educationRequirements,
    experienceRequirements,
  } = args;

  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${jobUrl}#job`,
    title: jobTitle,
    description: visibleFullJobDescriptionHtml,
    datePosted: datePostedIso,
    validThrough: validThroughIso,
    employmentType,
    hiringOrganization: { "@id": `${baseUrl}#organization` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: jobLocation?.streetAddress,
        addressLocality: jobLocation?.city,
        addressRegion: jobLocation?.state,
        postalCode: jobLocation?.pin,
        addressCountry: "IN",
      },
    },
    educationRequirements,
    experienceRequirements,
    url: jobUrl,
  };
}