import { apiFetch } from "@/src/lib/api"
import NotFound from "../../not-found";
import PageHeader from "@/src/components/layout/header/PageHeader";
import "@/src/styles/inner.css";
import "@/src/styles/program.css";



export default async function ProgramDetailLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {slug} = await params;
    const {data, error} = await apiFetch(`program/${slug}`)

    if(error){
        return <NotFound />;
    }

    const programDetailData = data?.program_details

    const programDetailTab = {
        tab_title: programDetailData?.data?.name ?? "Courses & Admission",
        page_title: programDetailData?.data?.name ?? '',
        tab_group: "facilities-policy",
        active_tab_slug: "facilities-policy",
        // tabs:[
        //     {
        //         "slug": "facilities-policy",
        //         "title": "Programs Offered"
        //       },
        // ]
    }

    return(
        <>
            <PageHeader data={programDetailTab} slug={slug}/>
            {children}
        </>
    )
}