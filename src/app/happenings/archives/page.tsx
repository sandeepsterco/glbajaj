import GalleryList from "@/src/components/gallery/GalleryList";
import MainGallery from "@/src/components/gallery/MainGallery";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { BASE_URL } from "@/src/config/config";

export async function generateMetadata() {
  return await getPageSEO('happenings/archives');
}

export default async function ArchivePage({
    searchParams,
  }: {
    searchParams: Promise<{ page?: string }>;
  }){
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentSlug = 'archives'

  const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
    apiFetch(`archive?page=${currentPage}`),
    apiFetch(`cms/archives`),
    getPageSEO(`happenings/archives`),
  ]);

  if (error)  notFound();

  const pageData = CmsData?.data;

  const globalSchemaArgs = {
    canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
    pageTitle:seoData?.title || '',
    metaDescription:seoData?.description || '',
    primaryImageUrl:"",
    datePublishedIso:pageData?.created_at || '',
    dateModifiedIso:pageData?.updated_at || '',
    languageTag:'en-IN',
    currentPageSlug:`${BASE_URL}happenings/archives`,
    currentPageName:pageData?.page_title || '',
    parentMenus:[
      {
        title:'Happenings',
        url:"happenings"
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
        slug={currentSlug}
        pathname={`/happenings/archives`}
        tabs={null}
        mainClass="happenings_page"
        showTabs={true}
      >
        <MainGallery data={data?.featured} currentPage="archives" parentSlug="happenings" />
        <GalleryList data={data?.others} currentPage="archives" parentSlug="happenings" />
      </InnerPageLayoutWrapper>
    </>
    
  );
}