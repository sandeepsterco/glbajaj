"use client";

import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const fetchAlumniData = async () => {
  const { data, error } = await apiFetch(`modular/home`);
  if (error) throw new Error(error);
  return data;
};

export default function HomeAlumni() {
  const { data, isLoading } = useQuery({
    queryKey: ["home_alumni"],
    queryFn: fetchAlumniData,
  });

  const rawData = data?.modular?.["testimonials"] ?? [];

  const grouped: any = useMemo(() => ({
    students: rawData.filter((i: any) => i.type === "Student"),
    recruiters: rawData.filter((i: any) => i.type === "Recruiter"),
    faculties: rawData.filter((i: any) => i.type === "Faculties"),
    alumnies: rawData.filter((i: any) => i.type === "Alumni"),
  }), [rawData]);

  const tabs = [
    { key: "students", label: "Students" },
    { key: "recruiters", label: "Recruiters" },
    { key: "faculties", label: "Faculties" },
    { key: "alumnies", label: "Alumni" },
  ];

  const [activeTab, setActiveTab] = useState("students");
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for mobile swiper custom nav arrows
  const mobilePrevRef = useRef<HTMLDivElement>(null);
  const mobileNextRef = useRef<HTMLDivElement>(null);
  const mobileSwiperRef = useRef<SwiperType | null>(null);

  const handleTabClick = (tabKey: any) => {
    setActiveTab(tabKey);
    setActiveIndex(0);
    // Reset mobile swiper to first slide
    mobileSwiperRef.current?.slideTo(0);
  };

  const currentItems = grouped[activeTab] ?? [];
  const activeItem = currentItems[activeIndex];

  if (isLoading) return null;

  return (
    <div className="home_testimonials">
      <div className="container">
        <div className="grid">

          {/* ── LEFT col (desktop) ── */}
          <div className="left_col">
            <img className="pattern_img" src="/images/pattern/pattern2.png" alt="" />

            {/* sec_title — desktop only (hidden on mobile, rendered again below in mobile order) */}
            <div className="sec_title d-none d-lg-block">
              <h5 className="title24" data-aos="fade-up" data-aos-delay="200">GLBian Speaks</h5>
              <h2 className="heading title48" data-aos="fade-up" data-aos-delay="400">
                Our Success Stories
                 {/* from our Students and Alumni */}
              </h2>
            </div>

            {/* desc_content — desktop only */}
            <div className="desc_content d-none d-lg-block">
              <div className="quote-icon" data-aos="fade-up" data-aos-delay="600">
                <img src="/images/icons/quote.png" alt="quote icon" />
              </div>
              {activeItem && (
                <div className="desc active" data-aos="fade-up" data-aos-delay="800" dangerouslySetInnerHTML={{__html:activeItem?.message}} />
                  // {activeItem.message}
                // </div>
              )}
            </div>

            {/* Thumbs — desktop only */}
            <div className="thumbs d-none d-lg-block">
              <div className="thumb-group active" data-aos="fade-up" data-aos-delay="800">
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
              <h5 className="title24" data-aos="fade-up" data-aos-delay="200">GLBian Speaks</h5>
              <h2 className="heading title48" data-aos="fade-up" data-aos-delay="400">
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
              data-aos="fade-up"
              data-aos-delay="200"
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
                <div className="person-info active">
                  <div className="name" data-aos="fade-up" data-aos-delay="400">{activeItem.name}</div>
                  <div className="role" data-aos="fade-up" data-aos-delay="800">{activeItem.branch}</div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}