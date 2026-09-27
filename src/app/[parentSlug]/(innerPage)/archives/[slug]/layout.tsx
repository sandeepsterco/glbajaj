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
    const { parentSlug, slug } = await params;
    const currentSlug = 'archives';

  if (!parentSlug) return <>{children}</>;

  return (
    <InnerPageLayoutWrapper
      slug={currentSlug}
      pathname={`/${parentSlug}/${currentSlug}/${slug}`}
      tabs={null}
      mainClass="happenings_page"
      showTabs={true}
    >
      {children}
    </InnerPageLayoutWrapper>
  );
}
