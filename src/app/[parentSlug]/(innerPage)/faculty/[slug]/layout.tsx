import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
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
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const { parentSlug } = await params;

    if (!parentSlug) return <>{children}</>;

    return (
        <InnerPageLayoutWrapper
            slug={parentSlug}
            pathname={`/${parentSlug}/faculty`}
            tabs={null}
            mainClass="happenings_page"
            showTabs={false}
        >
            {children}
        </InnerPageLayoutWrapper>
    );
}