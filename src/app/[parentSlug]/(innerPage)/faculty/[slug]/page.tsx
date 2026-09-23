import FacultyDetail from "@/src/components/faculty/FacultyDetail";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function FacultyDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`faculty/${slug}`);

    if(error) notFound();

    return(
        <FacultyDetail data={data?.faculty_details} />
    )
}