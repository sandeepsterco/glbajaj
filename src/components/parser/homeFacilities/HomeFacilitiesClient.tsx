"use client";

import { useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useContainer25MaxWidth } from "@/src/hooks/useContainer25MaxWidth";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";

import "swiper/css";

type Slide = {
  image?: string;
  title?: string;
  slug?: string;
};

type Tab = {
  tab_title?: string;
  mapping_items?: { slides?: Slide[] };
};

interface HomeFacilitiesClientProps {
  tabsData: Tab[];
}

export default function HomeFacilitiesClient({ tabsData }: HomeFacilitiesClientProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [navState, setNavState] = useState({ isBeginning: true, isEnd: false });
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRefs = useRef<Record<number, SwiperType>>({});
  const containerRef = useContainer25MaxWidth();

  const VISIBLE_SLIDES = 2.25;

  const getSlideCount = (idx: number) =>
    tabsData?.[idx]?.mapping_items?.slides?.length ?? 0;

  const showNav = (idx: number) => idx !== -1 && getSlideCount(idx) > Math.floor(VISIBLE_SLIDES);

  const updateNavState = useCallback((swiper: SwiperType) => {
    setNavState({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  }, []);

  const rewireNavigation = useCallback((idx: number) => {
    const swiper = swiperRefs.current[idx];
    if (!swiper || !prevRef.current || !nextRef.current) return;

    swiper.navigation.destroy();

    (swiper.params.navigation as any).prevEl = prevRef.current;
    (swiper.params.navigation as any).nextEl = nextRef.current;
    (swiper.navigation as any).prevEl = prevRef.current;
    (swiper.navigation as any).nextEl = nextRef.current;

    swiper.navigation.init();
    swiper.navigation.update();
    updateNavState(swiper);
  }, [updateNavState]);

  const handleTabChange = (idx: number) => {
    const next = activeTab === idx ? -1 : idx;
    setActiveTab(next);

    if (next !== -1) {
      const count = getSlideCount(next);
      setNavState({
        isBeginning: true,
        isEnd: count <= Math.ceil(VISIBLE_SLIDES),
      });
      setTimeout(() => rewireNavigation(next), 0);
    }
  };

  return (
    <section className="homeFac_sec">
      <div className="full-width">
        <div className="container25 max-content-lg pe-lg-0 me-lg-0">
          <div className="col-lg-12 ms-end">
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

                    <div className="homeFac_btns">
                      {tabsData?.map((item, idx) => (
                        <div
                          key={idx}
                          className={`homeFac_btn ${activeTab === idx ? "active" : ""}`}
                          onClick={() => handleTabChange(idx)}
                        >
                          <span>{item?.tab_title}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      className="navigation_btn"
                      style={{ visibility: showNav(activeTab) ? "visible" : "hidden" }}
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      <div
                        ref={prevRef}
                        className={`swiper_prev_custom ${navState.isBeginning ? "disabled" : ""}`}
                        tabIndex={navState.isBeginning ? -1 : 0}
                        role="button"
                        aria-label="Previous slide"
                        aria-disabled={navState.isBeginning}
                      >
                        <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
                      </div>
                      <div
                        ref={nextRef}
                        className={`swiper_next_custom ${navState.isEnd ? "disabled" : ""}`}
                        tabIndex={navState.isEnd ? -1 : 0}
                        role="button"
                        aria-label="Next slide"
                        aria-disabled={navState.isEnd}
                      >
                        <img src="/images/icons/arrow.svg" alt="arrow" className="img-fluid" />
                      </div>
                    </div>
                  </div>

                  {/* ── Content panes ── */}
                  <div className="homeFac_content">
                    {tabsData?.map((item, idx) => (
                      <div
                        className={`homeFac_pane ${activeTab === idx ? "active" : ""}`}
                        key={`tabContent${idx}`}
                        id={`tab${idx}`}
                      >
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

                        <div className="homeFac_accBody">
                          <div className="homeFac_swiper_wrap">
                            {item?.mapping_items?.slides && item.mapping_items.slides.length > 0 && (
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
                                  swiperRefs.current[idx] = swiper;
                                  if (idx === activeTab) {
                                    rewireNavigation(idx);
                                  }
                                }}
                                onSlideChange={(swiper) => {
                                  if (idx === activeTab) updateNavState(swiper);
                                }}
                                onReachBeginning={(swiper) => {
                                  if (idx === activeTab) updateNavState(swiper);
                                }}
                                onReachEnd={(swiper) => {
                                  if (idx === activeTab) updateNavState(swiper);
                                }}
                                breakpoints={{
                                  640: { slidesPerView: 2, spaceBetween: 15 },
                                  991: { slidesPerView: 2.25, spaceBetween: 15 },
                                  1200: { slidesPerView: 3, spaceBetween: 23 },
                                }}
                                className="homeFac_swiper"
                              >
                                {item.mapping_items.slides.map((slide, slideIdx) => (
                                  <SwiperSlide key={slideIdx}>
                                    <figure className="flash-effect">
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
                                      {slide?.slug && (
                                        <Link className="strech_link" href={`${BASE_URL}${slide.slug}`} />
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