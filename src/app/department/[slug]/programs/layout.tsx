import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";

export default async function InnerPageLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {slug, page} = await params;

    const {data, error} = await apiFetch(`department/${slug}/programs`, { cache:'no-store'});

    if(error){
        return <NotFound />;
    }

    return(
        <div className="happenings_page">
            {data?.data?.tabs && (
                <PageHeader data={data.data} slug={slug} />
            )}
            {(data.data.cms.length == 0 && Object.keys(data.data.modular).length == 0) ? <ComingSoon /> : children}
            {/* {children} */}
        </div>
    )
}