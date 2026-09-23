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
    const {data, error} = await apiFetch(`testimonial/${slug}`);

    const currentPageTitle = data?.testimonial_details?.data?.name;

    return <InnerPageLayoutWrapper slug={parentSlug}
    pathname={`/\${parentSlug}/testimonials/\${slug}`} tabs={null} mainClass="happenings_page" showTabs={false} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;
}