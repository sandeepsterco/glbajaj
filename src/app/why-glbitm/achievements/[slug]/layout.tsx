import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { apiFetch } from "@/src/lib/api";

export default async function MessageDetailLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
  }) {
    const { slug } = await params;
    if (!slug) return <>{children}</>;
    const {data} = await apiFetch(`achivements/${slug}`);

    const currentPageTitle = data?.achivement_details?.data?.title;

    const customTabs = {
      menu_title:'Achievements',
      tabs:[
        {
        "title": "Why GLBITM",
        "slug": "why-glbitm"
        }
      ]
    }

    return <InnerPageLayoutWrapper slug={'achievements'} pathname={`/why-glbitm/achievements/${slug}`} parentSlug="why-glbitm" tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle} customTabs={customTabs}>{children}</InnerPageLayoutWrapper>;

}