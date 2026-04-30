import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import Pagination from "@/src/components/common/pagination/Pagination";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import MainNews from "@/src/components/newsEvents/MainNews";
import NewsListing from "@/src/components/newsEvents/NewsListing";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";

export default async function NewsEvent({ searchParams, params }: { searchParams: Promise<{ page?: string }>, params: string }) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const { data, error } = await apiFetch(`news-and-events?page=${currentPage}`);

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load news" message={error} />
        )
    }

    const pagination = data?.news_and_events;
    const mainData = data?.news_and_events_first;
    const otherListing = pagination?.data;

    const slug = 'news-events'

    return (
        <>
            <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>
                <MainNews data={mainData} slug={slug} />
                {otherListing?.length > 0 && (
                    <NewsListing data={otherListing} slug={slug} />
                )}
                <PaginationWrapper
                    currentPage={pagination?.current_page || 1}
                    totalPages={pagination?.last_page || 1}
                />
            </InnerPageLayoutWrapper>
        </>
    )
}