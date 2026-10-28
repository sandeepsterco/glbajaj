import { apiFetch } from "@/src/lib/api"
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import CompanyLogoSliders from "@/src/components/company_logo/CompanyLogoSliders";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
    params,
  }: {
    params: Promise<{ parentSlug: string }>;
  }) {
    const { parentSlug } = await params;
    return getPageSEO(`${parentSlug}/placement`);
  }

export default async function PlacementPage({
    params,
  }: {
    params: Promise<{ parentSlug: string }>;
  }) {
    const { parentSlug } = await params;
    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`modular/placement`),
        getPageSEO(`${parentSlug}/placement`),
    ]);
    if (error) notFound();

    const combinedHtml = Object.values(data?.data?.cms ?? {}).join("");
    const modularData = data?.data?.modular || {};
    const globalSchema = buildGlobalSchema({
        canonicalUrl: seoData.alternates?.canonical || BASE_URL || "",
        pageTitle: seoData.title || "",
        metaDescription: seoData.description || "",
        primaryImageUrl: "",
        datePublishedIso: data?.data?.created_at || "",
        dateModifiedIso: data?.data?.updated_at || "",
        languageTag: "en-IN",
        currentPageSlug: `${BASE_URL}${parentSlug}/placement`,
        currentPageName: data?.data?.page_title || seoData.title || "",
    });

    return (
        <>
        {seoData.schema && (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
            />
        )}
        {globalSchema && (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
            />
        )}
        <div className="happenings_page">
            <PageHeader data={data?.data} slug={parentSlug} pathname={`/${parentSlug}/placement`} />
            <ReactParserDynamic
                html={combinedHtml}
                pageName={seoData.title}
            />

            {modularData?.['company-logo'] && (
                <CompanyLogoSliders data={modularData?.['company-logo']} />
            )}

        </div>
        </>
    )
}