import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/src/config/config";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/parser.css";

export default async function InnerPageLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {slug, page} = await params;

    const {data, error} = await apiFetch(`department/${slug}/${page}`);

    if(error){
        return <NotFound />;
    }

    return(
        <div className="happenings_page">
                <PageHeader data={data.data} slug={slug}  />
            {data.data.cms.length == 0 ? <ComingSoon /> : children}
        </div>
    )
}