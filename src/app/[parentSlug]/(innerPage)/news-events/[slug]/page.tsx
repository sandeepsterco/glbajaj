import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { NewsDetail } from "@/src/components/newsEvents/NewsDetail";
import RelatedStories from "@/src/components/newsEvents/RelatedStories";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({params}:{params:any}){
    const {slug, parentSlug} = await params;
    const currentSlug = 'news-events';
    const { data, error } = await apiFetch(`news-and-events/${slug}`);

    if (error) notFound();

    const newsData = data?.news_and_events_details;
    const relatedData = data?.related_news_and_events;

    return(
        <>
            <NewsDetail data={newsData} />
            {relatedData?.length > 0 && (
                <RelatedStories data={relatedData} currentSlug={currentSlug} parentSlug={parentSlug}  />
            )}
        </>
    )
}