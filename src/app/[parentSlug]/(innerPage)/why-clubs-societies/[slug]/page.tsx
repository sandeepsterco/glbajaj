import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function PlacementDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`clubs-societies/${slug}`);

    if(error) notFound();

    const whyClubDetailData = data?.club_or_society_details?.cms ?? {};

    return(
        Object.keys(whyClubDetailData).map((key:any) => {
            return <ReactParser key={key} html={whyClubDetailData[key]} />;
          })
    )
}