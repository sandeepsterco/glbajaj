// (innerPage)/news-events/layout.tsx
import { getSlug } from "@/src/lib/getSlug";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { apiFetch } from "@/src/lib/api";

export default async function AlumniEventsDetailLayout({ children }: { children: React.ReactNode }) {
    const slug = await getSlug(-2);
    const currentSlug = await getSlug();

    if (!slug) return <>{children}</>;

    const {data, error} = await apiFetch(`alumni-events/${currentSlug}`);

    const currentPageTitle = data?.alumni_event_details?.data?.title;



    return <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;

}