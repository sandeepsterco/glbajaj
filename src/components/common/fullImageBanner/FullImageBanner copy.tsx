"use client";

interface SlideData {
  id: number;
  image: string; // path to image or placeholder color
  placeholderColor: string; // fallback bg color while image loads
  tag: string;
  title: string;
  sub_title: string;
  cta: { label: string; href: string };
  url: string;
}

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FaChevronRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

function SlideContent({
  slide,
  active,
}: {
  slide: SlideData;
  active: boolean;
}) {
  return (
    <div className="absolute left-[42.5rem] bottom-[18.7rem]">
      <div
        className={`transition-all duration-700 ease-out bg-black/30 backdrop-blur-xs p-10 md:px-[6rem] md:py-[4rem] max-w-[519px] flex flex-row items-start ${
          active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <div className="absolute left-0 top-[5rem] w-[0.4rem] h-[7.2rem] bg-[#FECE49]" />

        <div className="flex flex-col flex-grow">
          {slide?.title && (
            <h1 className="text-[4.8rem] font-normal text-white leading-[4.8rem] tracking-[-2.4px] mb-[2rem]">
              {slide.title}
            </h1>
          )}

          <div className="flex items-center justify-between gap-[3rem]">
            {slide?.sub_title && (
              <p className="text-[1.6rem] text-white leading-[2.4rem] font-semibold">
                {slide.sub_title}
              </p>
            )}

            <Link
              href={slide?.url || "#"}
              className="border border-white/60 text-white p-4 hover:bg-white hover:text-black transition-all duration-300"
            >
              <FaChevronRight className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideDots({
  total,
  active,
  onGo,
}: {
  total: number;
  active: number;
  onGo: (i: number) => void;
}) {
  return (
    <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onGo(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`rounded-full border transition-all duration-300 ${
            i === active
              ? "w-2 h-6 bg-amber-400 border-amber-400"
              : "w-2 h-2 bg-transparent border-white/40 hover:border-amber-400"
          }`}
        />
      ))}
    </div>
  );
}

export default function FullImageBanner({ data }: { data: any }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleGo = useCallback((i: number) => {
    swiperRef.current?.slideTo(i);
  }, []);

  return (
    <section className="relative w-full bg-[#111]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        loop
        speed={900}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="relative"
        style={{ width: "100%", height: "100%" }}
      >
        {data?.map((slide: any, idx: number) => (
          <SwiperSlide key={slide.id} className="relative">
            {slide?.image && (
              <div
                className="relative"
                style={{ backgroundColor: slide.placeholderColor }}
              >
                <Image
                  src={slide.image}
                  alt={slide.heading || "banner image"}
                  width={2545}
                  height={1100}
                  priority={idx === 0}
                  className="relative object-cover object-center"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
              </div>
            )}

            {/* Slide content */}
            <SlideContent slide={slide} active={activeIndex === idx} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Vertical dot navigation */}
      <SlideDots total={data.length} active={activeIndex} onGo={handleGo} />

      <div className="absolute left-0 top-0 z-50">
        <Image
          src={"/images/home/hero/lefiSideGrid.png"}
          alt={"grid"}
          width={206}
          height={1600}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </section>
  );
}
