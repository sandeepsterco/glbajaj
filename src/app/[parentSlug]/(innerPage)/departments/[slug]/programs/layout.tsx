import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import { notFound } from "next/navigation";

export default async function InnerPageLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {slug, page} = await params;

    const {data, error} = await apiFetch(`department/${slug}/programs`);

    if(error){
        return notFound();
    }

    return(
        <div className="happenings_page">
                <PageHeader pathname={`/department/${slug}/programs`} data={data.data} slug={slug} />
            {(data.data.cms.length == 0 && Object.keys(data.data.modular).length == 0) ? <ComingSoon /> : children}
            {/* {children} */}
        </div>
    )
}