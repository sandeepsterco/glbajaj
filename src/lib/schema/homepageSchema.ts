import { BASE_URL } from "@/src/config/config";

export type HomepageSchemaArgs = {
  // Organization
  officialInstitutionName: string;
  commonNameOrAcronym: string;
  legalName?: string;
  approvedInstitutionDescription: string;

  // Logo & image
  logoUrl: string;
  logoWidthPx: number;
  logoHeightPx: number;
  representativeCampusImageUrl: string;

  // Address & geo
  streetAddress: string;
  cityLocality: string;
  state: string;
  pinCode: string;
  latitude: number;
  longitude: number;

  // Contact
  primaryPhoneWithCountryCode: string;
  primaryEmail: string;
  admissionsPhone: string;
  admissionsEmail: string;
  generalPhone: string;
  generalEmail: string;

  // Social profiles (all optional)
  officialFacebookUrl?: string;
  officialInstagramUrl?: string;
  officialLinkedinUrl?: string;
  officialYoutubeUrl?: string;
  officialXUrl?: string;
  officialPinterestUrl?: string;

  // Misc
  foundingDateOrYear: string;
  identifierAuthority: string;
  identifierValue: string;

  // Website
  websiteName: string;
  websiteAlternateName: string;
  defaultLanguage: string; // e.g. "en-IN"
};

export function buildHomepageSchema(args: HomepageSchemaArgs) {
  const sameAs = [
    args.officialFacebookUrl,
    args.officialInstagramUrl,
    args.officialLinkedinUrl,
    args.officialYoutubeUrl,
    args.officialXUrl,
    args.officialPinterestUrl,
  ].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "@id": `${BASE_URL}#organization`,
        name: args.officialInstitutionName,
        alternateName: args.commonNameOrAcronym,
        legalName: args.legalName,
        url: `${BASE_URL}`,
        description: args.approvedInstitutionDescription,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}#logo`,
          url: args.logoUrl,
          contentUrl: args.logoUrl,
          width: args.logoWidthPx,
          height: args.logoHeightPx,
        },
        image: args.representativeCampusImageUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: args.streetAddress,
          addressLocality: args.cityLocality,
          addressRegion: args.state,
          postalCode: args.pinCode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: args.latitude,
          longitude: args.longitude,
        },
        telephone: args.primaryPhoneWithCountryCode,
        email: args.primaryEmail,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "admissions",
            telephone: args.admissionsPhone,
            email: args.admissionsEmail,
            availableLanguage: ["en", "hi"],
          },
          {
            "@type": "ContactPoint",
            contactType: "general enquiries",
            telephone: args.generalPhone,
            email: args.generalEmail,
            availableLanguage: ["en", "hi"],
          },
        ],
        sameAs,
        foundingDate: args.foundingDateOrYear,
        identifier: [
          {
            "@type": "PropertyValue",
            propertyID: args.identifierAuthority,
            value: args.identifierValue,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}#website`,
        url: `${BASE_URL}`,
        name: args.websiteName,
        alternateName: args.websiteAlternateName,
        publisher: { "@id": `${BASE_URL}#organization` },
        inLanguage: args.defaultLanguage,
      },
    ],
  };
}