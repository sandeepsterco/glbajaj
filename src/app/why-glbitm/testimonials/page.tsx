import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import TestimonialList from "@/src/components/testimonial/TestimonialList";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound, redirect } from "next/navigation";

export default async function TestimonialPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; type?: string }>;
}) {
    const currentSlug = 'testimonials';
    const { page, type } = await searchParams;
    const activeType = type || "Student";
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (page && Number(page) > 1) params.set("page", String(page));

    const { data, error } = await apiFetch(`testimonial?${params.toString()}`);

    if (error) notFound();

    const pagination = data?.testimonials;

    const hasNoData = !pagination?.data || pagination.data.length === 0;

    if(hasNoData && (type || page)){
        params.delete("type");
        params.delete("page");
        redirect("/why-glbitm/testimonials");
    }

    return (
        <>
            <InnerPageLayoutWrapper slug={currentSlug}
                pathname={`/why-glbitm/testimonials`} tabs={null} mainClass="happenings_page" showTabs={false}>

                <TestimonialList data={pagination} slug={'testimonials'}
                    parentSlug={'why-glbitm'} activeType={activeType} />


            </InnerPageLayoutWrapper>
        </>
    )
}