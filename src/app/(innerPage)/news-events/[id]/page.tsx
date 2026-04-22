import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { NewsDetail } from "@/src/components/newsEvents/NewsDetail";
import RelatedStories from "@/src/components/newsEvents/RelatedStories";
import { apiFetch } from "@/src/lib/api";

export default async function NewsDetailPage({params}:{params:any}){
    const {id} = await params;
    const { data, error } = await apiFetch(`news-and-events/${id}`);

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load news" message={error} />
        )
    }

    const newsData = data?.news_and_events_details;
    const relatedData = data?.related_news_and_events;

    return(
        <>
            <NewsDetail data={newsData} />
            {relatedData?.length > 0 && (
                <RelatedStories data={relatedData} />
            )}
        </>
    )
}