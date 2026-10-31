"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { BASE_URL } from "@/src/config/config";

import "swiper/css";

export interface LeaderItem {
  name: string;
  about_image: string;
  designation?: string;
  slug?: string;
  alt?: string;
}

type Props = {
  leaders: LeaderItem[];
  pageName: string;
};

export default function AboutLeadershipSlider({ leaders, pageName }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="about_leadership">
      <div className="leadership_slider" data-swiper-react>
        <Swiper
          slidesPerView={1.2}
          spaceBetween={20}
          centeredSlides={false}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncState(swiper);
          }}
          onSlideChange={syncState}
          onResize={syncState}
          breakpoints={{
            768: { slidesPerView: 2.5, spaceBetween: 15 },
            1200: { slidesPerView: 3.5, spaceBetween: 23 },
          }}
        >
          {leaders.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="leader_card relative">
                <figure className="flash-effect">
                  <Image
                    src={item.about_image}
                    alt={item.alt || pageName}
                    className="img-fluid w-100"
                    width={475}
                    height={512}
                    loading="lazy"
                  />
                </figure>
                {item?.name && <h4>{item.name}</h4>}
                {item?.designation && <p>{item.designation}</p>}
                {item?.slug && (
                  <Link
                    className="strech_link"
                    href={`${BASE_URL}about-us/leadership-messages/${item.slug}`}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="navigation_btn">
        <div
          role="button"
          tabIndex={0}
          aria-label="Previous"
          className={`swiper_prev_custom ${isBeginning ? "swiper-button-disabled" : ""}`}
          onClick={() => swiperRef.current?.slidePrev()}
          onKeyDown={(e) => e.key === "Enter" && swiperRef.current?.slidePrev()}
        >
          <img src="/images/icons/arrow.svg" alt="" className="img-fluid" />
        </div>
        <div
          role="button"
          tabIndex={0}
          aria-label="Next"
          className={`swiper_next_custom ${isEnd ? "swiper-button-disabled" : ""}`}
          onClick={() => swiperRef.current?.slideNext()}
          onKeyDown={(e) => e.key === "Enter" && swiperRef.current?.slideNext()}
        >
          <img src="/images/icons/arrow.svg" alt="" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}