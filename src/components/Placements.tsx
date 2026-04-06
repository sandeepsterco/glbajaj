"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Placements() {
  const stats = [
    { value: "600+", label: "No. of Recruiters" },
    { value: "₹7.35 LPA", label: "Average Package" },
    { value: "₹58 LPA", label: "Highest Salary Package" },
  ];

  const students = [
    { name: "Ankan Chanda", lpa: "57", company: "/paloalto.png", img: "/student1.png" },
    { name: "Neeru Kapoor", lpa: "47", company: "/microsoft.png", img: "/student2.png" },
    { name: "Rachna Bharti", lpa: "46.38", company: "/amazon.png", img: "/student3.png" },
  ];

  return (
    <section className="bg-[#EEEEEE] py-16 px-4 md:px-10">
      <div className="container">
        {/* HEADER SECTION: Title + Stats */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 border-b border-gray-100 pb-10">
          <div className="max-w-md">
            <span className="text-[#8b6b3d] font-bold text-sm uppercase tracking-widest">Placements</span>
            <h2 className="text-4xl font-serif text-[#8b6b3d] leading-tight mt-2">
              GLBians Working With World's Largest Companies
            </h2>
          </div>

          <div className="flex flex-wrap gap-12 mt-8 lg:mt-0">
            {stats.map((stat, i) => (
              <div key={i} className="flex gap-6 items-center">
                {/* Vertical Divider */}
                <div className="h-16 w-[1px] bg-gray-300 hidden sm:block"></div>
                <div>
                  <h3 className="text-3xl font-light text-gray-800">{stat.value}</h3>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STUDENT CARDS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          
          {/* Static Info Box */}
          <div className="bg-[#fcfcfc] border-t-4 border-yellow-500 p-8 flex flex-col justify-between relative overflow-hidden">
             {/* ZigZag Background pattern simulation */}
             <div className="absolute inset-0 opacity-5 pointer-events-none" 
                  style={{ backgroundImage: `url('/zigzag.png')`, backgroundSize: '40px' }}></div>
             
             <h4 className="text-xl font-bold text-[#8b6b3d] relative z-10">Top Placed GLBian 2025</h4>
             
             <div className="flex gap-2 relative z-10">
                <button className="w-8 h-8 border border-gray-200 flex items-center justify-center text-xs text-gray-400">❮</button>
                <button className="w-8 h-8 border border-gray-200 flex items-center justify-center text-xs text-gray-400">❯</button>
             </div>
          </div>

          {/* Student Cards */}
          {students.map((student, i) => (
            <div key={i} className="flex flex-col">
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <Image src={student.img} alt={student.name} fill className="object-cover" />
                {/* Company Logo Overlay */}
                <div className="absolute top-4 right-4 w-20 h-8">
                   {/* <Image src={student.company} alt="logo" fill className="object-contain" /> */}
                </div>
              </div>
              <div className="py-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-800">{student.lpa}</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase">LPA</span>
                <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
                <span className="text-xs font-bold text-gray-700">{student.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* LOGO SLIDER SECTION */}
        <div className="bg-[#fcfcfc] p-6 border border-gray-100 flex items-center gap-8">
            <span className="text-sm font-bold text-[#8b6b3d] whitespace-nowrap">Top-Tier Companies in Our Placement Network</span>
            <div className="flex-1 flex justify-around items-center opacity-70 grayscale">
                <img src="/paloalto.png" className="h-6 object-contain" alt="paloalto" />
                <img src="/servicenow.png" className="h-6 object-contain" alt="servicenow" />
                <img src="/autodesk.png" className="h-6 object-contain" alt="autodesk" />
                <img src="/commvault.png" className="h-6 object-contain" alt="commvault" />
                <img src="/walmart.png" className="h-6 object-contain" alt="walmart" />
            </div>
            <div className="flex gap-2">
                <button className="w-6 h-6 border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">❮</button>
                <button className="w-6 h-6 border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">❯</button>
            </div>
        </div>

      </div>
    </section>
  );
}