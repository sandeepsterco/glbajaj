import { BASE_URL } from "../config/config";

export function buildBreadcrumbs(data: any, pathname: string, currentPageTitle?: string, parentSlug?:string) {
  const parent_menus = data?.parent_menus ?? [];

  const isProgramsOffered = pathname.includes("programs");
  const isProgram = pathname.includes("program") && !pathname.includes("programs");
  const isDepartments = pathname.includes("department");
  const isDepartmentDetail = pathname.includes("department") && !pathname.includes("departments");
  const isPlacementsSubpage = pathname.startsWith("/placements/");
  const isAboutUsSubpage = pathname.startsWith("/about-us/");

  let accumulated = "";
  const parentCrumbs = parent_menus.map((item:any) => {
    if (!item.url) return { label: item.title };
    const cleanUrl = String(item.url).replace(/^\/+|\/+$/g, "");
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
          data?.tab_title
            ? { label: data?.tab_title, slug: `${BASE_URL}${parentSlug}/departments/${data?.department_slug}` }
            : { label: data?.department_name, slug: `${BASE_URL}${parentSlug}/departments/${data?.department_slug}` },
        ]
      : []),
    {
      label: data?.menu_title ?? data?.page_title ?? "",
      ...(currentPageTitle ? { slug: `${BASE_URL}${parentSlug}/${data?.current_page_slug}` } : {}),
    },
    ...(currentPageTitle ? [{ label: currentPageTitle }] : []),
  ].filter(Boolean);
}