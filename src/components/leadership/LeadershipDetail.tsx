import Link from "next/link";
import ReactParser from "../common/reactParser/ReactParser";

export default function LeadershipDetail({ data }: { data: any }) {
    return (
        <section className="visionary_section">
            <div className="container25">
                <ReactParser html={data?.leadership_detail} />
                <div className="message_details bottom">
                        <figure>
                        </figure>
                        <div className="message_cnt">
                            <div className="inspiration_details">
                                {data?.name && (
                                    <h4>{data.name}</h4>
                                )}
                                {data?.designation && (
                                    <p>{data.designation}</p>
                                )}
                            </div>
                        </div>
                    </div>
                
            </div>
        </section>
    )
}