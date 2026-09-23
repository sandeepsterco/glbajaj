import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import MainWorkshop from "@/src/components/workshop/MainWorkshop";
import WorkshopListing from "@/src/components/workshop/WorkshopListing";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

interface SearchParams {
  page?: string;
  department?: string;
}

export default async function Workshop({
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
    apiFetch(`workshops?${query}`),
    apiFetch("department-workshop-list"),
  ]);

  if (error) {
    return <ApiErrorFallback heading="Couldn't load Workshop Data" message={error} />;
  }

  const pagination = data?.workshop;
  const allItems: any[] = pagination?.data ?? [];

  // First item → MainWorkshop, rest → WorkshopListing
  const mainData = allItems[0] ?? null;
  const otherListing = allItems.slice(1);

  const departments: { name: string; slug: string }[] = deptData?.departments ?? [];
  // const slug = "workshops";
  const slug = "workshops";

  return (
    <InnerPageLayoutWrapper slug={slug}
    pathname={`/${parentSlug}/workshops`} tabs={null} mainClass="happenings_page" showTabs={true}>
      <MainWorkshop
        data={mainData}
        slug={slug}
        parentSlug={parentSlug}
        departments={departments}
        currentDepartment={department}
      />
      {otherListing.length > 0 && (
        <WorkshopListing data={otherListing} slug={slug} parentSlug={parentSlug} />
      )}
      {allItems.length > 0 && (
        <PaginationWrapper
          currentPage={pagination?.current_page || 1}
          totalPages={pagination?.last_page || 1}
        />
      )}
    </InnerPageLayoutWrapper>
  );
}