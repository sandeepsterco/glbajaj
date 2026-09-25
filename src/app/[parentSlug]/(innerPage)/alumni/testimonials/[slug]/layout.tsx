import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";

export default async function NewsEventsLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ parentSlug: string; slug: string }>;
  }) {
    const { parentSlug, slug } = await params;
    if (!slug) return <>{children}</>;

    return <InnerPageLayoutWrapper slug={slug} pathname={`/${parentSlug}/alumni-testimonials/${slug}`} tabs={null} mainClass="happenings_page" showTabs={false}>{children}</InnerPageLayoutWrapper>;
}