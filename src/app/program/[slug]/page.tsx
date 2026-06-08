import ReactParser from "@/src/components/common/reactParser/ReactParser";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { apiFetch } from "@/src/lib/api"
import { getSlug } from "@/src/lib/getSlug"

export default async function ProgramDetail(){
    const slug = await getSlug();

    const {data, error} = await apiFetch(`program/${slug}`)

    const combinedHtml = Object.values(data?.program_details?.cms ?? {}).join("");

    if(!combinedHtml) return <h1>Loading...</h1>

    // SkeletonGroup

    return <ReactParserDynamic html={combinedHtml} />;
}