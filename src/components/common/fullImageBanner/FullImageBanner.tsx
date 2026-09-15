"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import NotificationBar from "../../ui/notificationBar/NotificationBar";
import "./banner.css";

function getYouTubeId(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.pathname.startsWith("/embed/")) return u.pathname.split("/embed/")[1];
    return u.searchParams.get("v") || "";
  } catch {
    return "";
  }
}



function getVideoUrl(url: string): string {
  if (!url) return "";

  try {
    const videoUrl = new URL(url);

    if (
      videoUrl.hostname.includes("vimeo.com")
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
      const id = getYouTubeId(url);
      const params = new URLSearchParams({
        autoplay: "1",
        mute: "1",
        controls: "0",
        loop: "1",
        playsinline: "1",
        rel: "0",
        modestbranding: "1",
        ...(id ? { playlist: id } : {}),
      });
      return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
    }

    return url;
  } catch {
    return url;
  }
}

// Fires the callback only after the whole page (images, fonts, scripts)
// has finished loading — this is the key change requested.
function usePageFullyLoaded(): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setLoaded(true);
      return;
    }
    const onLoad = () => setLoaded(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return loaded;
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
  isActive,
  pageLoaded,

}: {
  slide: any;
  index: number;
  isActive: boolean;
  pageLoaded: boolean;

}) {
  const [userTriggered, setUserTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateWidth = () => setIsMobile(window.innerWidth < 768);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const autoLoad = index === 0 && pageLoaded && isActive;
  const shouldRenderIframe = autoLoad || userTriggered;

  return (
    <div className="home_banner_video_facade">
      {slide?.thumbnail_image ? (
        <Image
          src={slide.thumbnail_image}
          alt={slide.title || "Banner"}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover ${shouldRenderIframe ? "home_banner_video_poster--hidden" : ""}`}
        />
      ) : (
        <div className="home_banner_video_placeholder" aria-hidden="true" />
      )}

      {shouldRenderIframe && isActive ? (
        <iframe
          src={getVideoUrl((isMobile && slide?.mobile_video_link) || slide?.video_link)}
          title={slide?.title || "Banner video"}
          className="home_banner_video_iframe"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          className="home_banner_video_play"
          aria-label="Play banner video"
          onClick={() => setUserTriggered(true)}
        />
      )}

      {(slide?.title || slide?.sub_title) && <SliderCaption slide={slide} />}
    </div>
  );
}

export default function HeroBanner({ data }: { data: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pageLoaded = usePageFullyLoaded();



  return (
    <section className="home_banner">
      <Swiper
        className="home_slide"
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        onBeforeInit={(sw) => {
          sw.el.style.setProperty("--swiper-duration", "4000ms");
        }}
        onSlideChange={(sw) => setActiveIndex(sw.activeIndex)}

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
              <HeroVideoSlide
              slide={slide}
              index={index}
              isActive={index === activeIndex}
              pageLoaded={pageLoaded}
            />

            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <NotificationBar />
    </section>
  );
}
