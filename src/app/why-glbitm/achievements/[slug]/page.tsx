import AchievementsListing from "@/src/components/achievement/AchievementsListing";
import AchievementDetail from "@/src/components/achievement/detail";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound, permanentRedirect } from "next/navigation";

const isNumeric = (s: string) => /^\d+$/.test(s);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (isNumeric(slug)) return await getPageSEO(`why-glbitm/achievements/${slug}`);
  return await getPageSEO(`why-glbitm/achievements/${slug}`);
}

export default async function AchievementDetailPage({params, searchParams}:{params:any; searchParams: Promise<Record<string, any>>;}){
    const {slug} = await params;

    if (isNumeric(slug)) {
      const page = Number(slug);
      if (page < 1) notFound();
      if (page === 1) permanentRedirect("/why-glbitm/achievements");
      return <AchievementsListing page={page} searchParams={(await searchParams) ?? {}} />;
    }

    const [{data, error}, { data: CmsData }, seoData] = await Promise.all([
        apiFetch(`achivements/${slug}`),
        apiFetch(`cms/glb-achievements`),
        getPageSEO(`why-glbitm/achievements/${slug}`),
    ]) ;

    if(error) notFound();

    const pageData = CmsData?.data;
    const modularData = data?.achivement_details?.data;

    const globalSchemaArgs = {
        canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
        pageTitle:seoData?.title || '',
        metaDescription:seoData?.description || '',
        primaryImageUrl:modularData?.image || '',
        datePublishedIso:pageData?.created_at || '',
        dateModifiedIso:pageData?.updated_at || '',
        languageTag:'en-IN',
        currentPageName:modularData?.title || '',
        currentPageSlug: `${BASE_URL}why-glbitm/achievements/${slug}`,
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
        <AchievementDetail data={data?.achivement_details} />
        </>
    )
}