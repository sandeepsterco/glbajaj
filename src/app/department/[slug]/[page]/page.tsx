import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";

export default async function DepartmentInnerPage(){
    const slug = await getSlug(-2);
    const page = await getSlug(-1);

    const { data, error } = await apiFetch(`department/${slug}/${page}`);

    const combinedHtml = data?.data?.cms
    ? Object.values(data?.data?.cms).join("")
    : "";

    return <ReactParserDynamic html={combinedHtml} />;
    
}