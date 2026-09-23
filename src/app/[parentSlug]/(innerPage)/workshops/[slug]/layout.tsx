import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import { apiFetch } from "@/src/lib/api";

export default async function NewsEventsLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ parentSlug: string; slug: string }>;
  }) {
    
    const { parentSlug, slug } = await params;

    if (!parentSlug) return <>{children}</>;

    const {data, error} = await apiFetch(`workshops/${slug}`);
    const currentPageTitle = data?.workshops_details?.data?.heading;

    return <InnerPageLayoutWrapper slug={'workshops'} pathname={`/${parentSlug}/workshops/${slug}`} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;
}