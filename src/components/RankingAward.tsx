"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function RankingAward() {
 const sliderData = [ { image: "/images/qsLeauge.png", content: ["Diamond rating by QS I-GAUGE", "All India Rating 2022"], }, { image: "/images/nirf.png", content: ["Top 200 Engineering Colleges", "Across India"], }, { image: "/images/NBA.png", content: ["CSE, ECE & IT Accredited", "by NBA"], }, { image: "/images/ariia.png", content: ["Excellence in Innovation", "Govt. of India"], }, { image: "/images/institue.png", content: ["5 Star Rating", "Ministry of Education"], }, { image: "/images/nirf.png", content: ["Top 200 Engineering Colleges", "Across India"], }, { image: "/images/NBA.png", content: ["CSE, ECE & IT Accredited", "by NBA"], }, { image: "/images/qsLeauge.png", content: ["Diamond rating by QS I-GAUGE", "All India Rating 2022"], }, { image: "/images/institue.png", content: ["5 Star Rating", "Ministry of Education"], }, ];

  return (
    <section className="bg-white py-48 font-sans">
      {/* Headings */}
      <div className="text-center mb-12">
       <h1 className="text-heading-small text-2xl leading-9 font-bold">GL Bajaj Ranking & Awards</h1>
        <h1 className="text-heading-big text-5xl leading-12 font-medium mt-5">Accolades That Reflect Our Commitment</h1>
      </div>

      {/* Swiper Container */}
      <div className="relative max-w-[900px] mx-auto px-12 mt-24">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          className="ranking-swiper"
        >
          {sliderData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-between group">
                {/* Content Box */}
                <div className="flex flex-col items-center text-center w-full px-4">
                  <div className="h-40 flex items-center justify-center mb-4">
                    <Image
                      src={item.image}
                      alt="award"
                      width={90}
                      height={90}
                      className="object-contain"
                    />
                  </div>

                  <div className="min-h-[50px] flex flex-col justify-start">
                    {item.content.map((line, i) => (
                    <p key={i} className="text-black text-xs leading-[10px] font-bold" > {line} </p>
                    ))}
                  </div>
                </div>

                {/* Vertical Divider - Fixed height & Color */}
              {index !== sliderData.length - 1 && ( <div className="hidden lg:block h-52 w-[2px] bg-gray-200 self-center"></div> )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows (XD Style) */}
        <button className="prev-btn absolute -left-48 top-1/2 -translate-y-1/2 z-10 text-orange-600 transition-colors text-lg">
          <span className="py-2 px-4 rounded-sm shadow-md bg-white">❮</span>
        </button>

        <button className="next-btn absolute -right-48 top-1/2 -translate-y-1/2 z-10 text-orange-600  transition-colors text-lg">
          <span className=" py-2 px-4 rounded-sm shadow-md bg-white">❯</span>
        </button>
      </div>
    </section>
  );
}