import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";
import FaqList from "@/src/components/faqs/FaqList";
import { buildFaqSchema } from "@/src/lib/schema/faqSchema";

export async function generateMetadata() {
  return await getPageSEO('faqs');
}

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
    apiFetch(`faqs?page=${currentPage}`),
    apiFetch(`cms/faqs`),
    getPageSEO(`faqs`),
  ]);
  const slug = "faqs";

  if (error) notFound();

  const pagination = data?.faqs;

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
    currentPageSlug: `${BASE_URL}faqs`,
    
  };

  const faqSchemaArgs = {
    pageUrl: `${BASE_URL}faqs`,
    faqs: pagination?.data?.map((item: any) => ({
      question: item.question,
      answer: item.answer,
    })) || [],
  };

  const globalSchema = buildGlobalSchema(globalSchemaArgs); 
  const faqSchema = buildFaqSchema(faqSchemaArgs);

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <InnerPageLayoutWrapper
        slug={slug}
        pathname={`/alumni/testimonials`}
        tabs={null}
        mainClass="happenings_page"
        showTabs={false}
      >
        <FaqList
          data={pagination}
        />
        {/* <PaginationWrapper
                    currentPage={pagination?.current_page || 1}
                    totalPages={pagination?.last_page || 1}
                /> */}
      </InnerPageLayoutWrapper>
    </>
  );
}
