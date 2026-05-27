import Link from "next/link";
import ReactParser from "../common/reactParser/ReactParser";
import Image from "next/image";

export default function TestimonialDetail({ data }: { data: any }) {
    return (
        <>
            <section className="dep_succ_sto">
                <div className="home_testimonials testimonial_inner">
                    <div className="container">
                        <div className="grid">

                            <div className="left_col">
                                <img className="pattern_img" src="/images/pattern/pattern2.png" />

                                <div className="sec_title">
                                    <h5 className="title24">Alumni Testimonials</h5>
                                    <h2 className="heading title48">
                                        Success Stories from our Alumni
                                    </h2>
                                </div>

                                <div className="desc_content">
                                    <div className="quote-icon">
                                        <img src="/images/icons/quote.png" alt="quote icon" />
                                    </div>
                                    <div className="desc students active">
                                        <div className="des">
                                            {data?.data?.message}
                                        </div>
                                        <p className="short_des">
                                            {data?.data?.short_desc}
                                        </p>
                                        <div className="extra_info">
                                            {data?.data?.name && <h5 className="name">{data.data.name}</h5>}
                                            {data?.data?.type && <p>{data.data.type}</p>}
                                            {data?.data?.branch && <p>{data.data.branch}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="right">
                                {data?.data?.image && (
                                    <div className="main-images ">
                                        <Image className="main-img students active" width={600} height={732} loading="lazy" src={data.data.image} alt="alumni image" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {data?.cms && (
                <ReactParser html={data.cms} />
            )}
        </>
    )
}