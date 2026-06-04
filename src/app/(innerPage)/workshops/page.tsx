import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import MainWorkshop from "@/src/components/workshop/MainWorkshop";
import WorkshopListing from "@/src/components/workshop/WorkshopListing";
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

export default async function Workshop({
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
    apiFetch(`workshops?${query}`),
    apiFetch("departments"),
  ]);

  if (error) {
    return <ApiErrorFallback heading="Couldn't load Workshop Data" message={error} />;
  }

  const pagination = data?.workshops;
  const mainData = data?.workshops_first ?? null;
  const otherListing: any[] = pagination?.data ?? [];

  const departments: { name: string; slug: string }[] = deptData?.data ?? [];
  const slug = "workshops";

  return (
    <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>
      <MainWorkshop
        data={mainData}
        slug={slug}
        departments={departments}
        currentDepartment={department}
      />
      {otherListing.length > 0 && (
        <WorkshopListing data={otherListing} slug={slug} />
      )}
      <PaginationWrapper
        currentPage={pagination?.current_page || 1}
        totalPages={pagination?.last_page || 1}
      />
    </InnerPageLayoutWrapper>
  );
}