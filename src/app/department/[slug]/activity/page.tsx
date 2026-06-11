import NotFound from "@/src/app/not-found";
import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";

export default async function DepartmentActivityPage() {
    const slug = await getSlug(-2);
    const {data, error} = await apiFetch(`department/${slug}/activity`);

    const cmsSections = data?.data?.cms;

    if(cmsSections?.length == 0){
        return <NotFound />
    } ;

    return(
        Object.keys(cmsSections || {}).map((key:any) => {
            return <ReactParser key={key} html={cmsSections[key]} />;
        })
        // <ReactParser html={section1} />
    )
}