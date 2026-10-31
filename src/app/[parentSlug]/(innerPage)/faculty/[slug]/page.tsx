import FacultyDetail from "@/src/components/faculty/FacultyDetail";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{parentSlug:string; slug: string }>;
}) {
  const { slug, parentSlug } = await params;
  return await getPageSEO(`${parentSlug}/faculty/${slug}`);
}

export default async function FacultyDetailPage({params}:{params:any}){
    const {slug, parentSlug} = await params;

    const [{data, error}, seoData] = await Promise.all([
        apiFetch(`faculty/${slug}`),
        getPageSEO(`${parentSlug}/faculty/${slug}`)
    ]);

    if(error) notFound();

    const globalSchemaArgs = {
        canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
        pageTitle:seoData?.title || '',
        metaDescription:seoData?.description || '',
        primaryImageUrl:"",
        datePublishedIso:data?.created_at || '',
        dateModifiedIso:data?.updated_at || '',
        languageTag:'en-IN',
        currentPageSlug:'',
        currentPageName:data?.page_title || ''
      };

    const globalSchema = buildGlobalSchema(globalSchemaArgs);

    return(
        <>
            {seoData.schema && (
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
            <FacultyDetail data={data?.faculty_details} pageName={seoData?.title} />
        </>
    )
}