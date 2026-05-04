import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import NotFound from "../../not-found";
import PageHeader from "@/src/components/layout/header/PageHeader";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";

export default async function DepartmentPage(){
    const slug = await getSlug();

    const {data, error} = await apiFetch(`department/${slug}/home`, { cache:'no-store'});

    if(error){
        return <NotFound />;
    }

    return(
        <div className="happenings_page">
            {data?.data?.tabs && (
                <PageHeader data={data.data} slug={slug} showTabs={true} />
            )}

            {data.data.cms.length == 0 ? <ComingSoon /> : (
                Object.keys(data?.data?.cms)?.map((item:any, idx:number)=>(
                    <ReactParser key={idx} html={data?.data?.cms[item]} />
                ))
            )}

            
        </div>
    )
}