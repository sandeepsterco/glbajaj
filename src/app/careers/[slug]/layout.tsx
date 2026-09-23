// (innerPage)/news-events/layout.tsx
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function CareerDetailLayout({ children, params }: { children: React.ReactNode; params:Promise<{slug:string}> }) {
    const {slug} = await params;
    const parentSlug = "careers";

    if (!parentSlug) return <>{children}</>;

    return <InnerPageLayoutWrapper pathname={`/${parentSlug}/${slug}`} slug={parentSlug} tabs={null} mainClass="happenings_page" showTabs={true}>{children}</InnerPageLayoutWrapper>;

}