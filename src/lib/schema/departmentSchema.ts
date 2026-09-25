// lib/department-schema.ts
import { getBaseUrl } from "@/src/lib/schema/schema-utils";

export type StaticSegment = {
  name: string; // e.g. "Academics"
  slug: string; // e.g. "academics"
};

export type DepartmentSchemaArgs = {
  departmentPageTitle: string;
  metaDescription: string;
  departmentName: string; // data.department_name
  visibleDepartmentDescription: string;

  // Passed via props, since there's no parent_menus for modular pages
  staticSegments: StaticSegment[]; // e.g. [{name:"Academics", slug:"academics"}, {name:"Departments", slug:"departments"}]
  departmentSlug: string; // data.department_slug, e.g. "applied-science-and-humanities"
  departmentUrl:string;

  // Optional: only for sub-tabs other than the default "home" tab
  activeTabSlug?: string; // data.active_tab_slug, e.g. "applied-science-and-humanities/faculty"
  activeTabName?: string; // label for that sub-tab, e.g. "Faculty"
};

function cleanSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

// Strips "department-slug/" prefix and drops a trailing "home" segment
// e.g. ("applied-science-and-humanities/home", "applied-science-and-humanities") -> ""
// e.g. ("applied-science-and-humanities/faculty", "applied-science-and-humanities") -> "faculty"
function getSubTabSlug(activeTabSlug: string, departmentSlug: string): string {
  const cleaned = cleanSlug(activeTabSlug);
  const withoutDept = cleaned.startsWith(departmentSlug)
    ? cleaned.slice(departmentSlug.length).replace(/^\/+/, "")
    : cleaned;
  return withoutDept === "home" ? "" : withoutDept;
}

export function buildDepartmentSchema(args: DepartmentSchemaArgs) {
  const {
    departmentPageTitle,
    metaDescription,
    departmentName,
    visibleDepartmentDescription,
    staticSegments,
    departmentSlug,
    activeTabSlug,
    activeTabName,
    departmentUrl,
  } = args;

  const baseUrl = getBaseUrl();
  const subTabSlug = activeTabSlug ? getSubTabSlug(activeTabSlug, departmentSlug) : "";

  // e.g. http://localhost:3000/academics/departments/applied-science-and-humanities
  // or   http://localhost:3000/academics/departments/applied-science-and-humanities/faculty
  const pathSegments = [
    ...staticSegments.map((s) => cleanSlug(s.slug)),
    cleanSlug(departmentSlug),
    ...(subTabSlug ? [subTabSlug] : []),
  ];

  const breadcrumbItems: { name: string; item: string }[] = [
    { name: "Home", item: `${baseUrl}/` },
    ...staticSegments.reduce<{ name: string; item: string }[]>((acc, seg, index) => {
      const segPath = staticSegments
        .slice(0, index + 1)
        .map((s) => cleanSlug(s.slug))
        .join("/");
      acc.push({ name: seg.name, item: `${baseUrl}/${segPath}` });
      return acc;
    }, []),
    { name: departmentName, item: `${baseUrl}/${[...staticSegments.map((s) => cleanSlug(s.slug)), cleanSlug(departmentSlug)].join("/")}` },
    ...(subTabSlug && activeTabName ? [{ name: activeTabName, item: departmentUrl }] : []),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${departmentUrl}#webpage`,
        url: departmentUrl,
        name: departmentPageTitle,
        description: metaDescription,
        mainEntity: { "@id": `${departmentUrl}#department` },
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: { "@id": `${departmentUrl}#breadcrumb` },
        inLanguage: 'en-IN',
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${departmentUrl}#department`,
        name: departmentName,
        url: departmentUrl,
        description: visibleDepartmentDescription,
        parentOrganization: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${departmentUrl}#breadcrumb`,
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