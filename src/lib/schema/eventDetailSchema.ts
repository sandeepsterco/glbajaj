// lib/event-schema.ts
import { BASE_URL } from "@/src/config/config";
import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type StaticSegment = {
  name: string;
  slug: string;
};

export type EventLocation = {
  venueName: string;
  street?: string;
  city?: string;
  state?: string;
  pin?: string;
};

export type EventSchemaArgs = {
  eventName: string;
  visibleEventDescription: string;
  startDateIso?: string; // with timezone, e.g. "2026-11-20T09:00:00+05:30"
  endDateIso?: string;

  // Passed via props, since there's no parent_menus for modular pages
  staticSegments: StaticSegment[]; // e.g. [{name:"Events", slug:"events"}]
  eventSlug?: string;

  // Images — pass whichever aspect ratios you actually have; only non-empty ones are included
  image1x1Url?: string;
  image4x3Url?: string;
  image16x9Url?: string;

  // Attendance
  attendanceMode?: "Offline" | "Online" | "Mixed"; // defaults to "Offline" if location is given
  location?: EventLocation; // omit entirely for a fully online event

  // Optional speaker(s) — url of an existing faculty/person profile page (from buildFacultySchema)
  speakerProfileUrls?: string[];

  // Optional registration/ticketing — only if publicly published
  registrationUrl?: string;
  price?: number; // 0 if truly free
};

function cleanSlug(slug?: string) {
  return slug?.trim().replace(/^\/+|\/+$/g, "");
}

const ATTENDANCE_MODE_MAP: Record<string, string> = {
  Offline: "https://schema.org/OfflineEventAttendanceMode",
  Online: "https://schema.org/OnlineEventAttendanceMode",
  Mixed: "https://schema.org/MixedEventAttendanceMode",
};

export function buildEventDetailSchema(args: EventSchemaArgs) {
  const {
    eventName,
    visibleEventDescription,
    startDateIso,
    endDateIso,
    staticSegments,
    eventSlug,
    image1x1Url,
    image4x3Url,
    image16x9Url,
    attendanceMode,
    location,
    speakerProfileUrls,
    registrationUrl,
    price,
  } = args;

  const baseUrl = BASE_URL
  const pathSegments = [...staticSegments?.map((s) => cleanSlug(s.slug)), cleanSlug(eventSlug)];
  const eventUrl = `${baseUrl}${pathSegments.join("/")}`;

  const breadcrumbItems: { name: string; item: string }[] = [
    { name: "Home", item: `${baseUrl}/` },
    ...staticSegments.map((seg, index) => ({
      name: seg.name,
      item: `${baseUrl}/${staticSegments
        .slice(0, index + 1)
        .map((s) => cleanSlug(s.slug))
        .join("/")}`,
    })),
    { name: eventName, item: eventUrl },
  ];

  const images = [image1x1Url, image4x3Url, image16x9Url].filter((url): url is string => Boolean(url));

  const resolvedMode = attendanceMode ?? (location ? "Offline" : undefined);

  const place = location
    ? {
        "@type": "Place",
        name: location.venueName,
        address: {
          "@type": "PostalAddress",
          streetAddress: location.street,
          addressLocality: location.city,
          addressRegion: location.state,
          postalCode: location.pin,
          addressCountry: "IN",
        },
      }
    : undefined;

  const performer = speakerProfileUrls?.length
    ? speakerProfileUrls.map((url) => ({ "@id": `${url}#person` }))
    : undefined;

  // Offer only if registration info is actually public (a price of 0 for a genuinely free event is still valid)
  const offers =
    registrationUrl || typeof price === "number"
      ? {
          "@type": "Offer",
          url: registrationUrl,
          price: price ?? 0,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "@id": `${eventUrl}#event`,
        name: eventName,
        description: visibleEventDescription,
        url: eventUrl,
        startDate: startDateIso,
        endDate: endDateIso,
        eventStatus: "https://schema.org/EventScheduled",
        // eventAttendanceMode: resolvedMode ? ATTENDANCE_MODE_MAP[resolvedMode] : undefined,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        image: images.length ? images : undefined,
        location: place,
        organizer: { "@id": `${baseUrl}#organization` },
        performer,
        offers,
      },
      {
        "@type": "WebPage",
        "@id": `${eventUrl}#webpage`,
        url: eventUrl,
        name: eventName,
        mainEntity: { "@id": `${eventUrl}#event` },
        isPartOf: { "@id": `${baseUrl}#website` },
        breadcrumb: { "@id": `${eventUrl}#breadcrumb` },
        inLanguage: 'en-IN',
      },
    //   {
    //     "@type": "BreadcrumbList",
    //     "@id": `${eventUrl}#breadcrumb`,
    //     itemListElement: breadcrumbItems.map((crumb, index) => ({
    //       "@type": "ListItem",
    //       position: index + 1,
    //       name: crumb.name,
    //       item: crumb.item,
    //     })),
    //   },
    ],
  };
}