import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { apiFetch } from "@/src/lib/api";

export default async function AlumniEventsDetailLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ parentSlug: string; slug: string }>;
  }) {
    const { parentSlug, slug } = await params;

    if (!slug) return <>{children}</>;
    const {data, error} = await apiFetch(`alumni-events/${slug}`);

    const currentPageTitle = data?.alumni_event_details?.data?.title;

    return <InnerPageLayoutWrapper slug={slug} pathname={`/\${parentSlug}/alumni-events-meets/\${slug}`} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;

}