import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import TestimonialList from "@/src/components/testimonial/TestimonialList";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";

export async function generateMetadata() {
  return await getPageSEO('alumni/testimonials');
}

export default async function TestimonialPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
    apiFetch(`testimonial?type=Alumni&page=${currentPage}`),
    apiFetch(`cms/testimonials`),
    getPageSEO(`alumni/testimonials`),
  ]);
  const slug = "alumni-testimonials";

  if (error) notFound();

  const pagination = data?.testimonials;

  const pageData = CmsData?.data;

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: "",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: pageData?.page_title || "",
    currentPageSlug: `${BASE_URL}alumni/testimonials`,
    parentMenus: [
      {
        title: "Alumni",
        url: "alumni",
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
      <InnerPageLayoutWrapper
        slug={slug}
        pathname={`/alumni/testimonials`}
        tabs={null}
        mainClass="happenings_page"
        showTabs={false}
      >
        <TestimonialList
          data={pagination}
          currentPage="alumni-testimonials"
        />
        {/* <PaginationWrapper
                    currentPage={pagination?.current_page || 1}
                    totalPages={pagination?.last_page || 1}
                /> */}
      </InnerPageLayoutWrapper>
    </>
  );
}
