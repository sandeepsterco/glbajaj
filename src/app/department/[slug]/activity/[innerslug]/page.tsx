import ReactParser from "@/src/components/common/reactParser/ReactParser";
import NoData from "@/src/components/ui/NoData";
import { apiFetch } from "@/src/lib/api"
import { getSlug } from "@/src/lib/getSlug"

export default async function DepartmentActivityDetail(){
    const slug = await getSlug();

    const {data, error} = await apiFetch(`department-activities/${slug}`)
    const CoEsData = data?.department_activities_details?.cms

    if(CoEsData == ''){
        return <NoData />
    }

    return(
        <>
            {Object.keys(CoEsData).map((key) => {
                return (
                    <ReactParser key={key} html={CoEsData[key]} />
                );
            })}
        </>
    )
}