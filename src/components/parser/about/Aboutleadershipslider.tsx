"use client";

// Client component: Swiper with external nav buttons needs refs and the browser.
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { BASE_URL } from "@/src/config/config";

// Swiper core styles
import "swiper/css";

export interface LeaderItem {
  name: string;
  about_image: string;
  designation?: string;
  slug?: string;
}

type Props = {
  leaders: LeaderItem[];
};

export default function AboutLeadershipSlider({ leaders }: Props) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="about_leadership">
      <div className="leadership_slider" data-swiper-react>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1.2}
          spaceBetween={20}
          centeredSlides={false}
          loop={false}
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
          onSwiper={(swiper: SwiperType) => {
            if (typeof swiper.params.navigation === "object") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
            swiper.navigation?.init();
            swiper.navigation?.update();
          }}
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
                    alt={item.name}
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
                    href={`${BASE_URL}messages-and-administration/${item.slug}`}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

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