"use client";

import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";

const fetchAlumniData = async () => {
  const { data, error } = await apiFetch(`modular/home`);
  if (error) throw new Error(error);
  return data;
};

export default function DepartmentHomeMou() {
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
    <>

      <div className="dep_project_grid reverse">

        <div className="project_contentsec">
          <h4 className="font24">Projects</h4>
          <h3 className="font36">Innovative project solutions driving technical excellence, fostering creativity, and building impactful real-world applications.</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</p>
          <a href="{button_url}" className="cus-btn">View More</a>
        </div>


        <div className="proj_imgsec">
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
          <figure>
            <figure><img src="/images/default/department-project.webp" alt="GL Bajaj" /></figure>
          </figure>
        </div>

      </div>
    </>
  );
}
