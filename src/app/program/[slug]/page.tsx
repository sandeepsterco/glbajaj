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

    return (
        <>
            <ReactParserDynamic html={combinedHtml} />
            {data?.department && (
                <div className="program_strip">
                    <div className="container25">
                        <div className="content">
                            <p>Learn More About the {data.department.name}</p>
                            <Link href={`${BASE_URL}department/${data.department.slug}`} className="arrow_btn button_strip">
                                <img src='/images/home/slide_arrow_right.svg' />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}