import TestimonialListing from "@/src/components/testimonial/TestimonialListing";
import { getPageSEO } from "@/src/lib/seo";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return await getPageSEO("alumni/testimonials");
}

export default async function TestimonialPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const legacyPage = Number(page);
  if (legacyPage > 1) redirect(`/alumni/testimonials/${legacyPage}`);

  return (
    <TestimonialListing
      typeSlug="alumni"
      page={1}
      seoPath="alumni/testimonials"
      basePath="/alumni/testimonials"
      layoutSlug="alumni-testimonials"
      pathname="/alumni/testimonials"
      parentSlug={null}
      showTabs={false}
      parentMenus={[{ title: "Alumni", url: "alumni" }]}
    />
  );
}