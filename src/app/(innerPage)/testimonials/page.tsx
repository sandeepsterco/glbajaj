import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import { getSlug } from "@/src/lib/getSlug";
import TestimonialList from "@/src/components/testimonial/TestimonialList";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function TestimonialPage({ searchParams }: { searchParams: Promise<{ page?: string; type?: string }> }) {
    const { page, type } = await searchParams;
    const currentPage = Number(page) || 1;
    const activeType = type || "student";
    const { data, error } = await apiFetch(`testimonial?type=${activeType}&page=${currentPage}`);
    const slug = await getSlug();

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Faculty" message={error} />
        )
    }

    const pagination = data?.testimonials;

    return (
        <>
            <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={false}>

                <TestimonialList data={pagination} slug={slug} activeType={activeType} />
                

            </InnerPageLayoutWrapper>
        </>
    )
}