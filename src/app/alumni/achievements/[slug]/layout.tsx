import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { apiFetch } from "@/src/lib/api";

export default async function AlumniAchievementsLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ parentSlug: string; slug: string }>;
  }) {
    const { parentSlug, slug } = await params;
    const currentSlug = 'achievements';

    const {data, error} = await apiFetch(`alumni-achivement/${slug}`)
    const currentPageTitle = data?.alumni_achivement_details?.data?.name;

    return <InnerPageLayoutWrapper slug={currentSlug} pathname={`/alumni/${currentSlug}/${slug}`} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;

    // return(
    //   <div className="innertest">{children}</div>
    // )

}