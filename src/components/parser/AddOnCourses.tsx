"use client";

import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";

const fetchCourses = async () => {
  const { data, error } = await apiFetch("modular/home");

  if (error) throw new Error(error);
  return data;
};

export default function AddOnCourses() {
  const { data, isLoading } = useQuery({
    queryKey: ["add_on_courses"],
    queryFn: fetchCourses,
  });

  const sliderData = data?.modular?.["facts-and-figure"];

  return (
    <div className="courses_slider">
      <div className="courses_header">
        <h4 className="title24">Mechanical Add-on Courses</h4>

        <div className="slider_btns">
          <div className="swiper-button-prev prev_swiper_btn"></div>
          <div className="swiper-button-next next_swiper_btn"></div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="swiper courses_slider_wrapper">
          <div className="swiper-wrapper">
            {sliderData &&
              sliderData.length > 0 &&
              sliderData.map((singleSlide: any, slideIdx: any) => (
                <div key={slideIdx} className="swiper-slide">
                  {singleSlide?.image && (
                    <span className="icon">
                      <img src={singleSlide.image} alt="internet logo" />
                    </span>
                  )}

                  {singleSlide?.title && <p>{singleSlide.title}</p>}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
