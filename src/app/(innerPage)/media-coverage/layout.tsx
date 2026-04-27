// (innerPage)/news-events/layout.tsx
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import { HappeningsTabs } from "@/src/data/header/headerData";

export default function NewsEventsLayout({ children }: { children: React.ReactNode }) {
    return <InnerPageLayoutWrapper slug="media-coverage" tabs={HappeningsTabs} mainClass="happenings_page" showTabs={true}>{children}</InnerPageLayoutWrapper>;
}