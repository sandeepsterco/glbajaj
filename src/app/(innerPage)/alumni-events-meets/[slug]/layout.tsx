// (innerPage)/news-events/layout.tsx
import { getSlug } from "@/src/lib/getSlug";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";

export default async function AlumniEventsDetailLayout({ children }: { children: React.ReactNode }) {
    const slug = await getSlug(-2);

    if (!slug) return <>{children}</>;

    return <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>{children}</InnerPageLayoutWrapper>;

}