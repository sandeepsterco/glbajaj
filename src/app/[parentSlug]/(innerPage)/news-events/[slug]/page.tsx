import { NewsDetail } from "@/src/components/newsEvents/NewsDetail";
import RelatedStories from "@/src/components/newsEvents/RelatedStories";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildNewsArticleSchema } from "@/src/lib/schema/newsDetailSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({params}:{params:any}){
    const {slug, parentSlug} = await params;
    const currentSlug = 'news-events';
    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`news-and-events/${slug}`),
        getPageSEO(`news-and-events/${slug}`),
    ])
    if (error) notFound();

    const newsData = data?.news_and_events_details;
    const relatedData = data?.related_news_and_events;

    const NewsDetailSchemaArgs = {
        articleUrl:`${BASE_URL}${parentSlug}/news-events/${slug}` || '',
        headline:newsData.data.heading || '',
        articleSummary:newsData.data.description || '',
        datePublishedIso:newsData.data.date || '',
        dateModifiedIso:newsData.data.date || '',
        category:'',
        keywords:seoData?.keywords ? String(seoData.keywords).split(',').map(k=>k.trim()).filter(Boolean) : [],
        primaryRelatedEntityId:'',
        secondaryRelatedEntityIds:[],
    }

    const newsDetailSchema = buildNewsArticleSchema(NewsDetailSchemaArgs);

    return(
        <>
            {seoData?.schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(seoData.schema),
                    }}
                />
            )}
            {newsDetailSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(newsDetailSchema) }}
                />
            )}
            <NewsDetail data={newsData} />
            {relatedData?.length > 0 && (
                <RelatedStories data={relatedData} currentSlug={currentSlug} parentSlug={parentSlug}  />
            )}
        </>
    )
}