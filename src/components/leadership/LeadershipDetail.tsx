import Link from "next/link";
import ReactParser from "../common/reactParser/ReactParser";

export default function LeadershipDetail({ data }: { data: any }) {
    return (
        <section className="visionary_section">
            <div className="container25">
                <ReactParser html={data?.cms?.leadership_detail} />
                <div className="message_details bottom">
                        <figure>
                        </figure>
                        <div className="message_cnt">
                            <div className="inspiration_details">
                                {data?.data?.name && (
                                    <h4>{data.data.name}</h4>
                                )}
                                {data?.data?.designation && (
                                    <p>{data.data.designation}</p>
                                )}
                            </div>
                        </div>
                    </div>
                
            </div>
        </section>
    )
}