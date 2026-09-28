import AchievementDetail from "@/src/components/achievement/detail";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function AchievementDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`achivements/${slug}`);

    if(error) notFound();

    return(
        <AchievementDetail data={data?.achivement_details} />
    )
}