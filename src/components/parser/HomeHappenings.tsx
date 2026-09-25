"use client"
import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeHappenings({ homeData }: { homeData: any }) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setMounted(true)
  }, [])

  const happeningsData = homeData?.modular?.["news-events"] ?? []
  const updatedData = mounted && isMobile
    ? happeningsData.filter((_: any, idx: number) => idx < 2)
    : happeningsData

  return (
    <div className="grid_data">
      {updatedData && updatedData.length > 0 && updatedData.map((item: any, singleIdx: number) => (
        <div
          key={singleIdx}
          className={`single_grid ${!item?.image && item?.image === "" ? 'no_image' : ''}`}
          style={{ backgroundColor: item?.bg_color ?? '' }}
          {...(mounted ? { 'data-aos': 'fade-up', 'data-aos-delay': '200' } : {})}
        >
          {item?.image && (
            <figure>
              <Image
                src={item.image}
                alt="happening image"
                className="img-fluid w-100"
                width={636}
                height={443}
                loading="lazy"
              />
            </figure>
          )}
          <div className="content">
            <div className="bottom_data">
              {item?.date && (
                <p className="date" style={{ color: item?.font_color }}>
                  {item.date}
                </p>
              )}
              {item?.description && (
                <p className="desc" style={{ color: item?.font_color }}>
                  {item.description}
                </p>
              )}
              {item?.subtitle && (
                <h4 className="sub_title" style={{ color: item?.font_color }}>
                  {item.subtitle}
                </h4>
              )}
            </div>
          </div>
          <Link href={`${BASE_URL}happenings/news-events/${item.slug}`} className="strech_link" />
        </div>
      ))}
    </div>
  )
}