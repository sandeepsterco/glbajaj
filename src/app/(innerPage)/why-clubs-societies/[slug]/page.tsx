import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";

export default async function PlacementDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`clubs-societies/${slug}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Clubs & Societies Detail Page" message={error} />
        )
    }

    const whyClubDetailData = data?.club_or_society_details?.cms

    return(
        Object.keys(whyClubDetailData).map((key:any) => {
            return <ReactParser key={key} html={whyClubDetailData[key]} />;
          })
    )
}