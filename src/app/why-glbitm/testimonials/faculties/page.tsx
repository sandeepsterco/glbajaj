import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import TestimonialList from "@/src/components/testimonial/TestimonialList";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound, redirect } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";

export async function generateMetadata() {
  return await getPageSEO('why-glbitm/testimonials');
}

export default async function TestimonialFacultiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  if (type) redirect("/why-glbitm/testimonials");

    const currentSlug = 'testimonials';

    const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
    apiFetch("testimonial?type=Faculties&page=1"),
        apiFetch(`cms/testimonials`),
        getPageSEO('why-glbitm/testimonials'),
    ]);

    if (error) notFound();

    const pagination = data?.testimonials;

    const pageData = CmsData?.data;

    const globalSchemaArgs = {
        canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
        pageTitle:seoData?.title || '',
        metaDescription:seoData?.description || '',
        primaryImageUrl:'',
        datePublishedIso:pageData?.created_at || '',
        dateModifiedIso:pageData?.updated_at || '',
        languageTag:'en-IN',
        currentPageName:pageData?.page_title || '',
        currentPageSlug: `${BASE_URL}why-glbitm/testimonials`,
        parentMenus: [
            ...pageData?.parent_menus,
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
            <InnerPageLayoutWrapper slug={currentSlug}
                pathname={`/why-glbitm/testimonials`} tabs={null} mainClass="happenings_page" showTabs={false}>

                <TestimonialList data={pagination} type="Faculty"  slug="faculties" />


            </InnerPageLayoutWrapper>
        </>
    )
}