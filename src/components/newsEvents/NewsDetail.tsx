"use client"
import ReactParser from "../common/reactParser/ReactParser";
import SocialShare from "../common/SocialShare";

export function NewsDetail({data}:{data:any}) {
    return (
        <section className="news_details">
            <div className="container25">
                <div className="newst_details_header">
                    {data?.data?.date && (
                        <p className="date">
                            {new Date(data?.data?.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    )}
                    <SocialShare title={data?.data?.heading || ""} />
                </div>

                {data?.data?.heading && <h1>{data.data.heading}</h1>}

                {data?.cms?.news_and_events_detail && (
                    <ReactParser html={data?.cms?.news_and_events_detail} />
                )}
            </div>
        </section>
    );
}