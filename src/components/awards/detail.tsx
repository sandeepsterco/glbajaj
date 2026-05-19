import ReactParser from "../common/reactParser/ReactParser";

export default function AwardDetail({data}:{data:any}) {
    
    return (
        <section className="award-detail-sec">
            <div className="container25">
                <div className="award-detail-heading">
                    {data?.data?.title && (
                        <h4>{data.data.title}</h4>
                    )}
                </div>
            </div>

            <ReactParser html={data?.cms?.awards_detail} />
        </section>
    )
}