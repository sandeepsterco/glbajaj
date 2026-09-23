import AlumniAchievementDetail from "@/src/components/alumni-achievement/AlumniAchievementDetail";
import AwardDetail from "@/src/components/awards/detail";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function FacultyDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`alumni-achivement/${slug}`);

    if(error) notFound();

    return(
        <>
            <AlumniAchievementDetail data={data?.alumni_achivement_details} />
            {/* <AwardDetail data={data?.award_details} /> */}
        </>
    )
}