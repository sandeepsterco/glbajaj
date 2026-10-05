import TestimonialDetail from "@/src/components/testimonial/TestimonialDetail";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export default async function TestimonialDetailPage({
  params,
}: {
  params: any;
}) {
  const { slug } = await params;

  const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
    apiFetch(`testimonial/${slug}`),
    apiFetch(`cms/testimonials`),
    getPageSEO(`alumni/testimonials/${slug}`),
  ]);

  if (error) notFound();

  const pageData = CmsData?.data;
  const modularData = data?.testimonial_details?.data;

  const globalSchemaArgs = {
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
      {
        title: "Alumni",
        url: "alumni",
      },
      {
        title: "Testimonials",
        url: "testimonials",
      },
    ],
  };

  const globalSchema = buildGlobalSchema(globalSchemaArgs);

  return (
    <>
      {seoData?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.schema),
          }}
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
