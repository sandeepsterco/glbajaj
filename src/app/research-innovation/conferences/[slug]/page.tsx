import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { ConferenceDetail } from "@/src/components/conference-symposium/ConferenceDetail";
import ConferencesListing from "@/src/components/parser/conferenceLists/ConferencesListing";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound, permanentRedirect } from "next/navigation";

const isNumeric = (s: string) => /^\d+$/.test(s);

export async function generateMetadata() {
    return getPageSEO("research-innovation/conferences/slug");
}

export default async function NewsDetailPage({params, searchParams}:{params:Promise<{slug:string;}>; searchParams: Promise<Record<string, any>>;}){
    const {slug} = await params;

    if (isNumeric(slug)) {
        const page = Number(slug);
        if (page < 1) notFound();
        if (page === 1) permanentRedirect("/research-innovation/conferences");
        return <ConferencesListing page={page} searchParams={(await searchParams) ?? {}} />;
      }


    const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
        apiFetch(`research-conferences/${slug}`),
        apiFetch(`cms/conferences`),
        getPageSEO(`research-innovation/conferences/${slug}`),
    ]);

    if (error) notFound();

    const conferenceData = data?.research_conference_details;

    const pageData = CmsData?.data;
    const modularData = data?.research_conference_details?.data;

    const globalSchemaArgs = {
        canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
        pageTitle: seoData?.title || "",
        metaDescription: seoData?.description || "",
        primaryImageUrl:modularData?.image || '',
        datePublishedIso: pageData?.created_at || "",
        dateModifiedIso: pageData?.updated_at || "",
        languageTag: "en-IN",
        currentPageName: modularData?.title || "",
        currentPageSlug: `${BASE_URL}research-innovation/${pageData?.current_page_slug}/${slug}`,
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
            <ConferenceDetail data={conferenceData} />
        </>
    )
}