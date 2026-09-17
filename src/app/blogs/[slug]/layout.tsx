import { getSlug } from "@/src/lib/getSlug";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { apiFetch } from "@/src/lib/api";

export default async function NewsEventsLayout({ children }: { children: React.ReactNode }) {
    const slug = await getSlug(-2);
    const currentSlug = await getSlug();

    if (!slug) return <>{children}</>;
    const {data, error} = await apiFetch(`blogs/${currentSlug}`);

    const currentPageTitle = data?.details?.title;

    return <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;
}