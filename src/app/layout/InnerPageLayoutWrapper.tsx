// src/components/layout/InnerPageLayoutWrapper.tsx
import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";



export default async function InnerPageLayoutWrapper({ slug, tabs, children, mainClass }: { slug: string; children: React.ReactNode, tabs:any, mainClass:string }) {
    let updatedTabs;
    if(tabs && tabs?.tabs?.length > 0){
        updatedTabs = tabs;
    }else{
        const { data, error } = await apiFetch(`cms/${slug}`, { cache: 'no-store' });
        if (error) return <NotFound />;

        updatedTabs = data?.data?.tabs;
    }


    return (
        <div className={mainClass || ''}>
            <PageHeader data={updatedTabs} slug={slug} />
            {children}
        </div>
    );
}