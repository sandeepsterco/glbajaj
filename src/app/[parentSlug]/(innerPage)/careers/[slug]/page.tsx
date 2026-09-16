import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import CopyUrlButton from "@/src/components/common/CopyUrlButton";
import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import Link from "next/link";

export default async function CareerDetailPage({ params }: { params: any }) {
    const { slug } = await params;

    const { data, error } = await apiFetch(`job-openings/${slug}`);

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Career Detail Page" message={error} />
        )
    }

    const careerData = data?.job_opening_details

    return (
        // Object.keys(careerData).map((key:any) => {
        //     return <ReactParser key={key} html={careerData[key]} />;
        //   })

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
    )
}