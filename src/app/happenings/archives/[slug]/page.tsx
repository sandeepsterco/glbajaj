import GalleryDetailPage from "@/src/components/gallery/GalleryDetail";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export default async function GalleryDetail({params}:{params:any}){
    const {slug} = await params;

    const [{data, error}, { data: CmsData }, seoData] = await Promise.all([
        apiFetch(`workshops-seminars/${slug}`),
        apiFetch(`cms/archives`),
        getPageSEO(`happenings/archives/${slug}`),
    ]) ;

    if(error) notFound();

    const pageData = CmsData?.data;

    const globalSchemaArgs = {
        canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
        pageTitle:seoData?.title || '',
        metaDescription:seoData?.description || '',
        primaryImageUrl:"",
        datePublishedIso:pageData?.created_at || '',
        dateModifiedIso:pageData?.updated_at || '',
        languageTag:'en-IN',
        currentPageSlug:`${BASE_URL}happenings/archives/${slug}`,
        currentPageName:pageData?.page_title || '',
        parentMenus:[
          {
            title:'Happenings',
            url:"happenings"
          },
          {
            title:'Archives',
            url:"archives"
          },
        ],
      };
    
      const globalSchema = buildGlobalSchema(globalSchemaArgs);

    return(
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
            <GalleryDetailPage gallery_data={data.workshop_details} slug={slug} />
        </>
    )
}