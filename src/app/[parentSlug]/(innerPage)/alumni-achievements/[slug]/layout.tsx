import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { apiFetch } from "@/src/lib/api";

export default async function AlumniAchievementsDetailLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ parentSlug: string; slug: string }>;
  }) {
    const { parentSlug, slug } = await params;

    if (!parentSlug) return <>{children}</>;

    const {data, error} = await apiFetch(`alumni-achivement/${slug}`)
    const currentPageTitle = data?.alumni_achivement_details?.data?.name;

    return <InnerPageLayoutWrapper slug={slug} pathname={`/\${parentSlug}/alumni-achievements/\${slug}`} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;

}