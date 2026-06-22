import NotFound from "@/src/app/not-found";
import ReactParser from "@/src/components/common/reactParser/ReactParser";
import PageHeader from "@/src/components/layout/header/PageHeader";
import NoData from "@/src/components/ui/NoData";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";

export default async function DepartmentAboutPage() {
    const slug = await getSlug(-2);
    const {data, error} = await apiFetch(`department/${slug}/research`);

    const cmsSections = data?.data?.cms;

    if(error){
        return <NotFound />;
    }

    if(cmsSections?.length == 0){
        return <NoData />;
    }

    return(
        <>
            <PageHeader data={data?.data} slug={slug} />
            {cmsSections?.map((item:any) => {
                return <ReactParser key={item.id} html={item.cms} />;
            })}
        </>
        // <ReactParser html={section1} />
    )
}