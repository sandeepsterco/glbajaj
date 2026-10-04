import { apiFetch } from "@/src/lib/api"
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import CompanyLogoSliders from "@/src/components/company_logo/CompanyLogoSliders";
import { notFound } from "next/navigation";
import { buildImageSchema } from "@/src/lib/schema/imageSchema";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";

export async function generateMetadata() {
  return await getPageSEO('placements/overview');
}

export default async function PlacementPage({
    params,
  }: {
    params: Promise<{ parentSlug: string }>;
  }) {
    const { parentSlug } = await params;
    const [{ data, error }, seoData] = await Promise.all([
      apiFetch(`modular/placements`),
      getPageSEO('placements/overview'),
    ]) ;
    if (error) notFound();

    const combinedHtml = Object.values(data?.data?.cms ?? {}).join("");
    const modularData = data?.data?.modular || {};

    const imageSchemaArgs = {
      imageUrl:'',
      imageTitle:'',
    };

    buildImageSchema(imageSchemaArgs);

    const pageData = data?.data;

    const globalSchemaArgs = {
      canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
      pageTitle:seoData?.title || '',
      metaDescription:seoData?.description || '',
      primaryImageUrl:'',
      datePublishedIso:pageData?.created_at || '',
      dateModifiedIso:pageData?.updated_at || '',
      languageTag:'en-IN',
      currentPageName:pageData?.page_title || '',
      currentPageSlug: `${BASE_URL}placements/overview` || '',
      parentMenus: [
          {
            title: 'Placements',
            url: 'placements',
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
        <div className="happenings_page">
            <PageHeader data={data?.data} slug={parentSlug} pathname={`/${parentSlug}/placement`} />
            <ReactParserDynamic html={combinedHtml} />

            {modularData?.['company-logo'] && (
                <CompanyLogoSliders data={modularData?.['company-logo']} />
            )}

        </div>

      </>
        
    )
}