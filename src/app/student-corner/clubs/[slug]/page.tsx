import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return getPageSEO(`student-corner/clubs/${slug}`);
}

export default async function PlacementDetailPage({params}:{params:Promise<{slug:string;}>}){
    const {slug} = await params;

    const [{data, error},{ data: CmsData }, seoData] = await Promise.all([
        apiFetch(`clubs-societies/${slug}`),
        apiFetch(`cms/clubs`),
        getPageSEO(`student-corner/clubs/${slug}`),
    ]);

    if(error) notFound();

    const pageData = CmsData?.data;
    const modularData = data?.club_or_society_details?.data;

    const whyClubDetailData = data?.club_or_society_details?.cms ?? {};

    const globalSchemaArgs = {
        canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
        pageTitle: seoData?.title || "",
        metaDescription: seoData?.description || "",
        primaryImageUrl:modularData?.image || '',
        datePublishedIso: pageData?.created_at || "",
        dateModifiedIso: pageData?.updated_at || "",
        languageTag: "en-IN",
        currentPageName: modularData?.title || "",
        currentPageSlug: `${BASE_URL}student-corner/${pageData?.current_page_slug}/${slug}`,
        parentMenus: [
            ...(pageData?.parent_menus ?? []),
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
                {Object.keys(whyClubDetailData).map((key:any) => {
                    return <ReactParser key={key} html={whyClubDetailData[key]} />;
                })}
        </>
        
    )
}