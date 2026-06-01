"use client";

import { BASE_URL } from "@/src/config/config";
import Link from "next/link";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface BlogItem {
  slug?: string;
  title?: string;
}

function updateNavVisibility(
  swiper: SwiperType,
  prevEl: HTMLElement | null,
  nextEl: HTMLElement | null,
  buttonsEl: HTMLElement | null
) {
  const hideAll = swiper.isLocked || swiper.slides.length <= 1;
  const hidePrev = hideAll || swiper.isBeginning;
  const hideNext = hideAll || swiper.isEnd;

  if (prevEl) prevEl.style.display = hidePrev ? "none" : "";
  if (nextEl) nextEl.style.display = hideNext ? "none" : "";
  if (buttonsEl) buttonsEl.style.display = hidePrev && hideNext ? "none" : "";
}

export default function BlogFeaturedSlider({
  blogs,
  listSlug,
}: {
  blogs: BlogItem[];
  listSlug: string;
}) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  if (blogs.length === 0) return null;

  const syncNav = (swiper: SwiperType) => {
    updateNavVisibility(swiper, prevRef.current, nextRef.current, buttonsRef.current);
  };

  return (
    <div className="blog_left_bottom">
      <div className="blog_slider swiper">
        <div className="blog_buttons" ref={buttonsRef}>
          <div className="swiper_prev_blog" ref={prevRef}>
            <figure>
              <img src="/images/icons/right-arrow.svg" alt="Previous" />
            </figure>
          </div>
          <div className="swiper_next_blog" ref={nextRef}>
            <figure>
              <img src="/images/icons/right-arrow.svg" alt="Next" />
            </figure>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation === "object" && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={syncNav}
          onSlideChange={syncNav}
          onResize={syncNav}
          onBreakpoint={syncNav}
          onReachBeginning={syncNav}
          onReachEnd={syncNav}
          className="blog_featured_swiper"
        >
          {blogs.map((blog, idx) => (
            <SwiperSlide key={blog.slug ?? idx}>
              <p>
                {blog.slug ? (
                  <Link href={`${BASE_URL}${listSlug}/${blog.slug}`}>{blog.title}</Link>
                ) : (
                  blog.title
                )}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
