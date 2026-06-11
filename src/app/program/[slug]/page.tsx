import ReactParser from "@/src/components/common/reactParser/ReactParser";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { getSlug } from "@/src/lib/getSlug"
import Link from "next/link";

export default async function ProgramDetail(){
    const slug = await getSlug();

    const {data, error} = await apiFetch(`program/${slug}`)

    const combinedHtml = Object.values(data?.program_details?.cms ?? {}).join("");

    if(!combinedHtml) return <h1>Loading...</h1>

    // SkeletonGroup

    return (
        <>
            <ReactParserDynamic html={combinedHtml} />
            {data?.department && (
                <Link href={`${BASE_URL}department/${data.department.slug}`} className="btn_styl1 button_strip">Go to {data.department.name}</Link>
            )}
        </>
    );
}