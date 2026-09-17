import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import '@/src/styles/fancybox.css';
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { BASE_URL } from "@/src/config/config";
import { notFound } from "next/navigation";


export default async function InnerPageLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {parentSlug} = await params;

    const {data, error} = await apiFetch(`cms/${parentSlug}`);

    console.log('cms data',data);

    if(data?.data?.parent_menus?.length > 0){
        return notFound();
    }

    return(
        <div className="happenings_page">
            {data?.sections?.length == 0 ? <ComingSoon /> : children}
            
        </div>
    )
}