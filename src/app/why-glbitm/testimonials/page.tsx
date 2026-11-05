import TestimonialListing from "@/src/components/testimonial/TestimonialListing";
import { getPageSEO } from "@/src/lib/seo";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return await getPageSEO("why-glbitm/testimonials");
}

export default async function TestimonialPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  if (type) redirect("/why-glbitm/testimonials");

  return (
    <TestimonialListing
      typeSlug="students"
      page={1}
      seoPath="why-glbitm/testimonials"
    />
  );
}
