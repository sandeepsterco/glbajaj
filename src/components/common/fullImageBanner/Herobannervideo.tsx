"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import type { BannerSlide } from "./FullImageBanner";

function bannerHref(url: string | null | undefined): string {
  if (!url) return "#";
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `/${url}`;
}

function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

function getYouTubeVideoId(url: URL): string {
  if (url.hostname === "youtu.be") {
    return url.pathname.replace(/^\//, "").split("/")[0] ?? "";
  }
  if (url.pathname.startsWith("/embed/")) {
    return url.pathname.split("/")[2] ?? "";
  }
  return url.searchParams.get("v") ?? url.pathname.split("/").pop() ?? "";
}

function getVideoUrl(url: string): string {
  if (!url) return "";

  try {
    const videoUrl = new URL(url);

    if (
      videoUrl.hostname.includes("vimeo.com") ||
      videoUrl.hostname.includes("player.vimeo.com")
    ) {
      const embed = videoUrl.pathname.startsWith("/video/")
        ? `https://player.vimeo.com/video/${videoUrl.pathname.split("/").pop()}`
        : videoUrl.toString();
      const params = new URLSearchParams({
        autoplay: "1",
        muted: "1",
        controls: "0",
        loop: "1",
        background: "1",
      });
      return `${embed}?${params.toString()}`;
    }

    if (
      videoUrl.hostname.includes("youtube.com") ||
      videoUrl.hostname.includes("youtu.be")
    ) {
      let embedBase = "";
      if (videoUrl.pathname.startsWith("/embed/")) {
        embedBase = `${videoUrl.origin}${videoUrl.pathname}`;
      } else if (videoUrl.hostname === "youtu.be") {
        embedBase = `https://www.youtube.com/embed${videoUrl.pathname}`;
      } else {
        const videoId = getYouTubeVideoId(videoUrl);
        if (!videoId) return url;
        embedBase = `https://www.youtube.com/embed/${videoId}`;
      }

      const videoId = getYouTubeVideoId(videoUrl);
      const params = new URLSearchParams({
        autoplay: "1",
        mute: "1",
        controls: "0",
        disablekb: "1",
        loop: "1",
        playsinline: "1",
        rel: "0",
        modestbranding: "1",
        iv_load_policy: "3",
        fs: "0", 
        enablejsapi: "1",
      });
      if (videoId) params.set("playlist", videoId);

      return `${embedBase}?${params.toString()}`;
    }

    return url;
  } catch {
    return url;
  }
}

function SlideCaption({ slide }: { slide: BannerSlide }) {
  if(!slide?.title && !slide?.sub_title) return null;
  return (
    <div className="slider_caption">
      <div className="container-fluid">
        <div
          className="caption_wrap"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {slide?.title && (
            <blockquote
              className="title48"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {slide.title}
            </blockquote>
          )}
          <div className="cap_desc">
            {slide?.sub_title && (
              <p data-aos="fade-up" data-aos-delay="600">
                {slide.sub_title}
              </p>
            )}
            {slide?.url && (
              <Link
                href={bannerHref(slide.url)}
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <figure>
                  <Image
                    src="/images/home/hero/arrow_right.svg"
                    alt="Read more"
                    width={64}
                    height={64}
                  />
                </figure>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroBannerVideo({ data }: { data: BannerSlide[] }) {
  if (!data?.length) return null;

  return (
    <Swiper
      className="home_slide"
      modules={[Pagination, Autoplay]}
      loop={data.length > 1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      onBeforeInit={(sw) => {
        sw.el.style.setProperty("--swiper-duration", "4000ms");
      }}
    >
      {data.map((slide, index) => (
        <SwiperSlide key={slide.slug ?? index}>
          {slide?.video_link ? (
            <div className="home_banner_video_slide">
              {isDirectVideoUrl(slide.video_link) ? (
                <video
                  src={slide.video_link}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="home_banner_video"
                />
              ) : (
                <div className="home_banner_yt_wrap">
                  <iframe
                    src={getVideoUrl(slide.video_link)}
                    title={slide.title ?? "Banner video"}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              )}
              <SlideCaption slide={slide} />
            </div>
          ) : (
            <>
              {slide.image ? (
                <div className="home_banner_image_slide">
                  <Image
                    src={slide.image}
                    alt={slide.title || "banner image"}
                    fill
                    priority={index === 0}
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
              ) : null}
              <SlideCaption slide={slide} />
            </>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
