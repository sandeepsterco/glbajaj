import { apiFetch } from "@/src/lib/api"
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import CompanyLogoSliders from "@/src/components/company_logo/CompanyLogoSliders";
import { notFound } from "next/navigation";

export default async function PlacementPage({
    params,
  }: {
    params: Promise<{ parentSlug: string }>;
  }) {
    const { parentSlug } = await params;
    const { data, error } = await apiFetch(`modular/placements`);
    if (error) notFound();

    const combinedHtml = Object.values(data?.data?.cms ?? {}).join("");
    const modularData = data?.data?.modular || {};

    return (
        <div className="happenings_page">
            <PageHeader data={data?.data} slug={parentSlug} pathname={`/${parentSlug}/placement`} />
            <ReactParserDynamic html={combinedHtml} />

            {modularData?.['company-logo'] && (
                <CompanyLogoSliders data={modularData?.['company-logo']} />
            )}

        </div>
    )
}