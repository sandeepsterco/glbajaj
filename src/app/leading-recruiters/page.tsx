import { apiFetch } from "@/src/lib/api"
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import CompanyLogoGrid from "@/src/components/company_logo/CompanyLogoGrid";
import { notFound } from "next/navigation";

const slug = "leading-recruiters";

export default async function PlacementPage() {
    const { data, error } = await apiFetch(`modular/leading-recruiters`);

    if (error) notFound();

    const combinedHtml = Object.values(data?.data?.cms ?? {}).join("");
    const modularData = data?.data?.modular || {};

    return (
        <>
            <PageHeader data={data?.data} slug={slug} pathname={`/${slug}`} />
            <ReactParserDynamic html={combinedHtml} />

            {modularData?.['company-logo'] && (
                <CompanyLogoGrid data={modularData?.['company-logo']} />
            )}

        </>
    )
}