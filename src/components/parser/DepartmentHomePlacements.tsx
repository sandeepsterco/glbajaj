// DepartmentHomePlacements.tsx  (updated)
"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SkeletonGroup } from "../ui/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ApiError from "../ui/ApiError";
import NoData from "../ui/NoData";

const SLIDES_PER_VIEW = 3;

const fetchDepartmentFacultyGrid = async (slug: string) => {
  const { data, error } = await apiFetch(`department/${slug}/home`);
  if (error) throw new Error(error);
  return data?.data?.modular?.['intern-placement'];
};

export default function DepartmentHomePlacements() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["department_faculty_grid", slug],
    queryFn: () => fetchDepartmentFacultyGrid(slug),
  });

  const placementData: any[] = data ?? [];

  if (isLoading) {
    return (
      <SkeletonGroup
        wrapperClassName="!mt-[3rem] !block"
        count={1}
        className="bg-gray-300 h-[50rem] w-full"
      />
    );
  }

  if (isError) {
    return (
      <div className="home_placement_students deparment_page_placemen">
        <ApiError />
      </div>
    );
  }

  if (!placementData?.length) {
    return (
      <div className="home_placement_students deparment_page_placemen">
        <NoData />
      </div>
    );
  }

  const canLoop = placementData.length > SLIDES_PER_VIEW;

  return (
    <div className="home_placement_students deparment_page_placemen">
      <div className="home_placement_static_card">
        <div className="home_placement_top_bar" data-aos="fade-up" data-aos-delay="200"></div>
        <h4 className="top_placed" data-aos="fade-up" data-aos-delay="400">Top Placed GLBian</h4>

        <div className={`slider_btns ${!canLoop ? "!hidden" : ""}`}>
          <div className="swiper-button-prev prev_swiper_btn"></div>
          <div className="swiper-button-next next_swiper_btn"></div>
        </div>

        <img src="/images/pattern/pattern1.png" className="pattern" alt="" />
      </div>

      <div className="right_slider">
        <Swiper
          className="home_placement_student_slider"
          modules={[Navigation]}
          slidesPerView={SLIDES_PER_VIEW}
          spaceBetween={27}
          loop={canLoop}
          navigation={canLoop ? {
            nextEl: ".home_placement_static_card .next_swiper_btn",
            prevEl: ".home_placement_static_card .prev_swiper_btn",
          } : false}
        >
          {placementData.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <figure><Image src={item.image} alt={item.name} width={349} height={409} loading="lazy" data-aos="fade-up" data-aos-delay="200"/></figure>
              <div className="placem_cnt"><img
                src={item?.logo_image}
                className="placement_img"
                alt="placement company"
              data-aos="fade-up" data-aos-delay="200"/>
              <div className="home_placement_info">
                <h3 className="placement" data-aos="fade-up" data-aos-delay="400">
                  {item?.package}<sup>LPA</sup>
                </h3>
                <p data-aos="fade-up" data-aos-delay="600">{item.name}</p>
              </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}