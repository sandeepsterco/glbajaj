"use client";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SLIDES_PER_VIEW = 3;

const fetchHomePlacements = async () => {
  const { data, error } = await apiFetch(`modular/home`);
  if (error) throw new Error(error);
  return data?.modular?.["intern-placement"];
};

export default function HomePlacements() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["home_placements"],
    queryFn: fetchHomePlacements,
  });

  const placementData: any[] = data ?? [];

  if (isLoading) {
    return (
      <SkeletonGroup
        wrapperClassName="!mt-[3rem] !block"
        count={1}
        className="bg-gray-300 h-[50rem] w-full"
      />
    );
  }

  if (isError || !placementData?.length) return null;

  // Loop requires more slides than slidesPerView; hide nav entirely when not enough
  const canLoop = placementData.length > SLIDES_PER_VIEW;

  return (
    <div className="right_slider">
      {/* <div className="home_placement_static_card">
        <div className="home_placement_top_bar"></div>
        <h4 className="top_placed">Top Placed GLBian</h4>

        <div className={`slider_btns ${!canLoop ? "!hidden" : ""}`}>
          <div className="swiper-button-prev prev_swiper_btn"></div>
          <div className="swiper-button-next next_swiper_btn"></div>
        </div>

        <img src="/images/pattern/pattern1.png" className="pattern" />
      </div> */}

      <div className="slider_top">
        <h4 className="top_placed" data-aos="fade-up" data-aos-delay="200">Top Placed GLBian</h4> 

        <div className={`slider_btns ${!canLoop ? "!hidden" : ""}`} data-aos="fade-up" data-aos-delay="200">
          <div className="swiper-button-prev prev_swiper_btn"></div>
          <div className="swiper-button-next next_swiper_btn"></div>
        </div>
      </div>
      <Swiper
        className="home_placement_student_slider"
        modules={[Navigation]}
        slidesPerView={SLIDES_PER_VIEW}
        spaceBetween={20}
        loop={canLoop}
        navigation={
          canLoop
            ? {
                nextEl: ".right_slider .next_swiper_btn",
                prevEl: ".right_slider .prev_swiper_btn",
              }
            : false
        }
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          576: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        data-aos="fade-up" data-aos-delay="200"
      >
        {placementData.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <figure className="flash-effect-2">
              <Image
                src={item.image}
                alt={item.name}
                width={349}
                height={409}
                loading="lazy"
              />
            </figure>
            <div className="placem_cnt">
              <img
                src={item?.logo_image}
                className="placement_img"
                alt="placement company"
              />
              <div className="home_placement_info">
                <h3 className="placement">
                  {item?.package}
                  <sup>LPA</sup>
                </h3>
                <p>{item.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
