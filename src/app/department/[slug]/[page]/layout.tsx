import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/src/config/config";

export default async function InnerPageLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {slug, page} = await params;

    if(page == 'home'){
        return redirect(`${BASE_URL}department/${slug}`);
    }

    const {data, error} = await apiFetch(`department/${slug}/${page}`, { cache:'no-store'});

    if(error){
        return <NotFound />;
    }

    return(
        <div className="happenings_page">
            {data?.data?.tabs && (
                <PageHeader data={data.data} slug={slug} showTabs={true} />
            )}
            {data.data.cms.length == 0 ? <ComingSoon /> : children}
        </div>
    )
}