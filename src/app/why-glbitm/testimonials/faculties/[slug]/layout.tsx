import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import { apiFetch } from "@/src/lib/api";

export default async function NewsEventsLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{slug: string }>;
  }) {
    const { slug } = await params;
    const currentSlug = "testimonials";

    const {data, error} = await apiFetch(`testimonial/${slug}`);

    const currentPageTitle = data?.testimonial_details?.data?.name;

    return <InnerPageLayoutWrapper slug={currentSlug}
    pathname={`/why-glbitm/${currentSlug}/${slug}`} tabs={null} mainClass="happenings_page" showTabs={false} currentPageTitle={currentPageTitle} parentSlug="why-glbitm">{children}</InnerPageLayoutWrapper>;
}