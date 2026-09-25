import TestimonialDetail from "@/src/components/testimonial/TestimonialDetail";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function TestimonialDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`testimonial/${slug}`);

    if(error) notFound();

    return(
        <TestimonialDetail data={data?.alumni_testimonial_details} />
    )
}