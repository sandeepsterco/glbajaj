import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function ConferenceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug || /^\d+$/.test(slug)) return <>{children}</>;

  return (
    <InnerPageLayoutWrapper
      slug={"conferences"}
      pathname={`/research-innovation/conferences/${slug}`}
      tabs={null}
      mainClass="happenings_page"
      showTabs={true}
    >
      {children}
    </InnerPageLayoutWrapper>
  );
}