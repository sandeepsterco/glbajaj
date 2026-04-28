// (innerPage)/news-events/layout.tsx
import { getSlug } from "@/src/lib/getSlug";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";

export default async function NewsEventsLayout({ children }: { children: React.ReactNode }) {
    const slug = await getSlug();

    if (!slug) return <>{children}</>;

    return <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>{children}</InnerPageLayoutWrapper>;
}