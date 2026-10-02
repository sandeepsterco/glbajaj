import AwardDetail from "@/src/components/awards/detail";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export default async function FacultyDetailPage({params}:{params:Promise<{slug:string; parentSlug:string;}>}){
    const {slug, parentSlug} = await params;

    const [{data, error},{ data: CmsData }, seoData] = await Promise.all([
        apiFetch(`award-recognitions/${slug}`),
        apiFetch(`cms/awards-recognitions`),
        getPageSEO(`${parentSlug}/awards-recognitions/${slug}`),
    ]) ;

    if(error) notFound();

    const pageData = CmsData?.data;
    const modularData = data?.award_details?.data;

    const globalSchemaArgs = {
        canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
        pageTitle: seoData?.title || "",
        metaDescription: seoData?.description || "",
        primaryImageUrl:modularData?.image || '',
        datePublishedIso: pageData?.created_at || "",
        dateModifiedIso: pageData?.updated_at || "",
        languageTag: "en-IN",
        currentPageName: modularData?.title || "",
        currentPageSlug: `${BASE_URL}${parentSlug}/${pageData?.current_page_slug}/${slug}`,
        parentMenus: [
            ...pageData?.parent_menus,
          {
            title: pageData?.page_title,
            url: pageData?.current_page_slug,
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
                <AwardDetail data={data?.award_details} />
        </>
        
    )
}