"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { BASE_URL } from "@/src/config/config";

import "swiper/css";
import "swiper/css/navigation";

export interface ClubItem {
  id?: string | number;
  title?: string;
  image: string;
  short_description?: string;
  slug?: string;
}

type Props = {
  clubs: ClubItem[];
};

export default function DepartmentClubsSlider({ clubs }: Props) {
  const shouldLoop = clubs.length > 1;
  const showNavigation = shouldLoop;

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={1.2}
      spaceBetween={20}
      loop={shouldLoop}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 30 },
        1200: { slidesPerView: 1, spaceBetween: 30 },
      }}
      navigation={{
        nextEl: ".department_home_clubs_next",
        prevEl: ".department_home_clubs_prev",
      }}
      className="activities_swiper"
    >
      {clubs.map((item, idx) => (
        <SwiperSlide key={item?.id || idx}>
          <div className="dep_clubs_card">
            <figure>
              <Image
                src={item.image}
                width={380}
                height={275}
                alt={item.title || "club"}
                data-aos="fade-up"
                data-aos-delay="200"
              />
            </figure>
            {item?.title && (
              <div className="dep_club_contents">
                <h3 className="font36 " data-aos="fade-up" data-aos-delay="200">
                  {item.title}
                </h3>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: item.short_description ?? "" }}
                  data-aos="fade-up"
                  data-aos-delay="200"
                />
                {item?.slug && (
                  <Link
                    href={BASE_URL + "student-corner/clubs/" + item.slug}
                    className="cus-btn "
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    View More
                  </Link>
                )}
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}

      {showNavigation && (
        <div className="navigation_btn" data-aos="fade-up" data-aos-delay="200">
          <div className="prev-btn swiper_prev_custom department_home_clubs_prev">
            <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
          </div>
          <div className="next-btn swiper_next_custom department_home_clubs_next">
            <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
          </div>
        </div>
      )}
    </Swiper>
  );
}