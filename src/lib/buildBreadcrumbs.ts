import { BASE_URL } from "@/src/config/config";
import { headers } from "next/headers";

export async function buildBreadcrumbs(data: any, currentPageTitle?:string) {
  const parent_menus = data?.parent_menus;
  const slug = data?.active_tab_slug || '';
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';

  const isProgramsOffered = pathname.includes("programs-offered");
  const isProgram = pathname.includes("program") && !pathname.includes("programs-offered");
  const isDepartments = pathname.includes("department");
  const isDepartmentDetail = pathname.includes("department") && !pathname.includes("departments");

  return [
    // { label: "Home", slug: BASE_URL },
    ...(isProgramsOffered || isProgram || isDepartments ? [{ label: "Academics" }] : []),
    ...(parent_menus ? parent_menus.map((item: any) => (item.url ? { label: item.title, slug: BASE_URL + item.url } : { label: item.title })) : []),
    ...(isProgram ? [{ label: "Programs Offered", slug: BASE_URL + "programs-offered" }] : []),
    ...(isDepartmentDetail ? ([{label:"Departments", slug:BASE_URL + "departments"}]) : []),
    ...(isDepartmentDetail ? ([data?.tab_title ? {label:data?.tab_title} : {label:data?.department_name, slug:`${BASE_URL}department/${data?.department_slug}`}]) : []),
    { label: data?.menu_title ?? data?.page_title ?? '' },
    currentPageTitle && {label:currentPageTitle}
  ];
}