"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname } from "next/navigation";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";

const getDepartmentFaculty = async (slug: string) => {

    const { data, error } = await apiFetch(`department/${slug}/home`);

    if (error) throw new Error(error);
    return data?.data?.modular?.faculty;
}

export default function DepartmentHomeFaculties() {
    const pathname = usePathname();
    const slug = pathname.split('/').filter(Boolean).pop() ?? '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ["department-home-faculties", slug],
        queryFn: () => getDepartmentFaculty(slug)
    })

    const slideCount = data?.length ?? 0;
    const maxSlidesPerView = 4.5;
    const shouldLoop = slideCount > Math.floor(maxSlidesPerView)
    const showNavigation = shouldLoop;

    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="mt-[7.7rem] grid-cols-3 gap-[4rem] !grid-cols-4" count={4} className="bg-gray-300 h-[40rem] w-[100%]" />
        );
    }

    return (
        <Swiper
            modules={[Navigation]}
            slidesPerView={1.2}
            spaceBetween={20}
            loop={false}
            autoplay={false}
            breakpoints={{
                768: { slidesPerView: 2.5, spaceBetween: 15 },
                1200: { slidesPerView: 4.7, spaceBetween: 40 },
            }}
            navigation={{
                nextEl: ".department_faculty_next",
                prevEl: ".department_faculty_prev",
            }}
            className="cse_faculties_slider"
        >
            {data?.map((item: any, index: number) => (
                index <= 4 && (
                    <SwiperSlide key={item?.id || index}>
                        <div className="leader_card">
                            <figure>
                                <Image src={item?.image || '/images/default/faculty.webp'} alt="leader" className="img-fluid w-100" height={255} width={287} loading="lazy" />
                            </figure>
                            {item?.name && (
                                <h4>{item.name}</h4>
                            )}
                            {item?.type && (
                                <p>{item.type}</p>
                            )}
                            {/* <Link className="strech_link" href={`${BASE_URL}faculty/${item.slug}`}></Link> */}

                        </div>
                    </SwiperSlide>
                )
            ))}

            {showNavigation && (
                <div className="navigation_btn">
                    <div className="prev-btn swiper_prev_custom department_faculty_prev"><img src="/images/icons/arrow.svg" alt="arrow"
                        className="img-fluid" /></div>
                    <div className="next-btn swiper_next_custom department_faculty_next"><img src="/images/icons/arrow.svg" alt="arrow"
                        className="img-fluid" /></div>
                </div>
            )}

        </Swiper>
    )
}