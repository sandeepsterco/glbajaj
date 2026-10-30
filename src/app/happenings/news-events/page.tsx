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
import { getPageSEO } from "@/src/lib/seo";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

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
  const sp = await searchParams;
  const currentPage = Number(sp.page) || 1;
  const department = sp.department || "";

  const query = new URLSearchParams({
    page: String(currentPage),
    ...(department && { department }),
  }).toString();

  const [{ data, error }, { data: deptData }, seoData] = await Promise.all([
    apiFetch(`news-and-events?${query}`),
    apiFetch("department-news-list"),
    getPageSEO("happenings/news-events"),
  ]);

  if (error) notFound();

  const pagination = data?.news_and_events;
  const allItems: any[] = pagination?.data ?? [];

  // First item → MainNews, rest → NewsListing
  const mainData = allItems[0] ?? null;
  const otherListing = allItems.slice(1);

  const departments: { name: string; slug: string }[] = deptData?.departments ?? [];
  const slug = "news-events";
  const globalSchema = buildGlobalSchema({
    canonicalUrl: seoData.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData.title || "",
    metaDescription: seoData.description || "",
    primaryImageUrl: "",
    languageTag: "en-IN",
    currentPageSlug: `${BASE_URL}happenings/news-events`,
    currentPageName: seoData.title || "",
    parentMenus: [{ title: "Happenings", url: "happenings" }],
  });

  return (
    <>
    {seoData.schema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
      />
    )}
    {globalSchema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
      />
    )}
    <InnerPageLayoutWrapper slug={slug} pathname={`/happenings/news-events`} tabs={null} mainClass="happenings_page" showTabs={true}>
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
    </>
  );
}