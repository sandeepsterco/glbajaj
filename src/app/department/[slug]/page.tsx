import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import NotFound from "../../not-found";
import PageHeader from "@/src/components/layout/header/PageHeader";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";

// import '@/src/styles/fancybox.css';
import "@/src/styles/inner.css";
// import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
// import "@/src/styles/parser.css";

export default async function DepartmentPage(){
    const slug = await getSlug();

    const {data, error} = await apiFetch(`department/${slug}/home`);

    if(error){
        return <NotFound />;
    }

    const combinedHtml = data?.data?.cms
    ? Object.values(data?.data?.cms).join("")
    : "";

    return(
        <div className="happenings_page">
            {data?.data?.tabs && (
                <PageHeader data={data.data} slug={slug} />
            )}

            {data.data.cms.length == 0 ? <ComingSoon /> : (
                <ReactParserDynamic html={combinedHtml} />
            )}

            
        </div>
    )
}