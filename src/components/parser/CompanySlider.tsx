"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";
import { SkeletonGroup } from "../ui/Skeleton";
import Image from "next/image";

const fetchSliderData = async () => {
  const { data, error } = await apiFetch("modular/home", {
    revalidate: 300,
  });
  if (error) throw new Error(error);
  return data;
};

export default function CompanySlider() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["homePlacementsData"],
    queryFn: fetchSliderData,
  });

  const sliderData = data?.sections?.["placement-logos"];

  if (isLoading) {
    return (
      <SkeletonGroup count={5} className="bg-gray-300 h-[8.1rem] w-[100%]" />
    );
  }

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

      {sliderData && sliderData.length > 0 && (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
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
            1024: { slidesPerView: 5 },
          }}
          className="companySwiperReact"
        >
          {sliderData.map((slider: any, sliderIdx: number) => (
            <SwiperSlide key={sliderIdx} className="text-center">
              <Image
                src={slider?.logo}
                className=""
                width={224}
                height={81}
                alt={slider?.alt || "slider image"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
