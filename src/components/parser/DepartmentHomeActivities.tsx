"use client"
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SkeletonGroup } from "../ui/Skeleton";
import NoData from "../ui/NoData";

const fetchDepartmentActivitiesData = async (slug: string) => {
  const { data, error } = await apiFetch(`department/${slug}/home`);
  if (error) throw new Error(error);
  return data?.data;
};

export default function DepartmentHomeActivities() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["department_home_activities", slug],
    queryFn: () => fetchDepartmentActivitiesData(slug),
  });

  const activitiesData = data?.modular?.["department-activities"] ?? [];

  const slideCount = activitiesData.length;
  const maxSlidesPerView = 3;
  const shouldLoop = slideCount > maxSlidesPerView;
  const showNavigation = shouldLoop;

  if(isLoading){
    return <SkeletonGroup count={3} wrapperClassName="!flex gap-[3rem]" className="w-full h-[30rem]" />
  }

  if(activitiesData.length == 0){
    return <NoData />
  }

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1.2}
      spaceBetween={20}
      loop={shouldLoop}
      autoplay={false}
      breakpoints={{
        768: { slidesPerView: 2, spaceBetween: 15 },
        1200: { slidesPerView: 3, spaceBetween: 30 },
      }}
      navigation={{
        nextEl: ".department_activities_next",
        prevEl: ".department_activities_prev",
      }}
      className="activities_swiper"
    >
      {activitiesData.map((item: any, idx: number) => (
        <SwiperSlide key={item?.id || idx}>
          <div className="activies_col">
            <figure>
              <Image
                src={item.image}
                width={380}
                height={275}
                alt={item.title}
              />
            </figure>
            <div className="activities_caption">
              <p>{item.title}</p>
            </div>
            {(item?.pdf || item?.slug) && (
              <Link
                className="strech_link"
                href={item?.pdf ? item.pdf : `${slug}/activity/${item.slug}`}
                target={item?.pdf ? '_blank' : '_self'}
              />
            )}
          </div>
        </SwiperSlide>
      ))}

      {showNavigation && (
        <div className="navigation_btn">
          <div className="prev-btn swiper_prev_custom department_activities_prev">
            <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
          </div>
          <div className="next-btn swiper_next_custom department_activities_next">
            <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
          </div>
        </div>
      )}
    </Swiper>
  );
}