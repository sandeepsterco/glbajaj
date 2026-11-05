import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function NewsEventsLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const currentSlug = 'gallery'

    if (/^\d+$/.test(slug)) return <>{children}</>;

    const {data, error} = await apiFetch(`gallery/${slug}`);

    if(error) notFound();

    const pageData = data?.gallery_details?.data || {};

    return <InnerPageLayoutWrapper slug={currentSlug} pathname={`/happenings/${currentSlug}/${slug}`} parentSlug="happenings" tabs={null} mainClass="happenings_page" currentPageTitle={pageData?.title || ''} showTabs={true}>{children}</InnerPageLayoutWrapper>;
}