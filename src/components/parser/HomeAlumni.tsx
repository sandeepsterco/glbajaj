"use client";

import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
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
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div className="col-lg-10">
            <div className="grid">
              {/* LEFT */}
              <div className="left_col">
                <img
                  className="pattern_img"
                  src="/images/pattern/pattern2.png"
                />

                <div className="sec_title">
                  <h5 className="title24">GLBian Speaks</h5>
                  <h2 className="heading title48">
                    Success Stories from our Students and Alumni
                  </h2>
                </div>

                {/* Description */}
                <div className="desc_content">
                  <div className="quote-icon">
                    <img src="/images/icons/quote.png" alt="quote icon" />
                  </div>
                  {activeItem && (
                    <div className="desc active">{activeItem.message}</div>
                  )}
                </div>

                {/* Thumbs */}
                <div className="thumbs">
                  <div className="thumb-group active">
                    {currentItems.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={`thumb ${index === activeIndex ? "active" : ""}`}
                        onClick={() => setActiveIndex(index)}
                      >
                        <img src={item.image} alt={item.name} />
                        <div className="thumb_info">
                          <p className="name">{item.name}</p>
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
                <div className="main-images">
                  {activeItem && (
                    <img
                      className="main-img active w-100"
                      src={activeItem.image}
                      alt={activeItem.name}
                    />
                  )}
                </div>

                {/* Person Info */}
                <div className="tab_image_content">
                  {activeItem && (
                    <div className="person-info active">
                      <div className="name">{activeItem.name}</div>
                      <div className="role">{activeItem.branch}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
      </div></div>
    </div>
  );
}
