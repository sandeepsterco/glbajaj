import ReactParser from "../common/reactParser/ReactParser";

export function NewsDetail({data}:{data:any}) {

    console.log('news detail',data);
    return (
        <section className="news_details">
            <div className="container25">
                <div className="newst_details_header">
                    {data?.date && (
                        <p className="date">{new Date(data.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}</p>
                    )}
                    <figure><a href="#0"><img src="/images/icons/share.svg" className="img-fluid" alt="share" /></a></figure>
                </div>
                {data?.heading && (
                    <h1>{data.heading}</h1>
                )}

                {data?.news_and_events_detail && (
                    <ReactParser html={data.news_and_events_detail} />
                )}

            </div>
        </section>
    )
}