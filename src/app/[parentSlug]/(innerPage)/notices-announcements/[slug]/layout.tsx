import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function NoticeAnnouncementDetailLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ parentSlug: string; slug: string }>;
  }) {
    const { parentSlug, slug } = await params;
    const currentSlug = "notices-announcements";

    const {data, error} = await apiFetch(`notice-and-announcements/${slug}`);

    const announcementData = data?.notice_and_announcement_details?.data

    if(announcementData?.no_detail) notFound();

    const currentPageTitle = announcementData?.title;
    // return <h1>testing</h1>

    return <InnerPageLayoutWrapper slug={currentSlug}
    pathname={`/${parentSlug}/${currentSlug}/${slug}`} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>;

}