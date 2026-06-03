"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";
import type { Swiper as SwiperType } from "swiper";
import { useContainer25MaxWidth } from "@/src/hooks/useContainer25MaxWidth";
import Image from "next/image";

import "swiper/css";

const fetchFacilities = async () => {
  const { data, error } = await apiFetch("home-facilities-slides");
  if (error) throw new Error(error);
  return data;
};

export default function HomeFacilities() {
  const [activeTab, setActiveTab] = useState(0);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRefs = useRef<Record<number, SwiperType>>({});
  const containerRef = useContainer25MaxWidth();

  const { data } = useQuery({
    queryKey: ["home_facilities"],
    queryFn: fetchFacilities,
  });

  const tabsData = data?.homeFacilitiesSlides?.data;

  const rewireNavigation = (idx: number) => {
    const swiper = swiperRefs.current[idx];
    if (!swiper || !prevRef.current || !nextRef.current) return;
    (swiper.navigation as any).prevEl = prevRef.current;
    (swiper.navigation as any).nextEl = nextRef.current;
    swiper.navigation.update();
  };

  const handleTabChange = (idx: number) => {
    // On mobile, tapping the active accordion header closes it
    const next = activeTab === idx ? -1 : idx;
    setActiveTab(next);
    if (next !== -1) {
      setTimeout(() => rewireNavigation(next), 0);
    }
  };

  return (
    <section className="homeFac_sec">
      <div className="full-width">
        <div className="container25 max-content-lg pe-lg-0 me-lg-0">
          <div className="col-lg-11 ms-end">
            <div className="homeFac_main">
              <div className="homeFac_tabs_wrapper">
                <div className="homeFac_tabs">

                  {/* ── Desktop nav side ── */}
                  <div className="homeFac_nav_side">
                    <h4 className="font24" data-aos="fade-up" data-aos-delay="200">
                      Facilities
                    </h4>
                    <h3 className="title48" data-aos="fade-up" data-aos-delay="400">
                      The Best Environment for the Best Minds
                    </h3>

                    {/* Desktop tabs — hidden on mobile via CSS */}
                    <div className="homeFac_btns">
                      {tabsData?.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className={`homeFac_btn ${activeTab === idx ? "active" : ""}`}
                          onClick={() => handleTabChange(idx)}
                        >
                          <span>{item?.tab_title}</span>
                        </div>
                      ))}
                    </div>

                    <div className="navigation_btn" data-aos="fade-up" data-aos-delay="600">
                      <div
                        ref={prevRef}
                        className="swiper_prev_custom"
                        tabIndex={-1}
                        role="button"
                        aria-label="Previous slide"
                      >
                        <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
                      </div>
                      <div
                        ref={nextRef}
                        className="swiper_next_custom"
                        tabIndex={0}
                        role="button"
                        aria-label="Next slide"
                      >
                        <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
                      </div>
                    </div>
                  </div>

                  {/* ── Content panes ── */}
                  <div className="homeFac_content">
                    {tabsData?.map((item: any, idx: number) => (
                      <div
                        className={`homeFac_pane ${activeTab === idx ? "active" : ""}`}
                        key={`tabContent${idx}`}
                        id={`tab${idx}`}
                      >
                        {/* 
                          Accordion header — always rendered so it's always clickable.
                          Hidden on desktop via CSS (display: none inside homeFac_nav_side's
                          breakpoint), visible on mobile.
                        */}
                        {item?.tab_title && (
                          <div
                            className="homeFac_accHeader"
                            onClick={() => handleTabChange(idx)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={activeTab === idx}
                            onKeyDown={(e) => e.key === "Enter" && handleTabChange(idx)}
                          >
                            <span>{item.tab_title}</span>
                            <span className="homeFac_accChevron">
                              {activeTab === idx ? "▲" : "▼"}
                            </span>
                          </div>
                        )}

                        {/* Body only renders when this pane is active */}
                        <div className="homeFac_accBody">
                          <div className="homeFac_swiper_wrap">
                            {item?.mapping_items?.slides?.length > 0 && (
                              <Swiper
                                modules={[Navigation]}
                                spaceBetween={20}
                                slidesPerView={1.2}
                                loop={false}
                                navigation={{
                                  prevEl: prevRef.current,
                                  nextEl: nextRef.current,
                                }}
                                onBeforeInit={(swiper) => {
                                  swiperRefs.current[idx] = swiper;
                                  (swiper.params.navigation as any).prevEl = prevRef.current;
                                  (swiper.params.navigation as any).nextEl = nextRef.current;
                                }}
                                onSwiper={(swiper) => {
                                  if (idx === activeTab) {
                                    (swiper.navigation as any).prevEl = prevRef.current;
                                    (swiper.navigation as any).nextEl = nextRef.current;
                                    swiper.navigation.update();
                                  }
                                }}
                                breakpoints={{
                                  768: { slidesPerView: 2, spaceBetween: 15 },
                                  1200: { slidesPerView: 2.25, spaceBetween: 23 },
                                }}
                                className="homeFac_swiper"
                              >
                                {item.mapping_items.slides?.map((slide: any, slideIdx: number) => (
                                  <SwiperSlide key={slideIdx}>
                                    <figure>
                                      <Image
                                        src={slide?.image || ""}
                                        className="w-100 img-fluid"
                                        data-aos="fade-up"
                                        data-aos-delay="200"
                                        width={600}
                                        height={841}
                                        alt={slide?.title ?? "facilities"}
                                        loading="lazy"
                                      />
                                      {slide?.title && (
                                        <h4 className="font36" data-aos="fade-up" data-aos-delay="400">
                                          {slide.title}
                                        </h4>
                                      )}
                                    </figure>
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}