"use client";

import { useState, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

// ── Dummy Data ───────────────────────────────────────────────────────────────
const DUMMY_DATA = [
  {
    type: "Student",
    heading: "Projects",
    title: "Innovative project solutions driving technical excellence, fostering creativity, and building impactful real-world applications.",
    description: "Students at GL Bajaj have developed cutting-edge projects spanning AI, IoT, and web technologies. Their work bridges academic learning with industry demands, producing solutions that solve real-world problems and earn recognition at national hackathons and exhibitions.",
    button_url: "/students/projects",
    images: [
      "/images/default/department-project.webp",
      "/images/default/department-project.webp",
      "/images/default/department-project.webp",
    ],
  },
  {
    type: "Recruiter",
    heading: "Top Recruiters",
    title: "Leading companies trust GL Bajaj to deliver industry-ready graduates equipped with the latest technical skills.",
    description: "GL Bajaj has built strong relationships with 500+ recruiters including Google, Microsoft, Amazon, TCS, Infosys, and Wipro. Our placement cell works year-round to connect students with opportunities that match their skills and aspirations.",
    button_url: "/recruiters",
    images: [
      "/images/default/department-project.webp",
      "/images/default/department-project.webp",
      "/images/default/department-project.webp",
    ],
  },
  {
    type: "Faculties",
    heading: "Expert Faculty",
    title: "Experienced educators and researchers shaping the next generation of engineers and innovators.",
    description: "Our faculty comprises PhDs from premier institutes like IITs and NITs, industry veterans with decades of experience, and active researchers publishing in top-tier journals. Their mentorship goes beyond classrooms, guiding students in research, startups, and personal growth.",
    button_url: "/faculty",
    images: [
      "/images/default/department-project.webp",
      "/images/default/department-project.webp",
    ],
  },
];

// ── Types ────────────────────────────────────────────────────────────────────
interface TabItem {
  type: string;
  heading: string;
  title: string;
  description: string;
  button_url: string;
  images: string[];
}

// ── Component ────────────────────────────────────────────────────────────────
export default function DepartmentHomeMou() {
  const rawData: TabItem[] = DUMMY_DATA;

  const tabs = [
    { key: "Student", label: "Students" },
    { key: "Recruiter", label: "Recruiters" },
    { key: "Faculties", label: "Faculties" },
  ];

  const [activeTab, setActiveTab] = useState("Student");
  const swiperRef = useRef<SwiperType | null>(null);

  const activeItem = useMemo(
    () => rawData.find((i) => i.type === activeTab) ?? rawData[0],
    [activeTab]
  );

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    // Reset to first slide on tab change
    setTimeout(() => swiperRef.current?.slideTo(0), 0);
  };

  const hasMultiple = activeItem.images.length > 1;

  return (
    <>
      {/* Tabs */}
      <div className="tabs tabs_design1">
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

      {/* Main Grid */}
      <div className="dep_project_grid reverse">

        {/* Content Section */}
        <div className="project_contentsec">
          <h4 className="font24">{activeItem.heading}</h4>
          <h3 className="font36">{activeItem.title}</h3>
          <p>{activeItem.description}</p>
          <a href={activeItem.button_url} className="cus-btn">View More</a>
        </div>

        {/* Image Slider Section */}
        <div className="proj_imgsec">
          <Swiper
            key={activeTab}
            modules={[Navigation]}
            slidesPerView={1}
            navigation={hasMultiple ? {
              prevEl: `.collaboration_mou_prev`,
              nextEl: `.collaboration_mou_next`,
            } : false}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
          >
            {activeItem.images.map((src, i) => (
              <SwiperSlide key={i}>
                <figure>
                  <img
                    src={src}
                    alt={`${activeItem.heading} image ${i + 1}`}
                  />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom nav — only when more than 1 image */}
          {hasMultiple && (
            <div className="navigation_btn relative b-0 r-0">
              <div className="swiper_prev_custom collaboration_mou_prev" role="button" ><img alt="arrow" className="img-fluid" src="/images/icons/arrow.svg" /></div>
              <div className="swiper_next_custom collaboration_mou_next" role="button" ><img alt="arrow" className="img-fluid" src="/images/icons/arrow.svg" /></div>
            </div>
          )}
        
          
        </div>

      </div>
    </>
  );
}