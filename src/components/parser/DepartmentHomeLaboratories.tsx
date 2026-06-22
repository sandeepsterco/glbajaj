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
    return data?.data?.modular?.laboratories;
}

export default function DepartmentHomeLaboratories() {
    const pathname = usePathname();
    const slug = pathname.split('/').filter(Boolean).pop() ?? '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ["department-home-laboratories", slug],
        queryFn: () => getDepartmentFaculty(slug)
    })

    const slideCount = data?.length ?? 0;
    const maxSlidesPerView = 4.5;
    const shouldLoop = slideCount > Math.ceil(maxSlidesPerView)
    const showNavigation = shouldLoop;

    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="flex mt-[7.7rem] gap-[4rem]" count={2} className="bg-gray-300 h-[71.5rem] w-[60rem]" />
        );
    }

    return (
        <Swiper
            modules={[Navigation]}
            slidesPerView={1.2}
            spaceBetween={20}
            loop={true}
            autoplay={false}
            breakpoints={{
                768: { slidesPerView: 2.5, spaceBetween: 15 },
                1200: { slidesPerView: 3, spaceBetween: 40 },
            }}
            navigation={{
                nextEl: ".department_lab_next",
                prevEl: ".department_lab_prev",
            }}
            className="cse_lab_slider">
            {data?.length > 0 && data?.map((item: any, idx: number) => (
                <SwiperSlide key={idx}>
                    <div className="lab_card">
                        <figure >
                            <Image src={item.image || '/images/default/laboratories.webp'} width={600} height={715} alt={item.title || 'laboratory image'}
                                className="img-fluid w-100" data-aos="fade-up" data-aos-delay="600"/>
                        </figure>
                        {item?.title && (
                            <h4 className="font36" data-aos="fade-up" data-aos-delay="800">{item.title}</h4>
                        )}
                        {item?.url && (
                            <Link className="strech_link" href={BASE_URL + 'department/laboratories/' + item.url} data-aos="fade-up" data-aos-delay="1000"> </Link>
                        )}
                    </div>
                </SwiperSlide>
            ))}


        </Swiper>
    )
}