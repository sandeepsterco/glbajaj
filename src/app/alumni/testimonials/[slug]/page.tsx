import TestimonialDetail from "@/src/components/testimonial/TestimonialDetail";
import TestimonialListing from "@/src/components/testimonial/TestimonialListing";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound, permanentRedirect } from "next/navigation";

const isNumeric = (s: string) => /^\d+$/.test(s);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (isNumeric(slug)) return await getPageSEO(`alumni/testimonials/${slug}`);
  return await getPageSEO(`alumni/testimonials/${slug}`);
}

export default async function TestimonialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (isNumeric(slug)) {
    const page = Number(slug);
    if (page < 1) notFound();
    if (page === 1) permanentRedirect("/alumni/testimonials");
    return (
      <TestimonialListing
        typeSlug="alumni"
        page={page}
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

  // detail page (unchanged)
  const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
    apiFetch(`testimonial/${slug}`),
    apiFetch(`cms/testimonials`),
    getPageSEO(`alumni/testimonials/${slug}`),
  ]);

  if (error) notFound();

  const pageData = CmsData?.data;
  const modularData = data?.testimonial_details?.data;

  const globalSchema = buildGlobalSchema({
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: modularData?.image || "",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: modularData?.name || "",
    currentPageSlug: `${BASE_URL}alumni/testimonials/${slug}`,
    parentMenus: [
      { title: "Alumni", url: "alumni" },
      { title: "Testimonials", url: "testimonials" },
    ],
  });

  return (
    <>
      {seoData?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
        />
      )}
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}
      <TestimonialDetail data={data?.testimonial_details} />
    </>
  );
}