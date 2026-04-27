import Link from "next/link";
import ReactParser from "../common/reactParser/ReactParser";

export default function FacultyDetail({ data }: { data: any }) {
    return (
        <section className="faculty-sec">
            <div className="container55">
                <div className="faculty-img1">
                    <figure>
                        <img src="/images/faculty1.png" alt="data" />
                    </figure>
                </div>
                <div className="faculty-text">
                    {data?.name && (
                        <h2 className="title48">{data.name}</h2>
                    )}
                    {data?.type && (
                        <p>{data.type}</p>
                    )}
                </div>


                <div className="faculty-social">
                    {data?.experience && (
                        <div className="social-box">
                            <figure>
                                <img src="/images/icons/calendar.svg" alt="calendar" />
                            </figure>
                            <blockquote>Experience</blockquote>
                            <p>{data.experience}</p>
                        </div>
                    )}
                    
                    {data?.email && (
                        <div className="social-box">
                            <figure>
                                <img src="/images/icons/email.svg" alt="calendar" />
                            </figure>
                            <blockquote>Email</blockquote>
                            <p><a href={`mailto:${data.email}`}>{data.email}</a></p>
                        </div>
                    )}  
                    
                    {data?.linkedin_url && (
                        <div className="social-box">
                            <figure>
                                <img src="/images/icons/linkedin.svg" alt="calendar" />
                            </figure>
                            <blockquote>LinkedIn</blockquote>
                            <p><Link href={data.linkedin_url} target="_blank">{data.linkedin_url}</Link></p>
                        </div>
                    )}

                </div>

                <ReactParser html={data.faculty_detail} />

            </div>
        </section>
    )
}