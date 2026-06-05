import { apiFetch } from "@/src/lib/api";
import HeaderClient from "./Headerclient";

async function getHeaderData() {
  const [headerRes, sidebarRes] = await Promise.all([
    apiFetch("menu?location=header"),
    apiFetch("menu?location=sidebar"),
  ]);

  return {
    headerMenu: headerRes.data,
    sidebarMenu: sidebarRes.data,
    error: headerRes.error || sidebarRes.error,
  };
}

export default async function Header() {
  const headerData = await getHeaderData();
  return <HeaderClient headerData={headerData} />;
}