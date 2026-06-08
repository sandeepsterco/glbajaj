import { getSlug } from "@/src/lib/getSlug";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import { apiFetch } from "@/src/lib/api";

export default async function NewsEventsLayout({ children }: { children: React.ReactNode }) {
    const slug = await getSlug(-2);
    const currentSlug = await getSlug();

    if (!slug) return <>{children}</>;
    const {data, error} = await apiFetch(`testimonial/${currentSlug}`);

    const currentPageTitle = data?.testimonial_details?.data?.name;

    return <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={false} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;
}