import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";

export default async function InnerPageLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {slug, page} = await params;

    const {data, error} = await apiFetch(`department/${slug}/achievements`);

    if(error){
        return <NotFound />;
    }

    const pageData = data?.data?.modular?.achivements;

    return(
        <div className="happenings_page">
            {data?.data?.tabs && (
                <PageHeader data={data.data} slug={slug}  />
            )}
            {pageData.length == 0 ? <ComingSoon /> : children}
        </div>
    )
}