import { apiFetch } from "@/src/lib/api";
import HomeFacilitiesClient from "./HomeFacilitiesClient";

async function fetchFacilities() {
  const { data, error } = await apiFetch("home-facilities-slides");
  if (error) throw new Error(error);
  return data;
}

export default async function HomeFacilities() {
  const data = await fetchFacilities();
  const tabsData = data?.homeFacilitiesSlides?.data ?? [];

  return <HomeFacilitiesClient tabsData={tabsData} />;
}