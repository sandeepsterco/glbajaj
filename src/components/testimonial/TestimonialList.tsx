import Image from "next/image";
import Link from "next/link";
import PaginationWrapper from "../common/pagination/PaginationWrapper";
import { BASE_URL } from "@/src/config/config";
import { TESTIMONIAL_TABS } from "@/src/lib/testimonialTypes";

export default function TestimonialList({
    data,
    typeSlug,
    showTabs = true,
    basePath
}: {
    data: any;
    typeSlug: string;
    showTabs?: boolean;
    basePath?: string;
}) {
    return (
        <section className="faculty_section">
            <div className="container25">
                {showTabs && (
                    <div className="cus-tab">
                        <div className="tabbed-content">
                            <nav className="tabs">
                                <ul>
                                    {TESTIMONIAL_TABS.map(({ label, slug }) => (
                                        <li key={slug}>
                                            <Link
                                                href={`${BASE_URL}why-glbitm/testimonials/${slug}`}
                                                className={typeSlug === slug ? "active" : ""}
                                                aria-current={typeSlug === slug ? "page" : undefined}
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
                                <Image src={item.image || ""} width={255} height={287} className="img-fluid" alt={item.name || "testimonial image"} loading="lazy" />
                            </figure>
                            {item?.name && <h5>{item.name}</h5>}
                            {item?.branch && <p>{item.branch}</p>}
                            {item?.type && typeSlug !== "alumni" && <p>{item.type}</p>}
                            {item?.course && <p>{item.course}</p>}
                            {item?.slug && (
                                <Link href={`${BASE_URL}why-glbitm/testimonials/${typeSlug}/${item.slug}`} className="strech_link" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <PaginationWrapper
                currentPage={data?.current_page || 1}
                totalPages={data?.last_page || 1}
                basePath={basePath ?? `/why-glbitm/testimonials/${typeSlug}`}
            />
        </section>
    );
}