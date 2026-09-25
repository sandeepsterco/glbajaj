import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type StaticSegment = {
  name: string;
  slug: string;
};

export type FacultySchemaArgs = {
  facultyName: string;
  designation: string; // used in the WebPage name and Person jobTitle
  profileSummary: string; // WebPage description
  visibleBioSummary: string; // Person description
  profileImageUrl: string;
  languageTag: string;

  // Passed via props, since there's no parent_menus for modular pages
  staticSegments: StaticSegment[]; // e.g. [{name:"Academics", slug:"academics"}, {name:"Departments", slug:"departments"}, {name:"Applied Science and Humanities", slug:"applied-science-and-humanities"}, {name:"Faculty", slug:"faculty"}]
  facultySlug: string; // e.g. "dr-john-doe"

  // Links to the owning department
  departmentUrl: string; // full URL of the department page, used as "{{DEPARTMENT_URL}}#department"

  // Optional fields — each omitted from the JSON if not supplied
  honorificPrefix?: string; // "Dr." / "Prof." — only if actually used in how the person is addressed
  knowsAbout?: string[]; // areas of expertise
  orcidUrl?: string;
  authoritativeProfileUrl?: string; // e.g. an official Google Scholar / university-verified profile
};

function cleanSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

export function buildFacultyDetailSchema(args: FacultySchemaArgs) {
  const {
    facultyName,
    designation,
    profileSummary,
    visibleBioSummary,
    profileImageUrl,
    languageTag,
    staticSegments,
    facultySlug,
    departmentUrl,
    honorificPrefix,
    knowsAbout,
    orcidUrl,
    authoritativeProfileUrl,
  } = args;

  const baseUrl = getBaseUrl();
  const pathSegments = [...staticSegments.map((s) => cleanSlug(s.slug)), cleanSlug(facultySlug)];
  const facultyUrl = `${baseUrl}/${pathSegments.join("/")}`;

  const breadcrumbItems: { name: string; item: string }[] = [
    { name: "Home", item: `${baseUrl}/` },
    ...staticSegments.map((seg, index) => ({
      name: seg.name,
      item: `${baseUrl}/${staticSegments
        .slice(0, index + 1)
        .map((s) => cleanSlug(s.slug))
        .join("/")}`,
    })),
    { name: facultyName, item: facultyUrl },
  ];

  const sameAs = [orcidUrl, authoritativeProfileUrl].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${facultyUrl}#webpage`,
        url: facultyUrl,
        name: `${facultyName} – ${designation}`,
        description: profileSummary,
        mainEntity: { "@id": `${facultyUrl}#person` },
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: { "@id": `${facultyUrl}#breadcrumb` },
        inLanguage: languageTag,
      },
      {
        "@type": "Person",
        "@id": `${facultyUrl}#person`,
        name: facultyName,
        honorificPrefix,
        jobTitle: designation,
        description: visibleBioSummary,
        url: facultyUrl,
        image: profileImageUrl,
        worksFor: { "@id": `${departmentUrl}#department` },
        affiliation: { "@id": `${baseUrl}/#organization` },
        knowsAbout: knowsAbout?.length ? knowsAbout : undefined,
        sameAs: sameAs.length ? sameAs : undefined,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${facultyUrl}#breadcrumb`,
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