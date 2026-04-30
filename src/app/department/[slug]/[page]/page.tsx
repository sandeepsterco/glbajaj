import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";

export default async function DepartmentInnerPage(){
    const slug = await getSlug();


    return(
        <h1>Department Inner page</h1>
    )
}