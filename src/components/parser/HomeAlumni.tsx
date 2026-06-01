"use client";

import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useMemo } from "react";

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

  const rawData = data?.modular?.["alumuni"] ?? [];

  // Group by type
  const grouped: any = useMemo(() => {
    return {
      students: rawData.filter((i: any) => i.type === "Student"),
      recruiters: rawData.filter((i: any) => i.type === "Recruiter"),
      faculties: rawData.filter((i: any) => i.type === "Faculties"),
    };
  }, [rawData]);

  const tabs = [
    { key: "students", label: "Students" },
    { key: "recruiters", label: "Recruiters" },
    { key: "faculties", label: "Faculties" },
  ];

  const [activeTab, setActiveTab] = useState("students");
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset slide index when tab changes
  const handleTabClick = (tabKey: any) => {
    setActiveTab(tabKey);
    setActiveIndex(0);
  };

  const currentItems = grouped[activeTab] ?? [];
  const activeItem = currentItems[activeIndex];

  if (isLoading) return null; // or a skeleton

  return (
    <div className="home_testimonials">
      <div className="container">
        <div className="grid">
          {/* LEFT */}
          <div className="left_col">
            <img
              className="pattern_img"
              src="/images/pattern/pattern2.png"
            />

            <div className="sec_title">
              <h5 className="title24" data-aos="fade-up" data-aos-delay="200">GLBian Speaks</h5>
              <h2 className="heading title48" data-aos="fade-up" data-aos-delay="400">
                Success Stories from our Students and Alumni
              </h2>
            </div>

            {/* Description */}
            <div className="desc_content">
              <div className="quote-icon" data-aos="fade-up" data-aos-delay="600">
                <img src="/images/icons/quote.png" alt="quote icon" />
              </div>
              {activeItem && (
                <div className="desc active" data-aos="fade-up" data-aos-delay="800">{activeItem.message}</div>
              )}
            </div>

            {/* Thumbs */}
            <div className="thumbs">
              <div className="thumb-group active" data-aos="fade-up" data-aos-delay="800">
                {currentItems.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`thumb ${index === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <Image src={item.image} alt={item.name} width={155} height={188} loading="lazy" />
                    <div className="thumb_info">
                      <p className="name" >{item.name}</p>
                      <span className="designation">{item.branch}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right">
            {/* Tabs */}
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

            {/* Main Image */}
            <div className="main-images" data-aos="fade-up" data-aos-delay="200">
              {activeItem && (
                <Image
                  className="main-img active w-100"
                  src={activeItem.image}
                  width={600}
                  height={732}
                  loading="lazy"
                  alt={activeItem.name}
                />
              )}
            </div>

            {/* Person Info */}
            <div className="tab_image_content" >
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
