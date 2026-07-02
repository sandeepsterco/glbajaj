"use client"
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const fetchDepartmentActivitiesData = async (slug: string) => {
  const { data, error } = await apiFetch(`department/${slug}/home`);
  if (error) throw new Error(error);
  return data?.data;
};

export default function DepartmentHomeClubs() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["department_home_activities", slug],
    queryFn: () => fetchDepartmentActivitiesData(slug),
  });

  const clubsData = data?.modular?.["clubs-and-society"] ?? [];


  const slideCount = clubsData.length;
  const maxSlidesPerView = 1;
  const shouldLoop = slideCount > maxSlidesPerView;
  const showNavigation = shouldLoop;

  if (isLoading || clubsData.length === 0) return null;

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={1.2}
      spaceBetween={20}
      loop={shouldLoop}
      autoplay={{
        delay:3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 30 },
        1200: { slidesPerView: 1, spaceBetween: 30 },
      }}
      navigation={{
        nextEl: ".department_home_clubs_next",
        prevEl: ".department_home_clubs_prev",
      }}
      className="activities_swiper"
    >
      {clubsData.map((item: any, idx: number) => (
        <SwiperSlide key={item?.id || idx}>
          <div className="dep_clubs_card">
            <figure>
              <Image
                src={item.image}
                width={380}
                height={275}
                alt={item.title}
              data-aos="fade-up" data-aos-delay="200"/>
            </figure>
            {item?.title && (
              <div className="dep_club_contents">
                <h3 className="font36 " data-aos="fade-up" data-aos-delay="200">{item.title}</h3>
                <div className="content" dangerouslySetInnerHTML={{__html:item.short_description}} data-aos="fade-up" data-aos-delay="200" />
                {item?.slug && (
                  <Link href={BASE_URL + "why-clubs-societies/" + item.slug} className="cus-btn " data-aos="fade-up" data-aos-delay="200">
                      View More
                  </Link>
                )}
                
              </div>
            )}
            
          </div>
        </SwiperSlide>
      ))}

      {showNavigation && (
        <div className="navigation_btn" data-aos="fade-up" data-aos-delay="200">
          <div className="prev-btn swiper_prev_custom department_home_clubs_prev">
            <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
          </div>
          <div className="next-btn swiper_next_custom department_home_clubs_next">
            <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
          </div>
        </div>
      )}
    </Swiper>
  );
}