import {redirect } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import TestimonialListing from "@/src/components/testimonial/TestimonialListing";

const TYPE_SLUG = "alumni";

export async function generateMetadata() {
  return await getPageSEO("why-glbitm/testimonials");
}

export default async function TestimonialAlumniPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  if (type) redirect("/why-glbitm/testimonials");

  return <TestimonialListing typeSlug={TYPE_SLUG} page={1} />;
}
