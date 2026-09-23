import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import NoData from "@/src/components/ui/NoData";
import { apiFetch } from "@/src/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NoticeAnnouncementPage({ params }: { params: any }) {
    const { slug } = await params;

    const { data, error } = await apiFetch(`notice-and-announcements/${slug}`);

    if (error) notFound();

    if (Object.keys(data?.notice_and_announcement_details?.cms).length == 0) {
        return (
            <NoData />
        )
    }

    const combinedHtml = Object.values(data?.notice_and_announcement_details?.cms ?? {}).join("");

    return <ReactParserDynamic html={combinedHtml} />;
}