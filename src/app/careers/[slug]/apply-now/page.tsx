import { apiFetch } from "@/src/lib/api";
import ApplyNowForm from "./ApplyNowForm";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({params}:{params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  return await getPageSEO(`careers/${slug}/apply-now`);
}


export default async function CareerFormPage({ params }: { params: any }) {
    const { slug } = await params;

    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`job-openings/${slug}`),
        getPageSEO(`careers/${slug}/apply-now`),
    ]) 

    if (error) notFound();

    const careerData = data?.job_opening_details;

    const globalSchemaArgs = {
        canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
        pageTitle:seoData?.title || '',
        metaDescription:seoData?.description || '',
        primaryImageUrl:"",
        datePublishedIso:careerData?.created_at || '',
        dateModifiedIso:careerData?.updated_at || '',
        languageTag:'en-IN',
        currentPageSlug:`${BASE_URL}careers/${slug}/apply-now`,
        currentPageName:`${careerData?.data?.title} - Apply Now` || '',
        parentMenus:[
          {
            title:'Careers',
            url:"careers"
          },
          {
            title:careerData?.data?.title,
            url:slug
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
            <section className="career_form">
                <div className="container25">
                    <div className="career_headings">
                        {careerData?.data?.title && (
                            <h4 className="font36">{careerData?.data?.title}</h4>
                        )}
                        <Link className="apply_btn" href={`${BASE_URL}careers`}><i className="bi bi-arrow-left" style={{marginRight: '1rem'}}></i>Back</Link>
                    </div>
                    <ApplyNowForm openingName={careerData?.data?.title ?? ""} />
                </div>
            </section>
        </>
        
    )
}