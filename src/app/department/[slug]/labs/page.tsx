import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";

export default async function DepartmentAboutPage() {
    const slug = await getSlug(-2);
    const {data, error} = await apiFetch(`department/${slug}/labs`);

    const cmsSections = data?.data?.cms;

    return(
        Object.keys(cmsSections || {}).map((key:any) => {
            return <ReactParser key={key} html={cmsSections[key]} />;
        })
        // <ReactParser html={section1} />
    )
}