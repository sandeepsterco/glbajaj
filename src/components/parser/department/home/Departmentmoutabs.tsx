"use client";

// Client component: tab/sub-nav state and Swiper need the browser.
import { useState, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

interface MouImage {
  images: string;
}

export interface MouItem {
  type: string;
  title: string;
  description: string;
  pdf: string;
  mapping_items: {
    images: MouImage[];
  };
  slug: string;
}

type Props = {
  items: MouItem[];
};

export default function DepartmentMouTabs({ items }: Props) {
  // Unique, ordered tab names derived from the data
  const tabs = useMemo(() => Array.from(new Set(items.map((item) => item.type))), [items]);

  const [activeTab, setActiveTab] = useState<string>(tabs[0] ?? "");
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // All items for the active tab
  const tabItems = useMemo(
    () => items.filter((item) => item.type === activeTab),
    [items, activeTab]
  );

  const activeItem: MouItem | undefined = tabItems[activeItemIndex];

  const images = activeItem?.mapping_items?.images ?? [];
  const hasMultiple = images.length > 1;

  const handleTabClick = (type: string) => {
    setActiveTab(type);
    setActiveItemIndex(0);
    setTimeout(() => swiperRef.current?.slideTo(0), 0);
  };

  const handleItemClick = (idx: number) => {
    setActiveItemIndex(idx);
    setTimeout(() => swiperRef.current?.slideTo(0), 0);
  };

  if (!activeItem) return null;

  return (
    <>
      {/* Dynamic Tabs */}
      <div className="mou_heading">
        <h4 className="font24" data-aos="fade-up" data-aos-delay="200">Collaborations & MOUs</h4>
        <div className="tabs tabs_design1" data-aos="fade-up" data-aos-delay="400">
          {tabs.map((type) => (
            <div
              key={type}
              className={`tab ${activeTab === type ? "active" : ""}`}
              onClick={() => handleTabClick(type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      {tabItems.length > 1 && (
        <div className="tab_subnav">
          {tabItems.map((item, idx) => (
            <button
              key={item.slug}
              className={`subnav_btn ${activeItemIndex === idx ? "active" : ""}`}
              onClick={() => handleItemClick(idx)}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}

      {/* Main Grid */}
      <div className="dep_project_grid reverse">
        {/* Content Section */}
        <div className="project_contentsec">
          <h3 className="font36" data-aos="fade-up" data-aos-delay="200">{activeItem.title}</h3>
          <p
            dangerouslySetInnerHTML={{ __html: activeItem.description }}
            data-aos="fade-up"
            data-aos-delay="400"
          ></p>
          {activeItem.pdf && (
            <a href={activeItem.pdf} target="_blank" rel="noopener noreferrer" className="cus-btn">
              PDF
            </a>
          )}
        </div>

        {/* Image Slider Section */}
        <div className="proj_imgsec">
          <Swiper
            key={`${activeTab}-${activeItemIndex}`}
            modules={[Navigation]}
            slidesPerView={1}
            navigation={
              hasMultiple
                ? {
                    prevEl: ".collaboration_mou_prev",
                    nextEl: ".collaboration_mou_next",
                  }
                : false
            }
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {images.map((imgObj, i) => (
              <SwiperSlide key={i}>
                <figure className="flash-effect media_grid_Bx3">
                  <Image
                    src={imgObj.images}
                    alt={`${activeItem.title} image ${i + 1}`}
                    className="w-100 img-fluid"
                    width={850}
                    height={600}
                    loading="lazy"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nav buttons — only when more than 1 image */}
          {hasMultiple && (
            <div className="navigation_btn relative b-0 r-0">
              <div className="swiper_prev_custom collaboration_mou_prev" role="button">
                <img alt="prev" className="img-fluid" src="/images/icons/arrow.svg" />
              </div>
              <div className="swiper_next_custom collaboration_mou_next" role="button">
                <img alt="next" className="img-fluid" src="/images/icons/arrow.svg" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}