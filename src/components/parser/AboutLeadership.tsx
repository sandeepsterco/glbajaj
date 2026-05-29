"use client";

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

const getLeadership = async () => {
  const { data, error } = await apiFetch(`leadership`);

  if (error) throw new Error(error);
  return data;
};

export default function AboutLeadership() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["about-leadership"],
    queryFn: getLeadership,
  });

  const pathname = usePathname();

  const slug = pathname.split("/").filter(Boolean).pop();

  const sliderData = data?.leadership;

  return (
    <div className="about_leadership">
      <div className="leadership_slider swiper">
        <div className="swiper-wrapper">
          {sliderData?.length > 0 &&
            sliderData.map((item: any, idx: number) => (
              <div key={idx} className="swiper-slide">
                <div className="leader_card">
                  <figure>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid w-100"
                      
                    />
                  </figure>
                  {item?.name && <h4>{item.name}</h4>}
                  {item?.type && <p>{item.type}</p>}
                  {item?.slug && (
                    <Link
                      className="strech_link"
                      href={`${BASE_URL}messages-and-administration/${item.slug}`}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
       
      </div>
       <div className="navigation_btn">
          <div className="swiper_prev_custom">
            <img
              src="/images/icons/arrow.svg"
              alt="arrow"
              className="img-fluid"
            />
          </div>

          <div className="swiper_next_custom">
            <img
              src="/images/icons/arrow.svg"
              alt="arrow"
              className="img-fluid"
            />
          </div>
        </div>
    </div>
  );
}
