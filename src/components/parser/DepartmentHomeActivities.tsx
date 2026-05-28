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
  const clubsData = data?.modular?.["clubs-and-society"] ?? [];

  const allItems = [
    ...activitiesData.map((item: any) => ({ ...item, type: "activity" })),
    ...clubsData.map((item: any) => ({ ...item, type: "club" })),
  ];

  const slideCount = allItems.length;
  const maxSlidesPerView = 3;
  const shouldLoop = slideCount > maxSlidesPerView;
  const showNavigation = shouldLoop;

  if (isLoading || allItems.length === 0) return null;

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
      {allItems.map((item: any, idx: number) => (
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
            {item.type === "club" && item?.slug && (
              <Link
                className="strech_link"
                href={BASE_URL + "why-clubs-societies/" + item.slug}
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