"use client";

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Swiper React components & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useRef } from "react";

// Swiper core styles
import "swiper/css";

const getLeadership = async () => {
  const { data, error } = await apiFetch(`leadership`);
  if (error) throw new Error(error);
  return data;
};

export default function AboutLeadership() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["about-leadership"],
    queryFn: getLeadership,
  });

  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop();
  const sliderData = data?.leadership;

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="about_leadership">
      <div className="leadership_slider">
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
            // Assign refs before Swiper initializes so it can find them
            if (typeof swiper.params.navigation === "object") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            768: { slidesPerView: 2.5, spaceBetween: 15 },
            1200: { slidesPerView: 3.5, spaceBetween: 23 },
          }}
        >
          {sliderData?.length > 0 &&
            sliderData.map((item: any, idx: number) => (
              <SwiperSlide key={idx}>
                <div className="leader_card relative">
                  <figure>
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