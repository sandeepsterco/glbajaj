"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Loop, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";

import "swiper/css";

const fetchCourses = async () => {
  const { data, error } = await apiFetch("modular/home");
  if (error) throw new Error(error);
  return data;
};

export default function ResearchInnovation() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["add_on_courses"],
    queryFn: fetchCourses,
  });

  const slides = data?.modular?.["research-innovation"];

  return (
    <div className="research_slider_wrapper">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1.2}
        spaceBetween={20}
        centeredSlides={false}
        loop={true}
        autoplay={false}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper:any) => {
          // Re-assign navigation refs after swiper mounts
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          768: {
            slidesPerView: 2.5,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 3.35,
            spaceBetween: 20,
          },
        }}
      >
        {slides?.map((slide:any, index:number) => (
          <SwiperSlide key={index}>
            <div className="research_card">
              <figure>
                <img
                  src={slide?.image || ""}
                  alt="leader"
                  className="img-fluid w-100"
                />
              </figure>
              <div className="res_caption">
                {slide?.names && (
                  <span>{slide.names}</span>
                )}
                {slide?.title && (
                  <p>{slide.title}</p>
                )}
              </div>
              {slide?.url && (
                <a className="strech_link" href={slide.url}></a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="navigation_btn">
        <div ref={prevRef} className="swiper_prev_custom">
          <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
        </div>
        <div ref={nextRef} className="swiper_next_custom">
          <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}