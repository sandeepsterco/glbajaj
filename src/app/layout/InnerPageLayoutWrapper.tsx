// src/components/layout/InnerPageLayoutWrapper.tsx
import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function InnerPageLayoutWrapper({ slug, pathname, tabs, children, mainClass, showTabs, currentPageTitle }: { slug: string; pathname: string; children: React.ReactNode, tabs:any, mainClass:string, showTabs:boolean, currentPageTitle?:string }) {

    let updatedTabs;
    if(tabs && tabs?.tabs?.length > 0){
        updatedTabs = tabs;
    }else{
        const { data, error } = await apiFetch(`cms/${slug}`);
        if (error) notFound();

        updatedTabs = data?.data;
    }

    return (
        <div className={mainClass || ''}>
            {updatedTabs && (
            <PageHeader data={updatedTabs} slug={slug} currentPageTitle={currentPageTitle} pathname={pathname} />
            )}
            {children}
        </div>
    );
}