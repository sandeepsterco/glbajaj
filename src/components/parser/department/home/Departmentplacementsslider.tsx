"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const SLIDES_PER_VIEW = 3;

export interface PlacementItem {
  name: string;
  image: string;
  logo_image?: string;
  package?: string | number;
}

type Props = {
  placements: PlacementItem[];
};

export default function DepartmentPlacementsSlider({ placements }: Props) {
  const canLoop = placements.length > SLIDES_PER_VIEW;

  return (
    <Swiper
      className="home_placement_student_slider"
      modules={[Navigation]}
      slidesPerView={SLIDES_PER_VIEW}
      spaceBetween={27}
      loop={canLoop}
      navigation={
        canLoop
          ? {
              nextEl: ".deparment_page_placemen .next_swiper_btn",
              prevEl: ".deparment_page_placemen .prev_swiper_btn",
            }
          : false
      }
      breakpoints={{
        0: { slidesPerView: 1, spaceBetween: 15 },
        576: { slidesPerView: 1.5, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 2.5, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 20 },
      }}
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {placements.map((item, index) => (
        <SwiperSlide key={index}>
          <figure className="flash-effect-2">
            <Image
              src={item.image}
              alt={item.name}
              width={349}
              height={409}
              loading="lazy"
              data-aos="fade-up"
              data-aos-delay="200"
            />
          </figure>
          <div className="placem_cnt">
            <img
              src={item?.logo_image}
              className="placement_img"
              alt="placement company"
              data-aos="fade-up"
              data-aos-delay="200"
            />
            <div className="home_placement_info">
              <h3 className="placement" data-aos="fade-up" data-aos-delay="400">
                {item?.package}
                <sup>LPA</sup>
              </h3>
              <p data-aos="fade-up" data-aos-delay="600">
                {item.name}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}