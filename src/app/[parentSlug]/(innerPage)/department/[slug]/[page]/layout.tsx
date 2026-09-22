import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";

export default async function InnerPageLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {parentSlug, slug, page} = await params;

    const {data, error} = await apiFetch(`department/${slug}/${page}`);

    if(error) notFound();

    return(
        <div className="happenings_page">
            <PageHeader data={data.data} slug={slug} pathname={`/department/${slug}/${page}`} parentSlug={parentSlug} />
            {data.data.cms.length == 0 ? <ComingSoon /> : children}
        </div>
    )
}