import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import { getSlug } from "@/src/lib/getSlug";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import CompanyLogoSliders from "@/src/components/company_logo/CompanyLogoSliders";

export default async function PlacementPage() {
    const { data, error } = await apiFetch(`modular/placement`);
    const slug = await getSlug();

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Faculty" message={error} />
        )
    }

    const combinedHtml = Object.values(data?.data?.cms ?? {}).join("");
    const modularData = data?.data?.modular || {};

    return (
        <>
            <PageHeader data={data?.data} slug={slug} />
            <ReactParserDynamic html={combinedHtml} />

            {modularData?.['company-logo'] && (
                <CompanyLogoSliders data={modularData?.['company-logo']} />
            )}

        </>
    )
}