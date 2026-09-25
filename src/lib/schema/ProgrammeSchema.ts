import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type StaticSegment = {
  name: string;
  slug: string;
};

export type CourseRef = {
  url: string; // full course URL, e.g. "http://localhost:3000/academics/programmes/btech-cse/courses/data-structures"
};

export type RecognisingBody = {
  name: string;
  url?: string;
};

export type ProgrammeSchemaArgs = {
  programmePageTitle: string;
  metaDescription: string;
  programmeName: string;
  visibleProgrammeSummary: string;

  staticSegments: StaticSegment[]; // e.g. [{name:"Academics", slug:"academics"}, {name:"Programmes", slug:"programmes"}]
  programmeSlug: string; // e.g. "btech-cse"

  // Optional sub-tab, same convention as department schema (omit for the default/home tab)
  activeTabSlug?: string;
  activeTabName?: string;

  // Links to the owning department (built by buildDepartmentSchema / its URL logic)
  departmentUrl?: string; // full URL of the department page, used as "{{DEPARTMENT_URL}}#department"

  // Programme facts — all optional; each is left out of the JSON if not supplied
  educationalProgramMode?: string; // "Full-time" | "Part-time" | "Online" | etc.
  timeToCompleteIso?: string; // ISO 8601 duration, e.g. "P4Y"
  programPrerequisites?: string; // visible eligibility text
  maximumEnrollment?: number; // only if publicly stated
  applicationStartDateIso?: string;
  applicationDeadlineIso?: string;

  // Credential
  degreeOrCredentialName?: string;
  credentialCategory?: string; // "Degree" | "Certificate" | "Diploma" | etc.
  educationalLevel?: string; // only if consistently maintained
  recognisingBodies?: RecognisingBody[]; // omit entirely if none to cite factually

  // Courses under this programme
  courses?: CourseRef[];

  // Fees — only if publicly published
  feesUrl?: string;
  feeAmount?: number;
  programmeUrl:string;
};

function cleanSlug(slug?: string) {
  return slug?.trim().replace(/^\/+|\/+$/g, "");
}

function getSubTabSlug(activeTabSlug: string, programmeSlug: string): string {
  const cleaned = cleanSlug(activeTabSlug) || '';
  const withoutProgramme = cleaned?.startsWith(programmeSlug)
    ? cleaned.slice(programmeSlug.length).replace(/^\/+/, "")
    : cleaned;
  return withoutProgramme === "home" ? "" : withoutProgramme;
}

export function buildProgrammeSchema(args: ProgrammeSchemaArgs) {
  const {
    programmePageTitle,
    metaDescription,
    programmeName,
    visibleProgrammeSummary,
    staticSegments,
    programmeSlug,
    activeTabSlug,
    activeTabName,
    departmentUrl,
    educationalProgramMode,
    timeToCompleteIso,
    programPrerequisites,
    maximumEnrollment,
    applicationStartDateIso,
    applicationDeadlineIso,
    degreeOrCredentialName,
    credentialCategory,
    educationalLevel,
    recognisingBodies,
    courses,
    feesUrl,
    feeAmount,
    programmeUrl,
  } = args;

  const baseUrl = getBaseUrl();
  const subTabSlug = activeTabSlug ? getSubTabSlug(activeTabSlug, programmeSlug) : "";

  const basePathSegments = [...staticSegments.map((s) => cleanSlug(s.slug)), cleanSlug(programmeSlug)];

  const breadcrumbItems: { name: string; item: string }[] = [
    { name: "Home", item: `${baseUrl}/` },
    ...staticSegments.map((seg, index) => ({
      name: seg.name,
      item: `${baseUrl}/${staticSegments
        .slice(0, index + 1)
        .map((s) => cleanSlug(s.slug))
        .join("/")}`,
    })),
    { name: programmeName, item: `${baseUrl}/${basePathSegments.join("/")}` },
    ...(subTabSlug && activeTabName ? [{ name: activeTabName, item: programmeUrl }] : []),
  ];

  // Only include an Offer node when fee info is actually public
  const offers =
    feesUrl && typeof feeAmount === "number"
      ? {
          "@type": "Offer",
          url: feesUrl,
          category: "Tuition",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: feeAmount,
            priceCurrency: "INR",
          },
        }
      : undefined;

  // Only include the credential node if there's a name to give it
  const credential = degreeOrCredentialName
    ? {
        "@type": "EducationalOccupationalCredential",
        "@id": `${programmeUrl}#credential`,
        name: degreeOrCredentialName,
        credentialCategory,
        educationalLevel,
        recognizedBy: recognisingBodies?.map((body) => ({
          "@type": "Organization",
          name: body.name,
          url: body.url,
        })),
      }
    : undefined;

  const graph: object[] = [
    {
      "@type": "WebPage",
      "@id": `${programmeUrl}#webpage`,
      url: programmeUrl,
      name: programmePageTitle,
      description: metaDescription,
      mainEntity: { "@id": `${programmeUrl}#programme` },
      isPartOf: { "@id": `${baseUrl}#website` },
      breadcrumb: { "@id": `${programmeUrl}#breadcrumb` },
      inLanguage: 'en-IN',
    },
    {
      "@type": "EducationalOccupationalProgram",
      "@id": `${programmeUrl}#programme`,
      name: programmeName,
      url: programmeUrl,
      description: visibleProgrammeSummary,
      provider: { "@id": `${departmentUrl}#department` },
      educationalProgramMode,
      timeToComplete: timeToCompleteIso,
      programPrerequisites,
      maximumEnrollment,
      applicationStartDate: applicationStartDateIso,
      applicationDeadline: applicationDeadlineIso,
      educationalCredentialAwarded: credential ? { "@id": `${programmeUrl}#credential` } : undefined,
      hasCourse: courses?.length ? courses.map((c) => ({ "@id": `${c.url}#course` })) : undefined,
      offers,
    },
    ...(credential ? [credential] : []),
    {
      "@type": "BreadcrumbList",
      "@id": `${programmeUrl}#breadcrumb`,
      itemListElement: breadcrumbItems.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}