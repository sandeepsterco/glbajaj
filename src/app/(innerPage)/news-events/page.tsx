import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import MainNews from "@/src/components/newsEvents/MainNews";
import NewsListing from "@/src/components/newsEvents/NewsListing";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

interface SearchParams {
  page?: string;
  department?: string;
}

export default async function NewsEvent({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const department = params.department || "";

  const query = new URLSearchParams({
    page: String(currentPage),
    ...(department && { department }),
  }).toString();

  const [{ data, error }, { data: deptData }] = await Promise.all([
    apiFetch(`news-and-events?${query}`),
    apiFetch("departments"),
  ]);

  if (error) {
    return <ApiErrorFallback heading="Couldn't load news" message={error} />;
  }

  const pagination = data?.news_and_events;
  const allItems: any[] = pagination?.data ?? [];

  // First item → MainNews, rest → NewsListing
  const mainData = allItems[0] ?? null;
  const otherListing = allItems.slice(1);

  const departments: { name: string; slug: string }[] = deptData?.data ?? [];
  const slug = "news-events";

  return (
    <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>
      <MainNews
        data={mainData}
        slug={slug}
        departments={departments}
        currentDepartment={department}
      />
      {otherListing.length > 0 && (
        <NewsListing data={otherListing} slug={slug} />
      )}
      <PaginationWrapper
        currentPage={pagination?.current_page || 1}
        totalPages={pagination?.last_page || 1}
      />
    </InnerPageLayoutWrapper>
  );
}