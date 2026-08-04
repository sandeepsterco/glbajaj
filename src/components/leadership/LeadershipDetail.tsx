import Link from "next/link";
import ReactParser from "../common/reactParser/ReactParser";
import { getSlug } from "@/src/lib/getSlug";
import { BASE_URL } from "@/src/config/config";

export default async function LeadershipDetail({ data }: { data: any }) {
    const slug = await getSlug(-2);

    return (
        <section className="visionary_section">
            <div className="container-fluid">
                <ReactParser html={data?.cms?.leadership_detail} />
                <div className="message_details bottom">
                        <figure>
                        </figure>
                        <div className="message_cnt">
                            <div className="inspiration_details">
                                <div className="left">
                                    {data?.data?.name && (
                                        <h4 data-aos="fade-up" data-aos-delay="200"> {data.data.name}</h4>
                                    )}
                                    {data?.data?.designation && (
                                        <p data-aos="fade-up" data-aos-delay="400">{data.data.designation}</p>
                                    )}
                                </div>
                                <div className="right">
                                    <Link className="apply_btn" href={`${BASE_URL}${slug}`}><i className="bi bi-arrow-left" style={{marginRight: '1rem'}}></i>Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        </section>
    )
}