import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api"
import { getSlug } from "@/src/lib/getSlug"

export default async function DepartmentLabsDetail(){
    const slug = await getSlug();

    const {data, error} = await apiFetch(`ceo-and-activity-level/${slug}`)
    const CoEsData = data?.ceoAndAdvanceLevelDetail?.cms

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