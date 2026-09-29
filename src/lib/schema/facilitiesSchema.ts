import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type FacilityAddress = {
  streetAddress?: string; // only if distinct from the main campus address
  city?: string;
  state?: string;
  pin?: string;
};

export type FacilityGeo = {
  latitude: number;
  longitude: number;
};

export type FacilitySchemaArgs = {
  facilityType: string;
  facilityUrl:string;
  facilityName: string;
  visibleFacilityDescription: string;
  facilitySlug?: string;

  // Only include if the facility has its own distinct address/location from the main campus
  address?: FacilityAddress;
  geo?: FacilityGeo;
};

function cleanSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

export function buildFacilitySchema(args: FacilitySchemaArgs) {
  const {
    facilityType,
    facilityName,
    visibleFacilityDescription,
    address,
    geo,
    facilityUrl,
  } = args;

  const baseUrl = getBaseUrl();

  const postalAddress = address
    ? {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
        addressLocality: address.city,
        addressRegion: address.state,
        postalCode: address.pin,
        addressCountry: "IN",
      }
    : undefined;

  const geoCoordinates = geo
    ? {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": facilityType,
        "@id": `${facilityUrl}#library`,
        name: facilityName,
        url: facilityUrl,
        description: visibleFacilityDescription,
        parentOrganization: { "@id": `${baseUrl}#organization` },
        address: postalAddress,
        geo: geoCoordinates,
      },
      {
        "@type": "WebPage",
        "@id": `${facilityUrl}#webpage`,
        url: facilityUrl,
        name: facilityName,
        mainEntity: { "@id": `${facilityUrl}#library` },
      },
    ],
  };
}