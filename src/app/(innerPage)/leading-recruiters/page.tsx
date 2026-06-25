import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import { getSlug } from "@/src/lib/getSlug";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import CompanyLogoSliders from "@/src/components/company_logo/CompanyLogoSliders";
import CompanyLogoGrid from "@/src/components/company_logo/CompanyLogoGrid";

export default async function PlacementPage() {
    const { data, error } = await apiFetch(`modular/leading-recruiters`);
    const slug = await getSlug();

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Recruiters" message={error} />
        )
    }

    const combinedHtml = Object.values(data?.data?.cms ?? {}).join("");
    const modularData = data?.data?.modular || {};

    return (
        <>
            <PageHeader data={data?.data} slug={slug} />
            <ReactParserDynamic html={combinedHtml} />

            {modularData?.['company-logo'] && (
                <CompanyLogoGrid data={modularData?.['company-logo']} />
            )}

        </>
    )
}