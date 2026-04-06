"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function CompanySlider() {
  return (
    <div className="relative">
      {/* Custom Navigation */}
      <div className="absolute right-4 top-4 flex gap-2 z-10">
        <div className="prevCompanyReact w-7 h-7 bg-white flex items-center justify-center text-red-500 cursor-pointer rounded shadow">
          ‹
        </div>
        <div className="nextCompanyReact w-7 h-7 bg-white flex items-center justify-center text-red-500 cursor-pointer rounded shadow">
          ›
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        loop={false}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".prevCompanyReact",
          nextEl: ".nextCompanyReact",
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
        className="companySwiperReact"
      >
        <SwiperSlide className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Palo_Alto_Networks_logo.svg"
            className="h-8 mx-auto"
            alt="Palo Alto"
          />
        </SwiperSlide>

        <SwiperSlide className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg"
            className="h-8 mx-auto"
            alt="ServiceNow"
          />
        </SwiperSlide>

        <SwiperSlide className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Autodesk_Logo.svg"
            className="h-8 mx-auto"
            alt="Autodesk"
          />
        </SwiperSlide>

        <SwiperSlide className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Commvault_logo.svg"
            className="h-8 mx-auto"
            alt="Commvault"
          />
        </SwiperSlide>

        <SwiperSlide className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg"
            className="h-8 mx-auto"
            alt="Walmart"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
