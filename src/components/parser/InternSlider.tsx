"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";

interface Achievement {
  id?: number | string;
  slug?: string;
  image?: string;
  logo_image?: string;
  designation?: string;
  description?: string;
  name?: string;
  course?: string;
  batch?: string;
  mapping_items?: {
    paragraph: { para: string }[];
  };
}

const fetchInternSlider = async () => {
  const { data, error } = await apiFetch(`intern`);

  if (error) {
    throw new Error(error);
  }

  return data;
};

export default function InternSlider() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["intern-list"],
    queryFn: () => fetchInternSlider(),
  });

  if (isLoading || isError || !data) {
    return null;
  }

  const sliderItems: Achievement[] = data?.intern ?? [];

  if (sliderItems.length === 0) {
    return null;
  }

  return (
    <div className="common_image_slider">
      <Swiper
        className=""
        modules={[Navigation, Autoplay]}
        slidesPerView={4}
        spaceBetween={15}
        // navigation={{
        //   nextEl: ".alumni_achievement_right",
        //   prevEl: ".alumni_achievement_left",
        // }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {sliderItems.map((item, idx) => (
          <SwiperSlide key={item.id ?? idx}>
            <div className="place_box relative">
              <div
                className="place_imgbox aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <figure className="flash-effect-2">
                  <Image src={item.image ?? ""} alt={item.name ?? "internship image"} width={600} height={732} loading="lazy" />
                </figure>
                {item.logo_image && (
                  <div className="place_complog">
                    <figure>
                      <img src={item.logo_image} alt="company logo" />
                    </figure>
                  </div>
                )}
              </div>
              <div className="place_infobox">
                <h3
                  data-aos="fade-up"
                  data-aos-delay="400"
                  className="aos-init aos-animate"
                >
                  {item.name}
                </h3>
                <p
                  data-aos="fade-up"
                  data-aos-delay="600"
                  className="aos-init aos-animate"
                >
                  {item.course && (
                    <>
                      <strong>{item.course}</strong> |{" "}
                    </>
                  )}
                  {item.batch && (
                    <>
                      Batch <strong>{item.batch}</strong>
                    </>
                  )}
                </p>
              </div>
              <a
                className="strech_link"
                href={`/internship/${item.slug ?? "#"}`}
              ></a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}