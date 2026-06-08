import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";

const TESTIMONIAL_TABS = [
    { label: "Students", type: "student" },
    { label: "Recruiters", type: "recruiter" },
    { label: "Faculties", type: "faculties" },
] as const;

export default function TestimonialList({ data, slug, activeType = "student" }: { data: any; slug: string; activeType?: string }) {
    const showTabs = activeType !== "alumni";

    return (
        <section className="faculty_section">
            <div className="container25">
                {showTabs && (
                    <div className="cus-tab">
                        <div className="tabbed-content">
                            <nav className="tabs">
                                <ul>
                                    {TESTIMONIAL_TABS.map(({ label, type }) => (
                                        <li key={type}>
                                            <Link
                                                href={`${BASE_URL}testimonials?type=${type}&page=1`}
                                                className={activeType === type ? "active" : ""}
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
                <div className="faculty_grid">
                    {data.map((item: any, idx: number) => (
                        <div key={idx} className="faculty_Bx">
                            <figure className="flash-effect-2">
                                <Image src={item.image || ''} width={255} height={287} className="img-fluid" alt={item.name || 'faculty image'} loading="lazy" />
                            </figure>
                            {item?.name && (
                                <h5>{item.name}</h5>
                            )}
                            {item?.branch && (
                                <p>{item.branch}</p>
                            )}
                            {activeType !== "alumni" && item?.type && (
                                <p>{item.type}</p>
                            )}
                            {item?.slug && (
                                <Link href={`${BASE_URL}testimonials/${item.slug}`} className="strech_link" />
                            )}

                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}