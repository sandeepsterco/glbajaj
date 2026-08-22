"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BASE_URL } from "@/src/config/config";
import PaginationWrapper from "../common/pagination/PaginationWrapper";

interface Achievement {
  id?: number | string;
  image?: string;
  designation?: string;
  description?: string;
}

const fetchAlumniAchievements = async (page: number) => {
  const { data, error } = await apiFetch(`award-recognitions?page=${page}`);

  if (error) {
    throw new Error(error);
  }

  return data?.awards;
};

export default function AlumniAchievementList() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  // Slider: ALWAYS from page 1, fetched once, never refetched on pagination changes
  const {
    data: sliderData,
    isLoading: isSliderLoading,
    isError: isSliderError,
  } = useQuery({
    queryKey: ["alumni-achievement-slider"],
    queryFn: () => fetchAlumniAchievements(1),
    staleTime: Infinity, // don't refetch this in the background
  });

  // Grid: follows the current page
  const {
    data: achievementData,
    isLoading: isGridLoading,
    isError: isGridError,
  } = useQuery({
    queryKey: ["alumni-achievement-list", page],
    queryFn: () => fetchAlumniAchievements(page),
  });

  if (isSliderLoading || isGridLoading || isSliderError || isGridError) {
    return null;
  }

  const sliderItems = sliderData?.data?.slice(0, 5) ?? [];

  // On page 1, the grid should exclude the 5 items already shown in the slider.
  // On any other page, show all of that page's items.
  const gridItems =
    page === 1
      ? achievementData?.data?.slice(5) ?? []
      : achievementData?.data ?? [];

  if (sliderItems.length === 0 && gridItems.length === 0) {
    return null;
  }

  return (
    <>
      {sliderItems.length > 0 && (
        <Swiper
          className="alumni_achievement_slider"
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={15}
          navigation={{
            nextEl: ".alumni_achievement_right",
            prevEl: ".alumni_achievement_left",
          }}
          loop={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {sliderItems.map((item: Achievement, idx: number) => (
            <SwiperSlide key={item.id ?? idx}>
              <div
                className="alumni-achivement-grid"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="alumni-achivement-cnt">
                  <figure>
                    <Image
                      src="https://glbitm.project-demo.in/assets/img/pages/61/section_1778655580_6a04215c39f92.webp"
                      alt="Pattern"
                      width={800}
                      height={600}
                      className="img-fluid w-100"
                    />
                  </figure>
                </div>

                <div className="alumni-achivement-img">
                  <div className="image_col">
                    <figure className="flash-effect-2">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt="Achievement"
                          width={800}
                          height={600}
                          className="img-fluid w-100"
                        />
                      )}
                    </figure>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {gridItems.length > 0 && (
        <>
          <div className="award-list achievements_grid">
            {gridItems.map((item: any, idx: number) => (
              <div key={idx} className="award-box relative achievement_box">
                <figure className="flash-effect">
                  <img
                    alt="award"
                    data-aos="fade-up"
                    loading="lazy"
                    width="600"
                    height="443"
                    className="w-100"
                    src={item?.image ?? ""}
                  />
                </figure>
                <p data-aos="fade-up" data-aos-delay="400" className="">
                  {item?.title}
                </p>
                <Link
                  className="strech_link"
                  href={`${BASE_URL}${currentSlug}/${item.slug}`}
                />
              </div>
            ))}
          </div>

          <PaginationWrapper
            currentPage={achievementData?.current_page || 1}
            totalPages={achievementData?.last_page || 1}
          />
        </>
      )}
    </>
  );
}