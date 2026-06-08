import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import '@/src/styles/fancybox.css';
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { BASE_URL } from "@/src/config/config";


export default async function InnerPageLayout({children, params}:Readonly<{children:React.ReactNode, params:any}>){
    const {slug} = await params;

    const {data, error} = await apiFetch(`cms/${slug}`);

    if(error){
        return <NotFound />;
    }

    const parentMenu = data?.data?.parent_menu;

    const breadcrumbs = [
        {
          label: "Home",
          slug: BASE_URL,
        },
        ...(parentMenu
          ? [
              {
                label: parentMenu.title,
                slug: BASE_URL + parentMenu.url,
              },
            ]
          : []),
        {
          label: data?.data?.page_title,
        },
      ];


    return(
        <div className="happenings_page">
            <PageHeader data={data.data} slug={slug} />
            {data.data.sections.length == 0 ? <ComingSoon /> : children}
            
        </div>
    )
}