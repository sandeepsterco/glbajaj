"use client";

import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

export default function HomeAlumni({homeData}:{homeData:any}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const aos = (delay = "200") => mounted
    ? { "data-aos": "fade-up", "data-aos-delay": delay }
    : {}

  const rawData = homeData?.modular?.["testimonials"] ?? [];

  const grouped: any = useMemo(() => ({
    students: rawData.filter((i: any) => i.type === "Student"),
    recruiters: rawData.filter((i: any) => i.type === "Recruiter"),
    faculties: rawData.filter((i: any) => i.type === "Faculties"),
    alumnies: rawData.filter((i: any) => i.type === "Alumni"),
  }), [rawData]);

  const tabs = [
    { key: "alumnies", label: "Alumni" },
    { key: "recruiters", label: "Recruiters" },
    { key: "faculties", label: "Faculties" },
    { key: "students", label: "Students" },
  ];

  const [activeTab, setActiveTab] = useState("alumnies");
  const [activeIndex, setActiveIndex] = useState(0);

  const mobilePrevRef = useRef<HTMLDivElement>(null);
  const mobileNextRef = useRef<HTMLDivElement>(null);
  const mobileSwiperRef = useRef<SwiperType | null>(null);

  const handleTabClick = (tabKey: any) => {
    setActiveTab(tabKey);
    setActiveIndex(0);
    mobileSwiperRef.current?.slideTo(0);
  };

  const currentItems = grouped[activeTab] ?? [];
  const activeItem = currentItems[activeIndex];

  return (
    <div className="home_testimonials">
      <div className="container">
        <div className="grid">

          <div className="left_col">
            <img className="pattern_img" src="/images/pattern/pattern2.png" alt="pattern image" />

            <div className="sec_title d-none d-lg-block">
              <h5 className="title24" {...aos("200")}>GLBian Speaks</h5>
              <h2 className="heading title48"  {...aos("200")}>
                Our Success Stories
                 {/* from our Students and Alumni */}
              </h2>
            </div>

            {/* desc_content — desktop only */}
            <div className="desc_content d-none d-lg-block">
              <div className="quote-icon"  {...aos("200")}>
                <img src="/images/icons/quote.png" alt="quote icon" />
              </div>
              {activeItem && (
                <div className="desc active" {...aos("200")} dangerouslySetInnerHTML={{__html:activeItem?.message}} />
                  // {activeItem.message}
                // </div>
              )}
            </div>

            {/* Thumbs — desktop only */}
            <div className="thumbs d-none d-lg-block">
              <div className="thumb-group active" {...aos("200")}>
                {currentItems.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`thumb ${index === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <figure><Image src={item.image} alt={item.name} width={155} height={188} loading="lazy" /></figure>
                    <div className="thumb_info">
                      <p className="name">{item.name}</p>
                      <span className="designation">{item.branch}</span>
                      <p className="designation">{item.course}</p>
                      <p className="designation1">{item.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT col (desktop) ── */}
          <div className="right">

            {/* Mobile-only: sec_title at top */}
            <div className="sec_title d-block d-lg-none">
              <h5 className="title24" {...aos("200")}>GLBian Speaks</h5>
              <h2 className="heading title48" {...aos("200")}>
                Success Stories from our Students and Alumni
              </h2>
            </div>

            {/* Tabs — shared, always visible */}
            <div className="tabs">
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  className={`tab ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => handleTabClick(tab.key)}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Mobile-only: desc_content below tabs */}
            <div className="desc_content d-block d-lg-none">
              <div className="quote-icon">
                <img src="/images/icons/quote.png" alt="quote icon" />
              </div>
              {activeItem && (
                <div className="desc active">{activeItem.message}</div>
              )}
            </div>

            {/* ── Desktop: static main image ── */}
            <div
              className="main-images d-none d-lg-block"
              {...aos("200")}
            >
              {activeItem && (
                <figure className="flash-effect">
                  <Image
                    className="main-img active w-100"
                    src={activeItem.image}
                    width={600}
                    height={732}
                    loading="lazy"
                    alt={activeItem.name}
                  />
                </figure>
              )}
            </div>

            {/* ── Mobile: swiper slider ── */}
            <div className="main-images mobile_slider d-block d-lg-none">
              {/* Custom nav arrows */}
              <div className="main_nv">
                <div
                  ref={mobilePrevRef}
                  className="swiper_prev_custom mobile_slider_prev"
                  role="button"
                  aria-label="Previous"
                >
                  <img src="/images/icons/arrow.svg" alt="prev" className="img-fluid" />
                </div>
                <div
                  ref={mobileNextRef}
                  className="swiper_next_custom mobile_slider_next"
                  role="button"
                  aria-label="Next"
                >
                  <img src="/images/icons/arrow.svg" alt="next" className="img-fluid" />
                </div>
              </div>
              

              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={0}
                loop={currentItems.length > 1}
                navigation={{
                  prevEl: mobilePrevRef.current,
                  nextEl: mobileNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  mobileSwiperRef.current = swiper;
                  (swiper.params.navigation as any).prevEl = mobilePrevRef.current;
                  (swiper.params.navigation as any).nextEl = mobileNextRef.current;
                }}
                onSwiper={(swiper) => {
                  mobileSwiperRef.current = swiper;
                  (swiper.navigation as any).prevEl = mobilePrevRef.current;
                  (swiper.navigation as any).nextEl = mobileNextRef.current;
                  swiper.navigation.update();
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                className="alumni_mobile_swiper"
              >
                {currentItems.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="mobile_slide_wrap">
                      <Image
                        className="w-100"
                        src={item.image}
                        width={600}
                        height={732}
                        loading="lazy"
                        alt={item.name}
                      />
                      {/* Person info inside each slide on mobile */}
                      <div className="tab_image_content">
                        <div className="person-info active">
                          <div className="name">{item.name}</div>
                          <div className="role">{item.branch}</div>
                          <p className="course">{item.course}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Person info — desktop only (below static image) */}
            <div className="tab_image_content d-none d-lg-block">
              {activeItem && (
                <div className="person-info active" {...aos("200")}>
                  <div className="name">{activeItem.name}</div>
                  <div className="role" >{activeItem.branch}</div>
                  <p className="course">{activeItem.course}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}