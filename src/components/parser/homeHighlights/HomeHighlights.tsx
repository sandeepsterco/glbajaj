import { apiFetch } from "@/src/lib/api";
import HomeUpcomingEventsClient from "./HomeHighlightsClient";
import HomeHighlightsClient from "./HomeHighlightsClient";

interface MediaCoverageItem {
  id: number;
  title: string;
  date: string;
  featured: string | null;
  slug: string;
  image: string | null;
}

interface NewsEventItem {
  id: number;
  heading: string;
  title: string | null;
  subtitle: string | null;
  image: string;
  date: string;
  description: string;
  bg_color: string | null;
  display_order: number | null;
  featured: string | null;
  slug: string;
}

interface UpcomingEventsResponse {
  status: boolean;
  mediaCoverage: MediaCoverageItem[];
  newsAndEvents: NewsEventItem[];
}

async function fetchUpcomingEvents(): Promise<UpcomingEventsResponse> {
  const { data, error } = await apiFetch("featured-media-coverage-and-news");
  if (error) throw new Error(error);
  return data ?? { status: false, mediaCoverage: [], newsAndEvents: [] };
}

export default async function HomeHighlights() {
  const events = await fetchUpcomingEvents();

  const hasMediaCoverage = !!events?.mediaCoverage?.length;
  const hasNewsAndEvents = !!events?.newsAndEvents?.length;

  if (!events || (!hasMediaCoverage && !hasNewsAndEvents)) return null;

  return <HomeHighlightsClient events={events} />;
}

export type { UpcomingEventsResponse, MediaCoverageItem, NewsEventItem };