"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BASE_URL } from "@/src/config/config";

import "swiper/css";
import "swiper/css/navigation";

const SLIDES_PER_VIEW = 3;

export interface ResearchItem {
  title?: string;
  image: string;
  slug?: string;
  no_detail?: boolean | number;
}

type Props = {
  items: ResearchItem[];
  slug: string;
  parentSlug:string;
};

export default function DepartmentResearchSlider({ items, slug, parentSlug }: Props) {
  const canLoop = items.length > SLIDES_PER_VIEW;

  return (
    <Swiper
      className="cse_research_slider"
      modules={[Navigation]}
      spaceBetween={20}
      loop={canLoop}
      navigation={
        canLoop
          ? {
              nextEl: ".department_research_next",
              prevEl: ".department_research_prev",
            }
          : false
      }
      breakpoints={{
        768: { slidesPerView: 2.5, spaceBetween: 15 },
        1200: { slidesPerView: 3.35, spaceBetween: 20 },
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="research_card">
            <figure className="flash-effect-2">
              <Image
                src={item.image}
                alt={item.title ?? "department research image"}
                className="img-fluid w-100"
                width={426}
                height={318}
                loading="lazy"
              />
            </figure>
            {item?.title && (
              <div className="res_caption">
                <p>{item.title}</p>
              </div>
            )}
            {item?.slug && !item?.no_detail && (
              <Link
                className="strech_link"
                href={`${BASE_URL}${parentSlug}/departments/${slug}/research/${item.slug}`}
              />
            )}
          </div>
        </SwiperSlide>
      ))}

      {canLoop && (
        <div className="navigation_btn">
          <div className="swiper_prev_custom department_research_prev">
            <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
          </div>
          <div className="swiper_next_custom department_research_next">
            <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
          </div>
        </div>
      )}
    </Swiper>
  );
}