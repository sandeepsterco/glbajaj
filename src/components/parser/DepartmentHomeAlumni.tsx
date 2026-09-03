"use client"

import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, EffectFade, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";
import ApiError from "../ui/ApiError";
import NoData from "../ui/NoData";

interface AlumniItem {
  name: string;
  image: string;
  branch: string;
  message: string;
  type: string;
  designation:string;
}

const getDepartmentAlumni = async (slug: string): Promise<AlumniItem[]> => {
  const { data, error } = await apiFetch(`department/${slug}/home`);
  if (error) throw new Error(error);
  return data?.data?.modular?.testimonials ?? [];
};

export default function DepartmentHomeAlumni() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean).pop() ?? '';

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const { data, isLoading, isError } = useQuery<AlumniItem[]>({
    queryKey: ["department-home-alumni", slug],
    queryFn: () => getDepartmentAlumni(slug),
  });

  if (isLoading) {
    return (
      <SkeletonGroup
        wrapperClassName="!block mt-[7.7rem] !ml-0"
        className="bg-gray-300 h-[20rem] w-full"
      />
    );
  }

  if(isError){
    return (
      <ApiError />
    )
  }

  if(!data?.length){
    return (
      <NoData />
    )
  }

  return (
    <div className="ats_swip_slider">

      <div className="ats_slid_Sec">
        <Swiper
          className="training_testi"
          modules={[EffectFade, Thumbs, Mousewheel]}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          autoplay={{
            delay:3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          mousewheel={{ invert: false, sensitivity: 1, forceToAxis: true }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="ats_slid_box">
                <div className="ats_textbox">
                  <div className="quote-icon" data-aos="fade-up" data-aos-delay="200">
                    <img src="/images/icons/quote.png" alt="quote icon" />
                  </div>
                  <p data-aos="fade-up" data-aos-delay="400" dangerouslySetInnerHTML={{ __html: item?.message }} />
                </div>

                <div className="ats_imgbx">
                  <img src={item.image} className="img-fluid w-100" alt={item.name} data-aos="fade-up" data-aos-delay="600" />
                  <div className="ats_authinfo">
                    <div className="ats_auname" data-aos="fade-up" data-aos-delay="800">{item.name}</div>
                    <div className="ats_auth_dis" data-aos="fade-up" data-aos-delay="1000">{item.designation}</div>
                    <div className="ats_auth_dis mt-0 batch" data-aos="fade-up" data-aos-delay="1000">{item.branch}</div>
                    
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="ats_thumbsec">
        <Swiper
          className="traing_thumb"
          modules={[FreeMode, Thumbs, Mousewheel]}
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={56}
          freeMode={true}
          watchSlidesProgress={true}
          mousewheel={{ sensitivity: 1 }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="swiper_thumbox">
                <div className="pt_thumb_img">
                  <Image src={item.image} className="img-fluid w-100" alt={item.name} width={166} height={186} loading="lazy" />
                </div>
                <div className="thu_info">
                  <p className="name">{item.name}</p>
                  <p className="designation1 !mb-0">{item.designation}</p>
                  <p className="designation">{item.branch}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
}