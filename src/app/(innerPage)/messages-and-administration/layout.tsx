// (innerPage)/news-events/layout.tsx
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import { FacultyTabs } from "@/src/data/header/headerData";

export default function NewsEventsLayout({ children }: { children: React.ReactNode }) {
    return <InnerPageLayoutWrapper slug="leadership" tabs={FacultyTabs} mainClass="happenings_page" showTabs={true}>{children}</InnerPageLayoutWrapper>;
}