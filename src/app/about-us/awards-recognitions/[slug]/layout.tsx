import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { apiFetch } from "@/src/lib/api";

export default async function MessageDetailLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
  }) {
    const { slug } = await params;
    const currentSlug = 'awards-recognitions'

    const {data, error} = await apiFetch(`award-recognitions/${slug}`)
    const currentPageTitle = data?.award_details?.data?.title;

    return <InnerPageLayoutWrapper slug={currentSlug} pathname={`/about-us/${currentSlug}/${slug}`} parentSlug={'about-us'} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;

}