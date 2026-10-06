import CopyUrlButton from "@/src/components/common/CopyUrlButton";
import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildJobPostingSchema } from "@/src/lib/schema/careerDetailSchema";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({params}:{params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  return await getPageSEO(`careers/${slug}`);
}

export default async function CareerDetailPage({ params }: { params: any }) {
    const { slug } = await params;

    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`job-openings/${slug}`),
        getPageSEO(`careers/${slug}`),
    ]) 

    if (error) notFound();

    const careerData = data?.job_opening_details;

    const careerSchemaArgs = {
        jobUrl:`${BASE_URL}careers/${slug}` || '',
        jobTitle:careerData?.data?.title || '',
        visibleFullJobDescriptionHtml:careerData?.cms?.career_detail || '',
        datePostedIso:'',
        validThroughIso:'',
        employmentType:'',

    };

    const careerSchema = buildJobPostingSchema(careerSchemaArgs);

    const globalSchemaArgs = {
        canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
        pageTitle:seoData?.title || '',
        metaDescription:seoData?.description || '',
        primaryImageUrl:"",
        datePublishedIso:careerData?.created_at || '',
        dateModifiedIso:careerData?.updated_at || '',
        languageTag:'en-IN',
        currentPageSlug:`${BASE_URL}careers/${slug}`,
        currentPageName:careerData?.data?.title || '',
        parentMenus:[
          {
            title:'Careers',
            url:"careers"
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
            {careerSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(careerSchema) }}
                />
            )}
            <section className="current-openings">
                <div className="container25">

                {careerData?.data?.title && (
                    <div className="job-heading career_headings">
                        <h3 className="font36">{careerData?.data?.title}</h3>
                        <CopyUrlButton />
                    </div>
                )}
                    

                    <div className="job-desc">

                        <div className="job_de_titl">
                            {careerData?.data?.departments && (
                                <div className="jobitl_lft">
                                    <h3 className="font24">Department</h3>
                                    <p>{careerData?.data?.departments[0]?.name ?? "N/A"}</p>
                                </div>
                            )}

                            {careerData?.data?.title && (
                                <div className="jobitl_rgt">
                                    <h3 className="font24">Recruitment</h3>
                                    <p>{careerData?.data?.title}</p>
                                </div>
                            )}

                        </div>

                        {Object.keys(careerData?.cms).map((key) => {
                            return <ReactParser key={key} html={careerData.cms[key]} />;
                        })}

                        <div className="btns">
                            <Link href={`${BASE_URL}careers/${slug}/apply-now`} className="apply_btn">Apply Now</Link>
                            {careerData?.data?.pdf && (
                                <Link href={careerData?.data?.pdf} target="_blank" className="apply_btn">PDF</Link>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}