import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api"
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import CompanyLogoSliders from "@/src/components/company_logo/CompanyLogoSliders";

export default async function PlacementPage({
    params,
  }: {
    params: Promise<{ parentSlug: string }>;
  }) {
    const { parentSlug } = await params;
    const { data, error } = await apiFetch(`modular/placement`);
    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Faculty" message={error} />
        )
    }

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