import { BASE_URL } from "../config/config";

export function buildBreadcrumbs(data: any, pathname: string, currentPageTitle?: string, parentSlug?:string) {
  const parent_menus = data?.parent_menus;

  const isProgramsOffered = pathname.includes("programs-offered");
  const isProgram = pathname.includes("program") && !pathname.includes("programs");
  const isDepartments = pathname.includes("department");
  const isDepartmentDetail = pathname.includes("department") && !pathname.includes("departments");

  return [
    ...(isProgramsOffered || isProgram || isDepartments ? [{ label: "Academics" }] : []),
    ...(parent_menus
      ? parent_menus.map((item: any) =>
          item.url ? { label: item.title, slug: BASE_URL + item.url } : { label: item.title }
        )
      : []),
    ...(isProgram ? [{ label: "Programs Offered", slug: BASE_URL + "programs-offered" }] : []),
    ...(isDepartmentDetail ? [{ label: "Departments", slug: BASE_URL + "departments" }] : []),
    ...(isDepartmentDetail
      ? [
          data?.tab_title
            ? { label: data?.tab_title }
            : { label: data?.department_name, slug: `${BASE_URL}${parentSlug}/departments/${data?.department_slug}` },
        ]
      : []),
    { label: data?.menu_title ?? data?.page_title ?? "" },
    ...(currentPageTitle ? [{ label: currentPageTitle }] : []),
  ].filter(Boolean);
}