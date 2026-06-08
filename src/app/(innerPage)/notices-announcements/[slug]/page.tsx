import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import NoData from "@/src/components/ui/NoData";
import { apiFetch } from "@/src/lib/api";
import Link from "next/link";

export default async function NoticeAnnouncementPage({ params }: { params: any }) {
    const { slug } = await params;

    const { data, error } = await apiFetch(`notice-and-announcements/${slug}`);

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Notice Announcement Detail Page" message={error} />
        )
    }

    if (Object.keys(data?.notice_and_announcement_details?.cms).length == 0) {
        return (
            <NoData />
        )
    }

    const combinedHtml = Object.values(data?.notice_and_announcement_details?.cms ?? {}).join("");

    return <ReactParserDynamic html={combinedHtml} />;
}