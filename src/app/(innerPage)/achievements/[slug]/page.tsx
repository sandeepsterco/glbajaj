import AchievementDetail from "@/src/components/achievement/detail";
import AwardDetail from "@/src/components/awards/detail";
import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api";

export default async function AchievementDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`achivements/${slug}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Achievement Detail Page" message={error} />
        )
    }

    return(
        <AchievementDetail data={data?.achivement_details} />
    )
}