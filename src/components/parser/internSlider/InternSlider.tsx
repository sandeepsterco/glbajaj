import { apiFetch } from "@/src/lib/api";
import InternSliderClient, { type Achievement } from "./InternSliderClient";

async function fetchInternSlider(): Promise<Achievement[]> {
  const { data, error } = await apiFetch(`intern`);
  if (error) throw new Error(error);
  return data?.intern ?? [];
}

export default async function InternSlider() {
  const sliderItems = await fetchInternSlider();

  if (sliderItems.length === 0) return null;

  return <InternSliderClient sliderItems={sliderItems} />;
}