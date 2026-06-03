"use client";

// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "https://res.cloudinary.com/dbgrco4jr/video/upload/q_auto,f_auto/v1779179213/home-page-video_uo6due";

// function getVideoUrl(url: string): string {
//   if (!url) return "";

//   try {
//     const videoUrl = new URL(url);

//     // Vimeo
//     if (
//       videoUrl.hostname.includes("vimeo.com") ||
//       videoUrl.hostname.includes("player.vimeo.com")
//     ) {
//       videoUrl.searchParams.set("autoplay", "1");
//       videoUrl.searchParams.set("muted", "1");
//       videoUrl.searchParams.set("controls", "0");
//       videoUrl.searchParams.set("loop", "1");
//       videoUrl.searchParams.set("background", "1"); // hides controls + enables autoplay muted
//       return videoUrl.toString();
//     }

//     // YouTube
//     if (
//       videoUrl.hostname.includes("youtube.com") ||
//       videoUrl.hostname.includes("youtu.be")
//     ) {
//       videoUrl.searchParams.set("autoplay", "1");
//       videoUrl.searchParams.set("mute", "1"); // YouTube uses "mute" not "muted"
//       videoUrl.searchParams.set("controls", "0");
//       videoUrl.searchParams.set("loop", "1");
//       videoUrl.searchParams.set("playsinline", "1");
//       videoUrl.searchParams.set("rel", "0");
//       videoUrl.searchParams.set("modestbranding", "1");
//       // loop requires playlist param set to the video id
//       const videoId =
//         videoUrl.searchParams.get("v") ||
//         videoUrl.pathname.split("/").pop() ||
//         "";
//       if (videoId) videoUrl.searchParams.set("playlist", videoId);
//       return videoUrl.toString();
//     }

//     return url; // fallback for other platforms
//   } catch {
//     return url; // if URL parsing fails, return as-is
//   }
// }

// Client island — only responsible for loading and playing the video.
// The poster image is already painted by the server component before
// this component's JS even downloads.
export default function HeroBannerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>("");
  // Controls poster fade-out once video is ready to play
  const [videoReady, setVideoReady] = useState(false);

  // Inject video src only after mount so the browser never queues
  // a video network request during the initial page parse.
  // IntersectionObserver fires immediately for above-fold elements
  // but keeps bandwidth free for fonts/CSS during the critical path.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVideoSrc(VIDEO_SRC);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Once src is set, load and play
  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;
    const vid = videoRef.current;
    vid.load();
    vid.play().catch(() => {
      // Autoplay blocked (power-save / browser policy) — poster stays visible
    });
  }, [videoSrc]);

  return (
    <>
      {/*
        SSR shell: video tag is in the HTML but src is empty.
        The browser renders zero bytes of video on first load.
        videoReady class fades the SSR poster out once canplay fires.
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        onCanPlay={() => setVideoReady(true)}
        className={`home_banner_video${videoReady ? " video-ready" : ""}`}
      >
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
      </video>

      {/* <Swiper
        className="home_slide"
        modules={[Pagination, Autoplay]}
        // loop={true}
        // autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                            href={slide.url || "#"}
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
              </>
            ) : (
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.4%",
                  height: 0,
                  overflow: "hidden",
                }}
              >
                {slide?.thumbnail_image && (
                  <Image
                    src={slide.thumbnail_image}
                    alt="Banner"
                    fill
                    priority
                    className="object-cover"
                  />
                )}

                <iframe
                  src={getVideoUrl(slide?.video_link)}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="eager"
                />

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
                            href={slide.url || "#"}
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
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper> */}

      {/* <div className="slider_caption">
        <div className="container-fluid">
          <div className="caption_wrap">
            <blockquote className="title48">
              Recognized. Ranked. Respected.
            </blockquote>
            <div className="cap_desc">
              <p>
                Lorem ipsum dolor sit amet, consectet adipiscing elit.
              </p>
              <Link href={"/about-glbitm"}>
                <figure>
                  <Image
                    src="/images/home/hero/arrow_right.svg"
                    alt="Read more"
                    width={64}
                    height={64}
                  />
                </figure>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}