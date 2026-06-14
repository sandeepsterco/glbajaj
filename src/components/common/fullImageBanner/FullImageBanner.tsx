"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "./banner.css";
import NotificationBar from "../../ui/notificationBar/NotificationBar";

function getVideoUrl(url: string): string {
  if (!url) return "";

  try {
    const videoUrl = new URL(url);

    if (
      videoUrl.hostname.includes("vimeo.com") ||
      videoUrl.hostname.includes("player.vimeo.com")
    ) {
      videoUrl.searchParams.set("autoplay", "1");
      videoUrl.searchParams.set("muted", "1");
      videoUrl.searchParams.set("controls", "0");
      videoUrl.searchParams.set("loop", "1");
      videoUrl.searchParams.set("background", "1");
      return videoUrl.toString();
    }

    if (
      videoUrl.hostname.includes("youtube.com") ||
      videoUrl.hostname.includes("youtu.be")
    ) {
      videoUrl.searchParams.set("autoplay", "1");
      videoUrl.searchParams.set("mute", "1");
      videoUrl.searchParams.set("controls", "0");
      videoUrl.searchParams.set("loop", "1");
      videoUrl.searchParams.set("playsinline", "1");
      videoUrl.searchParams.set("rel", "0");
      videoUrl.searchParams.set("modestbranding", "1");
      const videoId =
        videoUrl.searchParams.get("v") ||
        videoUrl.pathname.split("/").pop() ||
        "";
      if (videoId) videoUrl.searchParams.set("playlist", videoId);
      return videoUrl.toString();
    }

    return url;
  } catch {
    return url;
  }
}

function SliderCaption({ slide }: { slide: any }) {
  return (
    <div className="slider_caption">
      <div className="container-fluid">
        <div className="caption_wrap">
          {slide?.title && (
            <blockquote className="title48">{slide.title}</blockquote>
          )}
          <div className="cap_desc">
            {slide?.sub_title && <p>{slide.sub_title}</p>}
            {slide?.url && (
              <Link href={slide.url || "#"}>
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

function HeroVideoSlide({
  slide,
  index,
}: {
  slide: any;
  index: number;
}) {
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    if (index !== 0 || loadVideo) return;

    const activate = () => setLoadVideo(true);

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(activate, { timeout: 4000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(activate, 4000);
    return () => window.clearTimeout(timeoutId);
  }, [index, loadVideo]);

  return (
    <div className="home_banner_video_facade">
      {slide?.thumbnail_image ? (
        <Image
          src={slide.thumbnail_image}
          alt={slide.title || "Banner"}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover ${loadVideo ? "home_banner_video_poster--hidden" : ""}`}
        />
      ) : (
        <div className="home_banner_video_placeholder" aria-hidden="true" />
      )}

      {loadVideo ? (
        <iframe
          src={getVideoUrl(slide?.video_link)}
          title={slide?.title || "Banner video"}
          className="home_banner_video_iframe"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="home_banner_video_play"
          aria-label="Play banner video"
          onClick={() => setLoadVideo(true)}
        />
      )}

      {(slide?.title || slide?.sub_title) && <SliderCaption slide={slide} />}
    </div>
  );
}

export default function HeroBanner({ data }: { data: any }) {
  return (
    <section className="home_banner">
      <Swiper
        className="home_slide"
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        onBeforeInit={(sw) => {
          sw.el.style.setProperty("--swiper-duration", "4000ms");
        }}
      >
        {data?.map((slide: any, index: number) => (
          <SwiperSlide key={index}>
            {!slide?.video_link ? (
              <>
                <picture>
                  <source media="(min-width:992px)" srcSet={slide.desktopSrc} />
                  <Image
                    src={slide.image}
                    alt={slide.heading || "banner image"}
                    width={2545}
                    height={1100}
                    priority={index === 0}
                    className="relative object-cover object-center w-100"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </picture>

                {(slide?.title || slide?.sub_title) && (
                  <SliderCaption slide={slide} />
                )}
              </>
            ) : (
              <HeroVideoSlide slide={slide} index={index} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <NotificationBar />
    </section>
  );
}
