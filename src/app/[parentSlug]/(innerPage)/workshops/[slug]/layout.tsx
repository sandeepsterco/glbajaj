import { getSlug } from "@/src/lib/getSlug";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import { apiFetch } from "@/src/lib/api";

export default async function NewsEventsLayout({ children }: { children: React.ReactNode }) {
    
    const slug = await getSlug(-2);
    const currentSlug = await getSlug();

    if (!slug) return <>{children}</>;

    const {data, error} = await apiFetch(`workshops/${currentSlug}`);
    const currentPageTitle = data?.workshops_details?.data?.heading;

    return <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;
}