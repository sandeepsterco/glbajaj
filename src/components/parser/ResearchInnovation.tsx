"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";
import Image from "next/image";
import { SkeletonGroup } from "../ui/Skeleton";

const fetchCourses = async () => {
  const { data, error } = await apiFetch("modular/home");
  if (error) throw new Error(error);
  return data;
};

export default function ResearchInnovation() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["add_on_courses"],
    queryFn: fetchCourses,
  });

  if(isError) return null;

  if(isLoading){
    return <SkeletonGroup count={3} wrapperClassName="!flex gap-[3rem]" className="w-full h-[45rem]" />
  }


  const slides = data?.data?.modular?.["research-innovation"];

  return (
    <div className="research_slider_wrapper">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1.2}
        spaceBetween={20}
        autoplay={false}
        navigation={{
          prevEl: ".research_innovation_left",
          nextEl: ".research_innovation_right",
        }}
        // onSwiper={(swiper:any) => {
        //   // Re-assign navigation refs after swiper mounts
        //   swiper.params.navigation.prevEl = prevRef.current;
        //   swiper.params.navigation.nextEl = nextRef.current;
        //   swiper.navigation.init();
        //   swiper.navigation.update();
        // }}
        breakpoints={{
          768: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          991: {
            slidesPerView: 2.3,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 3.35,
            spaceBetween: 20,
          },
        }}
      >
        {slides?.map((slide: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="research_card">
              <figure className="flash-effect">
                <Image
                  src={slide?.image || ""}
                  alt="leader"
                  width={575}
                  height={429}
                  loading="lazy"
                  className="img-fluid w-100"
                  data-aos="fade-up" data-aos-delay="200"
                />
              </figure>
              <div className="res_caption">
                {slide?.names && (
                  <span data-aos="fade-up" data-aos-delay="400">{slide.names}</span>
                )}
                {slide?.title && (
                  <p data-aos="fade-up" data-aos-delay="600">{slide.title}</p>
                )}
              </div>
              {slide?.url && (
                <a className="strech_link" href={slide.url} data-aos="fade-up" data-aos-delay="800"></a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="navigation_btn" data-aos="fade-up" data-aos-delay="1000">
        <div ref={prevRef} className="swiper_prev_custom research_innovation_left">
          <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
        </div>
        <div ref={nextRef} className="swiper_next_custom research_innovation_right">
          <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}