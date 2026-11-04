"use client";

import { BASE_URL } from "@/src/config/config";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { apiFetch } from "@/src/lib/api";

interface BlogItem {
  slug?: string;
  title?: string;
  listing_image?:string;
  listing_image_alt?:string;
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

  if (buttonsEl) buttonsEl.style.display = hideAll ? "none" : "";
  if (prevEl) prevEl.style.visibility = hidePrev ? "hidden" : "visible";
  if (nextEl) nextEl.style.visibility = hideNext ? "hidden" : "visible";

}

const fetchBlogsApi = async(blogSlug:string): Promise<BlogItem[]>=>{
  const {data} = await apiFetch(`blogs`);
  const allBlogs: BlogItem[] = data?.blogs?.data ?? [];

  return allBlogs.filter((item) => item.slug !== blogSlug)
}

export default function BlogFeaturedSlider({
  listSlug,
  blogSlug
}: {
  listSlug: string;
  blogSlug:string;
}) {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  let totalSlidesPerView = 2;

  useEffect(()=>{
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchBlogsApi(blogSlug);
        if (!cancelled) setBlogs(data);
      } catch (err) {
        console.error("Failed to load featured blogs", err);
        if (!cancelled) setBlogs([]);
      }
    })();

    return () => {
      cancelled = true;
    };

  }, [blogSlug])

  
  
  

  if (blogs.length === 0) return null;
  if(blogs.length === 1){
    totalSlidesPerView = 1;
  }

  const syncNav = (swiper: SwiperType) => {
    updateNavVisibility(swiper, prevRef.current, nextRef.current, buttonsRef.current);
  };

  return (
    <div className="blog_left_bottom">
      <div className="blog_slider swiper">
        
        <Swiper
          modules={[Navigation]}
          slidesPerView={totalSlidesPerView}
          loop={true}
          spaceBetween={20}
          // onBeforeInit={(swiper) => {
          //   if (typeof swiper.params.navigation === "object" && swiper.params.navigation) {
          //     swiper.params.navigation.prevEl = prevRef.current;
          //     swiper.params.navigation.nextEl = nextRef.current;
          //   }
          // }}
          navigation={{
            prevEl: ".swiper_prev_blog",
            nextEl: ".swiper_next_blog",
          }}
          onSwiper={syncNav}
          onSlideChange={syncNav}
          onResize={syncNav}
          onBreakpoint={syncNav}
          onReachBeginning={syncNav}
          onReachEnd={syncNav}
          className="blog_featured_swiper"
          breakpoints={{
            0:{
              slidesPerView:1,
            },
            768:{
              slidesPerView:totalSlidesPerView
            }
          }}
        >
          {blogs.map((blog, idx) => (
            <SwiperSlide key={blog.slug ?? idx}>
                <div className="feature_slide">
                  <Link href={`${BASE_URL}${listSlug}/${blog.slug}`}>
                    <Image className="feature_slider_thumbnail" src={blog.listing_image || "/images/blog-listing-placeholder.webp"} alt={blog.listing_image_alt || blog.title || 'Gl Bajaj'} width={120} height={120} loading="lazy" />
                  </Link>
                  <p>
                    {blog.slug ? (
                      <Link href={`${BASE_URL}${listSlug}/${blog.slug}`}>{blog.title}</Link>
                    ) : (
                      blog.title
                    )}
                  </p>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
      </div>
    </div>
  );
}
