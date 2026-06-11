"use client";

import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";
import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { usePathname } from "next/navigation";

const fetchProgramCourses = async (slug:string) => {
  const { data, error } = await apiFetch(`program/${slug}`);
  if (error) throw new Error(error);
  return data;
};

export default function ProgramAddOnCourses() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean).pop() ?? '';

  const { data, isLoading } = useQuery({
    queryKey: ["program_add_on_courses", slug],
    queryFn: ()=>fetchProgramCourses(slug),
  });

  const sliderData = data?.program_details?.data?.["facts-and-figure"];

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="courses_slider">
      <div className="courses_header">
        <h4 className="title24">Beyond Curriculum</h4>

        <div className="slider_btns">
          <div ref={prevRef} className="swiper-button-prev prev_swiper_btn" />
          <div ref={nextRef} className="swiper-button-next next_swiper_btn" />
        </div>
      </div>

      <div className="overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          className="courses_slider_wrapper"
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper: SwiperType) => {
            if (typeof swiper.params.navigation === "object") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            0:    { slidesPerView: 2, spaceBetween: 10 },
            480:  { slidesPerView: 3, spaceBetween: 12 },
            768:  { slidesPerView: 4, spaceBetween: 15 },
            992:  { slidesPerView: 5, spaceBetween: 18 },
            1200: { slidesPerView: 6, spaceBetween: 20 },
            1400: { slidesPerView: 7, spaceBetween: 20 },
          }}
        >
          {sliderData?.length > 0 &&
            sliderData.map((singleSlide: any, slideIdx: number) => (
              <SwiperSlide key={slideIdx}>
                {singleSlide?.image && (
                  <span className="icon">
                    <Image
                      src={singleSlide.image}
                      alt="internet logo"
                      width={24}
                      height={24}
                    />
                  </span>
                )}
                {singleSlide?.title && <p>{singleSlide.title}</p>}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}