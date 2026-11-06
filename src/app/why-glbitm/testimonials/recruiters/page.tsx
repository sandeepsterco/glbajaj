import TestimonialListing from "@/src/components/testimonial/TestimonialListing";
import { getPageSEO } from "@/src/lib/seo";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    return await getPageSEO("why-glbitm/testimonials/recruiters");
}

export default async function TestimonialRecruitersPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    const { type } = await searchParams;
    if (type) redirect("/why-glbitm/testimonials");

    return <TestimonialListing typeSlug="recruiters" page={1} />;
}