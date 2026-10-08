import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type StaticSegment = {
  name: string;
  slug: string;
};

export type LeadershipSchemaArgs = {
  leaderName: string;
  designation: string; 
  profileSummary: string; 
  visibleBioSummary: string; 
  profileImageUrl: string;
leaderUrl:string;
  staticSegments: StaticSegment[]; 
  leaderSlug: string; 

  departmentUrl?: string;

  honorificPrefix?: string; 
  knowsAbout?: string[];
  orcidUrl?: string;
  authoritativeProfileUrl?: string;
};

function cleanSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

export function buildLeadershipSchema(args: LeadershipSchemaArgs) {
  const {
    leaderName,
    designation,
    profileSummary,
    visibleBioSummary,
    profileImageUrl,
    staticSegments,
    leaderSlug,
    departmentUrl,
    honorificPrefix,
    knowsAbout,
    orcidUrl,
    authoritativeProfileUrl,
    leaderUrl,
  } = args;

  const baseUrl = getBaseUrl();

  const breadcrumbItems: { name: string; item: string }[] = [
    { name: "Home", item: `${baseUrl}/` },
    ...staticSegments?.map((seg, index) => ({
      name: seg.name,
      item: `${baseUrl}/${staticSegments
        .slice(0, index + 1)
        .map((s) => cleanSlug(s.slug))
        .join("/")}`,
    })),
    { name: leaderName, item: leaderUrl },
  ];

  const sameAs = [orcidUrl, authoritativeProfileUrl].filter((url): url is string => Boolean(url));

  const worksFor = departmentUrl ? { "@id": `${departmentUrl}#department` } : { "@id": `${baseUrl}/#organization` };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${leaderUrl}#webpage`,
        url: leaderUrl,
        name: `${leaderName} – ${designation}`,
        description: profileSummary,
        mainEntity: { "@id": `${leaderUrl}#person` },
        isPartOf: { "@id": `${baseUrl}#website` },
        breadcrumb: { "@id": `${leaderUrl}#breadcrumb` },
        inLanguage: 'en-IN',
      },
      {
        "@type": "Person",
        "@id": `${leaderUrl}#person`,
        name: leaderName,
        honorificPrefix,
        jobTitle: designation,
        description: visibleBioSummary,
        url: leaderUrl,
        image: profileImageUrl,
        worksFor,
        affiliation: { "@id": `${baseUrl}#organization` },
        knowsAbout: knowsAbout?.length ? knowsAbout : undefined,
        sameAs: sameAs.length ? sameAs : undefined,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${leaderUrl}#breadcrumb`,
        itemListElement: breadcrumbItems.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      },
    ],
  };
}