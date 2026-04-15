"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";
import { SkeletonGroup } from "../ui/Skeleton";
import Image from "next/image";

const fetchCourses = async () => {
  const { data, error } = await apiFetch("modular/home", {
    revalidate: 300,
  });

  if (error) throw new Error(error);
  return data;
};

export default function AddOnCourses() {
  const { data, isLoading } = useQuery({
    queryKey: ["add_on_courses"],
    queryFn: fetchCourses,
  });

  const sliderData = data?.sections?.["add-on-courses"];

  return (
    <div className="courses-slider-box">
      <div className="slider-title">Mechanical Add-on Courses</div>

      {/* Custom Nav */}
      <div className="slider-nav">
        <div className="nav-btn prevCompanyReact">‹</div>
        <div className="nav-btn nextCompanyReact">›</div>
      </div>

      {isLoading ? (
        <SkeletonGroup count={7} className="bg-gray-300 h-[8.1rem] w-[100%]" />
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={7}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={{
            prevEl: ".prevCompanyReact",
            nextEl: ".nextCompanyReact",
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 7 },
          }}
          className="addOnCoursesSwiper"
        >
          {sliderData?.map((slide: any, sliderIdx: number) => (
            <SwiperSlide key={sliderIdx}>
              <div className="icon-box">
                <Image
                  src={slide.icon}
                  alt={slide.alt}
                  width={224}
                  height={81}
                />
              </div>
              {slide.title}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
