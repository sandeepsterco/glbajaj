import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";
import PaginationWrapper from "../common/pagination/PaginationWrapper";

const TESTIMONIAL_TABS = [
    { label: "Students", type: "student" },
    { label: "Recruiters", type: "recruiter" },
    { label: "Faculties", type: "faculties" },
    { label: "Alumni", type: "alumni" },
] as const;

export default function TestimonialList({ data, slug, activeType = "student", currentPage }: { data: any; slug: string; activeType?: string; currentPage?: string }) {
    const showTabs = activeType;

    return (
        <section className="faculty_section">
            <div className="container25">
                {showTabs && currentPage !== "alumni-testimonials" && (
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
                    {data?.data?.map((item: any, idx: number) => (
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
                            {item?.type && currentPage !== "alumni-testimonials" && (
                                <p>{item.type}</p>
                            )}
                            {item?.slug && (
                                <Link href={`${BASE_URL}testimonials/${item.slug}`} className="strech_link" />
                            )}

                        </div>
                    ))}

                </div>
            </div>

            <PaginationWrapper
                    currentPage={data?.current_page || 1}
                    totalPages={data?.last_page || 1}
                />
        </section>
    )
}