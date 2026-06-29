// DepartmentHomePlacements.tsx  (updated)
"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SkeletonGroup } from "../ui/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BASE_URL } from "@/src/config/config";
import Link from "next/link";

const SLIDES_PER_VIEW = 3;

const fetchDepartmentResearch = async (slug: string) => {
  const { data, error } = await apiFetch(`department/${slug}/home`);
  if (error) throw new Error(error);
  return data?.data?.modular?.['research'];
};

export default function DepartmentHomeResearch() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["department-research", slug],
    queryFn: () => fetchDepartmentResearch(slug),
  });

  const researchData: any[] = data ?? [];

  if (isLoading) {
    return (
      <SkeletonGroup
        wrapperClassName="!mt-[3rem] !block"
        count={1}
        className="bg-gray-300 h-[50rem] w-full"
      />
    );
  }

  if (isError) return;

  const canLoop = researchData.length > SLIDES_PER_VIEW;

  return (
    <>
      <Swiper
        className="cse_research_slider"
        modules={[Navigation]}
        // slidesPerView={SLIDES_PER_VIEW}
        spaceBetween={20}
        autoplay={false}
        loop={canLoop}
        navigation={canLoop ? {
          nextEl: ".department_research_next",
          prevEl: ".department_research_prev",
        } : false}
        breakpoints={{
          768: { slidesPerView: 2.5, spaceBetween: 15 },
          1200: { slidesPerView: 3.35, spaceBetween: 20 },
        }}
      >
        {researchData?.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="research_card">
              <figure>
                <Image src={item.image} alt={item.title ?? 'department research image'} className="img-fluid w-100" width={426} height={318} loading="lazy" />
              </figure>
              {item?.title && (
                <div className="res_caption">
                  <p>{item.title}</p>
                </div>
              )}
              {item?.slug && !item?.no_detail && (
                <Link className="strech_link" href={`${BASE_URL}department/${slug}/research/${item.slug}`} />
              )}
            </div>
          </SwiperSlide>
        ))}

        {canLoop && (
          <div className="navigation_btn">
            <div className="swiper_prev_custom department_research_prev"><img src="/images/icons/arrow.svg" alt="arrow"
              className="img-fluid" /></div>
            <div className="swiper_next_custom department_research_next"><img src="/images/icons/arrow.svg" alt="arrow"
              className="img-fluid" /></div>
          </div>
        )}
        
      </Swiper>

      
    </>
  );
}