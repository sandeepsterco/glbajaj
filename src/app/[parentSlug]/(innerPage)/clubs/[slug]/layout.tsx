import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function MessageDetailLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ parentSlug: string; slug: string }>;
  }) {
    const { parentSlug, slug } = await params;

    if (!slug) return <>{children}</>;

    return (
      <InnerPageLayoutWrapper
        slug={'clubs'}
        pathname={`/${parentSlug}/clubs/${slug}`}
        tabs={null}
        mainClass="happenings_page"
        showTabs={true}
      >
        {children}
      </InnerPageLayoutWrapper>
    );
  }
  