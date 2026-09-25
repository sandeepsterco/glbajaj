import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import TestimonialList from "@/src/components/testimonial/TestimonialList";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";

export default async function TestimonialPage({
    params,
    searchParams,
  }: {
    params: Promise<{ parentSlug: string }>;
    searchParams: Promise<{ page?: string }>;
  }) {
    const { parentSlug } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const { data, error } = await apiFetch(`testimonial?type=Alumni&page=${currentPage}`);
    const slug = "alumni-testimonials";

    if (error) notFound();

    const pagination = data?.testimonials;

    return (
        <>
            <InnerPageLayoutWrapper slug={slug} pathname={`/${parentSlug}/alumni-testimonials`} tabs={null} mainClass="happenings_page" showTabs={false}>
                <TestimonialList data={pagination} parentSlug={parentSlug} slug={slug} activeType="alumni" currentPage="alumni-testimonials"/>
                {/* <PaginationWrapper
                    currentPage={pagination?.current_page || 1}
                    totalPages={pagination?.last_page || 1}
                /> */}
            </InnerPageLayoutWrapper>
        </>
    )
}