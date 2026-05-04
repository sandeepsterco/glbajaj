import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";

export default async function DepartmentInnerPage(){
    const slug = await getSlug(-2);
    const page = await getSlug(-1);

    const { data, error } = await apiFetch(`department/${slug}/${page}`);

    const pageData = data?.data?.cms

    return(
        <>
            {Object.keys(pageData || []).map((key) => {
                return <ReactParser key={key} html={pageData[key]} />;
            })}
        </>
    )
}