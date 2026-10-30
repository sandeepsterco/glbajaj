"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/src/lib/api";
import PaginationWrapper from "../common/pagination/PaginationWrapper";
import { BASE_URL } from "@/src/config/config";

const TESTIMONIAL_TABS = [
    { label: "Students", type: "students", filter: "Student" },
    { label: "Recruiters", type: "recruiters", filter: "Recruiter" },
    { label: "Faculties", type: "faculties", filter: "Faculty" },
    { label: "Alumni", type: "alumni", filter: "Alumni" },
] as const;

export default function TestimonialList({ data, currentPage, type, slug }: { data: any; currentPage?: string; type?: string; slug?:string; }) {
    const [testimonials, setTestimonials] = useState(data);
    const [activeType, setActiveType] = useState(type || "Student");
    const [page, setPage] = useState(Number(data?.current_page) || 1);
    const [loading, setLoading] = useState(false);
    const requestId = useRef(0);
    const isAlumniPage = currentPage === "alumni-testimonials";

    useEffect(() => {
        if (isAlumniPage) {
            setTestimonials(data);
            setPage(Number(data?.current_page) || 1);
        }
    }, [data, isAlumniPage]);

    const loadTestimonials = async (type: string, nextPage: number) => {
        const currentRequestId = ++requestId.current;
        setLoading(true);

        const params = new URLSearchParams({ type, page: String(nextPage) });
        const { data: response, error } = await apiFetch(`testimonial?${params.toString()}`, { cache: "no-store" });

        if (currentRequestId !== requestId.current) return;

        setLoading(false);
        if (error) {
            setTestimonials(null);
            return;
        }

        setTestimonials(response?.testimonials ?? null);
        setPage(nextPage);
    };

    const handleTypeChange = (type: string) => {
        if (type === activeType) return;
        setActiveType(type);
        void loadTestimonials(type, 1);
    };

    const handlePageChange = (nextPage: number) => {
        void loadTestimonials(activeType, nextPage);
    };

    return (
        <section className="faculty_section">
            <div className="container25">
                {!isAlumniPage && (
                    <div className="cus-tab">
                        <div className="tabbed-content">
                            <nav className="tabs">
                                <ul>
                                    {TESTIMONIAL_TABS.map(({ label, type, filter }) => (
                                        <li key={type}>
                                            <Link
                                                href={`${BASE_URL}why-glbitm/testimonials/${type}`}
                                                className={activeType === filter ? "active" : ""}
                                                aria-pressed={activeType === type}
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
                    {loading ? <p>Loading testimonials...</p> : testimonials?.data?.map((item: any, idx: number) => (
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
                            {item?.course && (
                                <p>{item.course}</p>
                            )}
                            {item?.slug && (
                                <Link href={`${BASE_URL}why-glbitm/testimonials/${slug}/${item.slug}`} className="strech_link" />
                            )}

                        </div>
                    ))}

                </div>
            </div>

            <PaginationWrapper
                    currentPage={isAlumniPage ? testimonials?.current_page || 1 : page}
                    totalPages={testimonials?.last_page || 1}
                    onPageChange={isAlumniPage ? undefined : handlePageChange}
                />
        </section>
    )
}