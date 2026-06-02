"use client";

import { useState, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface MouImage {
  images: string;
}

interface MouItem {
  type: string;
  title: string;
  description: string;
  pdf: string;
  mapping_items: {
    images: MouImage[];
  };
  slug: string;
}

const fetchDepartmentMouData = async (slug: string) => {
  const { data, error } = await apiFetch(`department/${slug}/home`);
  if (error) throw new Error(error);
  return data?.data;
};

export default function DepartmentHomeMou() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["department_home_collaboration_mou", slug],
    queryFn: () => fetchDepartmentMouData(slug),
  });

  const mouData: MouItem[] = data?.modular?.["collaboration-mou"] ?? [];

  // Derive unique ordered tabs from the data
  const tabs = useMemo(() => {
    const seen = new Set<string>();
    return mouData
      .map((item) => item.type)
      .filter((type) => {
        if (seen.has(type)) return false;
        seen.add(type);
        return true;
      });
  }, [mouData]);

  const [activeTab, setActiveTab] = useState<string>("");
  const swiperRef = useRef<SwiperType | null>(null);

  // Set first tab once data loads
  const resolvedTab = activeTab || tabs[0] || "";

  // All items for the active tab
  const tabItems = useMemo(
    () => mouData.filter((item) => item.type === resolvedTab),
    [mouData, resolvedTab]
  );

  // Active item index within the tab
  const [activeItemIndex, setActiveItemIndex] = useState(0);
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

  if (isLoading || !activeItem) return null;

  return (
    <>
      {/* Dynamic Tabs */}
      <div className="mou_heading">
        <h4 className="font24">Collaborations & MOUs</h4>
        <div className="tabs tabs_design1">
          {tabs.map((type) => (
            <div
              key={type}
              className={`tab ${resolvedTab === type ? "active" : ""}`}
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
          {/* <h4 className="font24">Collaborations & MOUs</h4> */}
          <h3 className="font36">{activeItem.title}</h3>
          <p>{activeItem.description}</p>
          <a href={activeItem.pdf} target="_blank" rel="noopener noreferrer" className="cus-btn">
            PDF
          </a>
        </div>

        {/* Image Slider Section */}
        <div className="proj_imgsec">
          <Swiper
            key={`${resolvedTab}-${activeItemIndex}`}
            modules={[Navigation]}
            slidesPerView={1}
            navigation={hasMultiple ? {
              prevEl: ".collaboration_mou_prev",
              nextEl: ".collaboration_mou_next",
            } : false}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
          >
            {images.map((imgObj, i) => (
              <SwiperSlide key={i}>
                <figure>
                  <Image
                    src={imgObj.images}
                    alt={`${activeItem.title} image ${i + 1}`}
                    className="w-100 img-fluid"
                    width={850}
                    height={600}
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