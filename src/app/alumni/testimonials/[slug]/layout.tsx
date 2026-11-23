import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import { apiFetch } from "@/src/lib/api";

export default async function TestimonialDetailLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const currentSlug = "testimonials";

    if (/^\d+$/.test(slug)) return <>{children}</>;

    const { data } = await apiFetch(`testimonial/${slug}`);
    const currentPageTitle = data?.testimonial_details?.data?.name;

    return (
        <InnerPageLayoutWrapper
            slug={currentSlug}
            pathname={`/alumni/${currentSlug}/${slug}`}
            tabs={null}
            mainClass="happenings_page"
            showTabs={true}
            currentPageTitle={currentPageTitle}
        >
            {children}
        </InnerPageLayoutWrapper>
    );
}