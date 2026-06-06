import { BASE_URL } from "@/src/config/config";
import { headers } from "next/headers";

export async function buildBreadcrumbs(data: any) {
  const parentMenu = data?.parent_menu;
  const slug = data?.active_tab_slug || '';
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';

  const isProgramsOffered = pathname.includes("programs-offered");
  const isProgram = pathname.includes("program") && !pathname.includes("programs-offered");
  const isDepartments = pathname.includes("department");

  return [
    { label: "Home", slug: BASE_URL },
    ...(isProgramsOffered || isProgram || isDepartments ? [{ label: "Academics" }] : []),
    ...(parentMenu ? [{ label: parentMenu.title, slug: BASE_URL + parentMenu.url }] : []),
    ...(isProgram ? [{ label: "Programs Offered", slug: BASE_URL + "programs-offered" }] : []),
    { label: data?.page_title },
  ];
}