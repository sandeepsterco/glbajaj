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
    params: Promise<{ parentSlug: string; slug: string }>;
  }) {
    const { parentSlug, slug } = await params;
    if (!parentSlug) return <>{children}</>;
    const {data, error} = await apiFetch(`leadership/${slug}`);

    const currentPageTitle = data?.leadership_details?.data?.name;

    return <InnerPageLayoutWrapper slug={parentSlug} pathname={`/\${parentSlug}/messages-and-administration/\${slug}`} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;

}