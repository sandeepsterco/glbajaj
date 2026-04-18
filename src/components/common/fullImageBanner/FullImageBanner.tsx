"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaChevronRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";
import "./banner.css";
import NotificationBar from "../../ui/notificationBar/NotificationBar";

export default function HeroBanner({ data }: { data: any }) {
  return (
    <section className="home_banner">
      {/* ── Swiper Slider ── */}
      <Swiper
        className="home_slide"
        modules={[Pagination, Autoplay]}
        // loop={true}
        // autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onBeforeInit={(sw) => {
          sw.el.style.setProperty("--swiper-duration", "4000ms");
        }}
      >
        {data?.map((slide: any, index: number) => (
          <SwiperSlide key={index}>
            <picture>
              <source media="(min-width:992px)" srcSet={slide.desktopSrc} />
              <Image
                src={slide.image}
                alt={slide.heading || "banner image"}
                width={2545}
                height={1100}
                priority={index === 0}
                className="relative object-cover object-center"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </picture>

            <div className="slider_caption">
              <div className="container">
                <div className="caption_wrap">
                  {slide?.title && (
                    <blockquote className="title48">{slide.title}</blockquote>
                  )}
                  <div className="cap_desc">
                  {slide?.sub_title && <p>{slide.sub_title}</p>}
                  {slide?.url && (
                    <Link href={slide.url || "#"}>
                      <figure>
                        <Image
                          src="/images/home/hero/arrow_right.svg"
                          alt="Read more"
                          width={40}
                          height={40}
                        />
                      </figure>
                    </Link>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Notification Bar ── */}
      {/* <div className="hero_notificationmain">
        <div className="container">
          <div className="inner_center_container">
            <div className="hero_nofi_card">
              <h5 className="notifi_title">Notifications</h5>
              <div className="notifi_text">
                <p>
                  International Conference on Next-Generation Communication and
                  Computing • International Conference on Next-Generation  International Conference on Next-Generation Communication and
                  Computing • International Conference on Next-Generation
                </p>
                <div className="icon">
                  <FaChevronRight fontSize={12} />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div> */}

      <NotificationBar />
    </section>
  );
}