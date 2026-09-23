import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import MainNews from "@/src/components/newsEvents/MainNews";
import NewsListing from "@/src/components/newsEvents/NewsListing";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";

interface SearchParams {
  page?: string;
  department?: string;
}

export default async function NewsEvent({
  params,
  searchParams,
}: {
  params: Promise<{ parentSlug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { parentSlug } = await params;
  const sp = await searchParams;
  const currentPage = Number(sp.page) || 1;
  const department = sp.department || "";

  const query = new URLSearchParams({
    page: String(currentPage),
    ...(department && { department }),
  }).toString();

  const [{ data, error }, { data: deptData }] = await Promise.all([
    apiFetch(`news-and-events?${query}`),
    apiFetch("department-news-list"),
  ]);

  if (error) notFound();

  const pagination = data?.news_and_events;
  const allItems: any[] = pagination?.data ?? [];

  // First item → MainNews, rest → NewsListing
  const mainData = allItems[0] ?? null;
  const otherListing = allItems.slice(1);

  const departments: { name: string; slug: string }[] = deptData?.departments ?? [];
  const slug = "news-events";

  return (
    <InnerPageLayoutWrapper slug={slug} pathname={`/${parentSlug}/news-events`} tabs={null} mainClass="happenings_page" showTabs={true}>
      <MainNews
        data={mainData}
        slug={slug}
        departments={departments}
        currentDepartment={department}
      />
      {otherListing.length > 0 && (
        <NewsListing data={otherListing} slug={slug} />
      )}
      {allItems.length > 0 && (
        <div className="news_pagination">
          <PaginationWrapper
            currentPage={pagination?.current_page || 1}
            totalPages={pagination?.last_page || 1}
          />
        </div>
      )}
    </InnerPageLayoutWrapper>
  );
}