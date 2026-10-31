import { BASE_URL } from "../config/config";

type BreadcrumbData = {
  parent_menus?: Array<{ title: string; url?: string; slug?: string }>;
  tab_title?: string;
  department_slug?: string;
  department_name?: string;
  menu_title?: string;
  page_title?: string;
  current_page_slug?: string;
};

export type CustomTabs = Partial<BreadcrumbData> & {
  tabs?: Array<{ title: string; slug?: string; url?: string }>;
  [key: string]: unknown;
};

export function buildBreadcrumbs(
  data: BreadcrumbData,
  pathname: string,
  currentPageTitle?: string,
  parentSlug?: string,
  customTabs?: CustomTabs
) {
  const breadcrumbData: BreadcrumbData = { ...data, ...customTabs };
  const parent_menus = customTabs?.tabs ?? breadcrumbData.parent_menus ?? [];

  const isProgramsOffered = pathname.includes("programs");
  const isProgram = pathname.includes("program") && !pathname.includes("programs");
  const isDepartments = pathname.includes("department");
  const isDepartmentDetail = pathname.includes("department") && !pathname.includes("departments");
  const isPlacementsSubpage = pathname.startsWith("/placements/");
  const isAboutUsSubpage = pathname.startsWith("/about-us/");

  let accumulated = "";
  const parentCrumbs = parent_menus.map((item) => {
    const itemUrl = item.url ?? item.slug;
    if (!itemUrl) return { label: item.title };
    const cleanUrl = String(itemUrl).replace(/^\/+|\/+$/g, "");
    accumulated = accumulated ? `${accumulated}/${cleanUrl}` : cleanUrl;
    return { label: item.title, slug: `${BASE_URL}${accumulated}` };
  });
  const hasPlacementsParent = parentCrumbs.some(
    (item: { label: string }) => item.label?.toLowerCase() === "placements"
  );

  const hasAboutUsParent = parentCrumbs.some(
    (item: { label: string }) => item.label?.toLowerCase() === "about us"
  );

  return [
    ...(isProgramsOffered || isProgram || isDepartments ? [{ label: "Academics", slug: BASE_URL + "academics" }] : []),
    ...(isAboutUsSubpage && !hasAboutUsParent
      ? [{ label: "About Us", slug: BASE_URL + "about-us" }]
      : [...parentCrumbs]),
    ...(isPlacementsSubpage && !hasPlacementsParent
      ? [{ label: "Placements", slug: BASE_URL + "placements" }]
      : []),
    
    ...(isProgram ? [{ label: "Programs", slug: BASE_URL + "academics/"+ "programs" }] : []),
    ...(isDepartmentDetail ? [{ label: "Departments", slug: BASE_URL + "academics/"+ "departments" }] : []),
    ...(isDepartmentDetail
      ? [
          breadcrumbData.tab_title
            ? { label: breadcrumbData.tab_title, slug: `${BASE_URL}${parentSlug}/departments/${breadcrumbData.department_slug}` }
            : { label: breadcrumbData.department_name ?? "", slug: `${BASE_URL}${parentSlug}/departments/${breadcrumbData.department_slug}` },
        ]
      : []),
    {
      label: breadcrumbData.menu_title ?? breadcrumbData.page_title ?? "",
      ...(parentSlug && currentPageTitle ? { slug: `${BASE_URL}${parentSlug}/${breadcrumbData.current_page_slug}` } : currentPageTitle ? { slug: `${BASE_URL}${breadcrumbData.current_page_slug}` } : {}),
      // ...(currentPageTitle ? { slug: `${BASE_URL}${parentSlug}/${data?.current_page_slug}` } : {}),
    },
    ...(currentPageTitle ? [{ label: currentPageTitle }] : []),
  ].filter(Boolean);
}