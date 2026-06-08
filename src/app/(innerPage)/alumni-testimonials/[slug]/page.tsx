import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import TestimonialDetail from "@/src/components/testimonial/TestimonialDetail";
import { apiFetch } from "@/src/lib/api";

export default async function TestimonialDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`testimonial/${slug}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Faculty Detail Page" message={error} />
        )
    }

    return(
        <TestimonialDetail data={data?.alumni_testimonial_details} />
    )
}