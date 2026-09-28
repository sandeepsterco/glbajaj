import { apiFetch } from "@/src/lib/api";
import ApplyNowForm from "./ApplyNowForm";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";
import { notFound } from "next/navigation";

export default async function CareerFormPage({ params }: { params: any }) {
    const { slug } = await params;

    const { data, error } = await apiFetch(`job-openings/${slug}`);

    if (error) notFound();

    const careerData = data?.job_opening_details

    return (
        // Object.keys(careerData).map((key:any) => {
        //     return <ReactParser key={key} html={careerData[key]} />;
        //   })

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
    )
}