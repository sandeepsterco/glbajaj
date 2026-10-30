import AlumniAchievementDetail from "@/src/components/alumni-achievement/AlumniAchievementDetail";
import AwardDetail from "@/src/components/awards/detail";
import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return await getPageSEO(`alumni/achievements/${slug}`);
}

export default async function FacultyDetailPage({ params }: { params: any }) {
    const { slug } = await params;

    const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
        apiFetch(`alumni-achivement/${slug}`),
        apiFetch(`cms/achievements`),
        getPageSEO(`alumni/achievements/${slug}`),
    ])

    if (error) notFound();

    const pageData = CmsData?.data;
    const modularData = data?.alumni_achivement_details?.data;

    const globalSchemaArgs = {
        canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
        pageTitle: seoData?.title || "",
        metaDescription: seoData?.description || "",
        primaryImageUrl: modularData?.image || '',
        datePublishedIso: pageData?.created_at || "",
        dateModifiedIso: pageData?.updated_at || "",
        languageTag: "en-IN",
        currentPageName: modularData?.name || "",
        currentPageSlug: `${BASE_URL}alumni/achievements/${slug}` || '',
        parentMenus: [
            {
                title: "Alumni",
                url: "alumni",
            },
            {
                title: "Achievements",
                url: "achievements",
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
            <AlumniAchievementDetail data={data?.alumni_achivement_details} />
            {/* <AwardDetail data={data?.award_details} /> */}
        </>
    )
}