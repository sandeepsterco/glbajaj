import NewsEventsListing from "@/src/components/newsEvents/NewsEventsListing";
import { getPageSEO } from "@/src/lib/seo";

export async function generateMetadata() {
  return getPageSEO("happenings/news-events");
}

interface SearchParams {
  page?: string;
  department?: string;
}

export default async function NewsEvent({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { department } = await searchParams;

  return <NewsEventsListing page={1} department={department || ""} />;
}
