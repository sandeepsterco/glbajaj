"use client";

import Image from "next/image";
import Link from "next/link";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BASE_URL } from "@/src/config/config";

import "swiper/css";
import "swiper/css/navigation";

export interface LabItem {
  title?: string;
  image?: string;
  url?: string;
}

type Props = {
  labs: LabItem[];
};

export default function DepartmentLaboratoriesSlider({ labs }: Props) {
  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1.2}
      spaceBetween={20}
      loop={true}
      breakpoints={{
        768: { slidesPerView: 2.5, spaceBetween: 15 },
        1200: { slidesPerView: 3, spaceBetween: 40 },
      }}
      navigation={{
        nextEl: ".department_lab_next",
        prevEl: ".department_lab_prev",
      }}
      className="cse_lab_slider"
    >
      {labs.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="lab_card">
            <figure className="flash-effect-2">
              <Image
                src={item.image || "/images/default/laboratories.webp"}
                width={600}
                height={715}
                alt={item.title || "laboratory image"}
                className="img-fluid w-100"
                data-aos="fade-up"
                data-aos-delay="600"
              />
            </figure>
            {item?.title && (
              <h4 className="font36" data-aos="fade-up" data-aos-delay="800">
                {item.title}
              </h4>
            )}
            {item?.url && (
              <Link
                className="strech_link"
                href={BASE_URL + "department/laboratories/" + item.url}
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                {" "}
              </Link>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}