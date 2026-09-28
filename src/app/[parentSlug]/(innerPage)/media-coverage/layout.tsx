import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/fancybox.css";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function NewsEventsLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ parentSlug: string }>;
}) {
    const { parentSlug } = await params;
    const currentSlug = "media-coverage";
    if (!parentSlug) return <>{children}</>;

    return (
        <InnerPageLayoutWrapper
            slug={currentSlug}
            pathname={`/${parentSlug}/${currentSlug}`}
            tabs={null}
            mainClass="happenings_page"
            showTabs={true}
        >
            {children}
        </InnerPageLayoutWrapper>
    );
}
