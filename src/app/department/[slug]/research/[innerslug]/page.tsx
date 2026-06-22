import NotFound from "@/src/app/not-found";
import ReactParser from "@/src/components/common/reactParser/ReactParser";
import NoData from "@/src/components/ui/NoData";
import { apiFetch } from "@/src/lib/api"
import { getSlug } from "@/src/lib/getSlug"

export default async function DepartmentLabsDetail(){
    const slug = await getSlug();

    const {data, error} = await apiFetch(`research/${slug}`)
    const researchData = data?.research_details?.cms

    if(error){
        return <NotFound />;
    }

    if(Object.keys(researchData).length == 0){
        return <NoData />;
    }

    return(
        <>
            {Object.keys(researchData).map((key) => {
                return (
                    <ReactParser key={key} html={researchData[key]} />
                );
            })}
        </>
    )
}