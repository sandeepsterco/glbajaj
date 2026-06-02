import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import Pagination from "@/src/components/common/pagination/Pagination";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import MainWorkshop from "@/src/components/workshop/MainWorkshop";
import WorkshopListing from "@/src/components/workshop/WorkshopListing";
import { getSlug } from "@/src/lib/getSlug";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function NewsEvent({ searchParams, params }: { searchParams: Promise<{ page?: string }>, params: string }) {
    const slug = await getSlug();
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const { data, error } = await apiFetch(`workshops?page=${currentPage}`);

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Workshop Data" message={error} />
        )
    }

    const pagination = data?.workshops;
    const mainData = data?.workshops_first;
    const otherListing = pagination?.data;

    return (
        <>
            <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>
                <MainWorkshop data={mainData} slug={slug} />
                {otherListing?.length > 0 && (
                    <WorkshopListing data={otherListing} slug={slug} />
                )}
                <PaginationWrapper
                    currentPage={pagination?.current_page || 1}
                    totalPages={pagination?.last_page || 1}
                />
            </InnerPageLayoutWrapper>
        </>
    )
}