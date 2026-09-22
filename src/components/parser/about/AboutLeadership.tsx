import { apiFetch } from "@/src/lib/api";
import AboutLeadershipSlider, { type LeaderItem } from "./Aboutleadershipslider";

export default async function AboutLeadership() {
  const { data, error } = await apiFetch(`leadership`);

  if (error) return null;

  const leaders: LeaderItem[] = data?.leadership ?? [];

  if (!leaders.length) return null;

  return <AboutLeadershipSlider leaders={leaders} />;
}