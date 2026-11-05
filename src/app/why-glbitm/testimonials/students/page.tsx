import TestimonialListing from "@/src/components/testimonial/TestimonialListing";
import { getPageSEO } from "@/src/lib/seo";
import { redirect } from "next/navigation";

const SEO_PATH = "why-glbitm/testimonials/students";

export async function generateMetadata() {
    return await getPageSEO(SEO_PATH);
}

export default async function TestimonialStudentsPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    const { type } = await searchParams;
    if (type) redirect("/why-glbitm/testimonials");

    return <TestimonialListing typeSlug="students" page={1} seoPath={SEO_PATH} />;
}