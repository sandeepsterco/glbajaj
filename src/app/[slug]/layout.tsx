import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";

export default async function InnerPageLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {slug} = await params;

    const {data, error} = await apiFetch(`cms/${slug}`, { cache:'no-store'});


    return(
        <div>
            <PageHeader data={data?.data?.tabs} slug={slug} />
            {children}
        </div>
    )
}