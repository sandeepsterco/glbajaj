import ReactParser from "../common/reactParser/ReactParser";

export default function AlumniEventsDetail({data}:{data:any}) {
    
    return (
        <>
            <section className="alumni-detail-sec">
                <div className="container25">
                    <div className="alu-detail-title">
                        {data?.data?.title && (
                            <h3 className="font36">{data.data.title}</h3>
                        )}
                    </div>
                </div>

                <div className="container">
                    <ReactParser html={data?.cms?.alumni_events_overview} />
                </div>
            </section>

            <ReactParser html={data?.cms?.['centres_of_excellence_lounch-event']} />
            <ReactParser html={data?.cms?.['alumni_conclusion']} />
        </>
    )
}