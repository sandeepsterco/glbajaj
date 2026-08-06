import ReactParser from "../common/reactParser/ReactParser";

export default function PlacementDetail({data}:{data:any}) {
    
    return (
        // <section className="award-detail-sec">
            <ReactParser html={data?.cms?.hod_section} />
        // </section>
    )
}