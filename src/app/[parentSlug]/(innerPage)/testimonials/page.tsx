import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import TestimonialList from "@/src/components/testimonial/TestimonialList";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function TestimonialPage({
    params,
    searchParams,
}: {
    params: Promise<{ parentSlug: string }>;
    searchParams: Promise<{ page?: string; type?: string }>;
}) {
    const { parentSlug } = await params;
    const { page, type } = await searchParams;
    const currentPage = Number(page) || 1;
    const activeType = type || "student";
    const { data, error } = await apiFetch(`testimonial?type=${activeType}&page=${currentPage}`);


    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Faculty" message={error} />
        )
    }

    const pagination = data?.testimonials;

    return (
        <>
            <InnerPageLayoutWrapper slug={parentSlug}
                pathname={`/${parentSlug}/testimonials`} tabs={null} mainClass="happenings_page" showTabs={false}>

                <TestimonialList data={pagination} slug={parentSlug}
                    parentSlug={parentSlug} activeType={activeType} />


            </InnerPageLayoutWrapper>
        </>
    )
}