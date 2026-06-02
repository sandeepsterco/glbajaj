import { getSlug } from "@/src/lib/getSlug";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function NewsEventsLayout({ children }: { children: React.ReactNode }) {
    const slug = await getSlug();

    if (!slug) return <>{children}</>;

    return <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>{children}</InnerPageLayoutWrapper>;
}