import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api"
import { getSlug } from "@/src/lib/getSlug"

export default async function ProgramDetail(){
    const slug = await getSlug();

    const {data, error} = await apiFetch(`program/${slug}`)
    const programDetailData = data?.program_details?.cms

    return(
        <>
            {Object.keys(programDetailData).map((key) => {
                return (
                    <ReactParser key={key} html={programDetailData[key]} />
                );
            })}
        </>
    )
}