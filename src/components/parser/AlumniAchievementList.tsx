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
  name?:string;
  mapping_items?:{
    paragraph:{para:string}[]
  }
}

const fetchAlumniAchievements = async (page: number) => {
  const { data, error } = await apiFetch(`alumni-achivement?page=${page}`);

  if (error) {
    throw new Error(error);
  }

  return data;
};

export default function AlumniAchievementList() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["alumni-achievement-list", page],
    queryFn: () => fetchAlumniAchievements(page),
  });

  if (isLoading || isError || !data) {
    return null;
  }

  const sliderItems = data?.featured ?? [];

  // On page 1, the grid should exclude the 5 items already shown in the slider.
  // On any other page, show all of that page's items.

  const gridItems = data?.alumni_achivement?.data ?? [];


    // page === 1
    //   ? achievementData?.data?.slice(5) ?? []
    //   : achievementData?.data ?? [];

  if (sliderItems.length === 0 && gridItems.length === 0) {
    return null;
  }

  const achievementData = data?.alumni_achivement;

  return (
    <>
      {sliderItems.length > 0 && (
        <div className="common_image_slider">
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
                    {item?.name && (
                      <h5 className="designation">{item.name}</h5>
                    )}
                    {item?.description && (
                      <blockquote>
                        <p dangerouslySetInnerHTML={{__html:item.description}} />
                      </blockquote>
                    )}
                    {item?.mapping_items?.paragraph && (
                      <div>
                        {item.mapping_items.paragraph.map((item, idx)=>(
                          <p key={idx} dangerouslySetInnerHTML={{__html:item.para}} />
                        ))}
                      </div>
                    )}
                    
                    <figure>
                      <Image
                        src="/images/pattern/alumni_achievement.webp"
                        alt="Pattern"
                        width={612}
                        height={119}
                        loading="lazy"
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
        </div>
        
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
                  {item?.name}
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