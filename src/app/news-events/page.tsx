import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import MainNews from "@/src/components/newsEvents/MainNews";
import NewsListing from "@/src/components/newsEvents/NewsListing";
import { apiFetch } from "@/src/lib/api";

export default async function NewsEvent(){
    const {data, error} = await apiFetch(`news-and-events`);

    console.log('news data',data);

    if(error){
        return(
            <ApiErrorFallback heading="Couldn't load news" message={error} />
        )
    }

    const mainData = data?.news_and_events?.data[0];
    const otherListing = data?.news_and_events?.data.slice(1);

    console.log('otherListing',otherListing);

    return(
        <>
            <MainNews data={mainData} />
            {otherListing?.length > 0 && (
                <NewsListing data={otherListing} />
            )}
        </>
    )
}