import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import FacultyDetail from "@/src/components/faculty/FacultyDetail";
import { apiFetch } from "@/src/lib/api";

export default async function FacultyDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`alumni-testimonial/${slug}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Faculty Detail Page" message={error} />
        )
    }

    return(
        <FacultyDetail data={data?.faculty_details} />
    )
}