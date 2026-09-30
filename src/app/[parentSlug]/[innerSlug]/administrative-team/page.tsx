import LeadershipList from "@/src/components/leadership/LeadershipList";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper"
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";

export default async function MessagesAdministrationPage({
    params, 
}: {
    params: Promise<{ parentSlug: string; innerSlug:string; }>;
}) {
    const { parentSlug, innerSlug } = await params;
    const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
        apiFetch(`leadership`),
        apiFetch(`cms/administrative-team`),
        getPageSEO(`${parentSlug}/${innerSlug}/administrative-team`),
    ]) 

    if (error || !data?.status) notFound();

    const pageData = CmsData?.data;

    const globalSchemaArgs = {
        canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
        pageTitle: seoData?.title || "",
        metaDescription: seoData?.description || "",
        primaryImageUrl:'',
        datePublishedIso: pageData?.created_at || "",
        dateModifiedIso: pageData?.updated_at || "",
        languageTag: "en-IN",
        currentPageName: pageData?.page_title || "",
        currentPageSlug: `${BASE_URL}${parentSlug}/${innerSlug}/administrative-team`,
        parentMenus: [
          {
            title: parentSlug,
            url: parentSlug,
          },
          {
            title: innerSlug,
            url: innerSlug,
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
            <InnerPageLayoutWrapper slug={'administrative-team'}
                pathname={`/${parentSlug}/messages-and-administration`}  tabs={null} mainClass="happenings_page" showTabs={true}>
                <LeadershipList data={data} />
            </InnerPageLayoutWrapper>
        </>
    )
}