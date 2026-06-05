"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "./banner.css";
import NotificationBar from "../../ui/notificationBar/NotificationBar";
import { useEffect, useState } from "react";

function getVideoUrl(url: string): string {
  if (!url) return "";

  try {
    const videoUrl = new URL(url);

    // Vimeo
    if (
      videoUrl.hostname.includes("vimeo.com") ||
      videoUrl.hostname.includes("player.vimeo.com")
    ) {
      videoUrl.searchParams.set("autoplay", "1");
      videoUrl.searchParams.set("muted", "1");
      videoUrl.searchParams.set("controls", "0");
      videoUrl.searchParams.set("loop", "1");
      videoUrl.searchParams.set("background", "1"); // hides controls + enables autoplay muted
      return videoUrl.toString();
    }

    // YouTube
    if (
      videoUrl.hostname.includes("youtube.com") ||
      videoUrl.hostname.includes("youtu.be")
    ) {
      videoUrl.searchParams.set("autoplay", "1");
      videoUrl.searchParams.set("mute", "1"); // YouTube uses "mute" not "muted"
      videoUrl.searchParams.set("controls", "0");
      videoUrl.searchParams.set("loop", "1");
      videoUrl.searchParams.set("playsinline", "1");
      videoUrl.searchParams.set("rel", "0");
      videoUrl.searchParams.set("modestbranding", "1");
      // loop requires playlist param set to the video id
      const videoId =
        videoUrl.searchParams.get("v") ||
        videoUrl.pathname.split("/").pop() ||
        "";
      if (videoId) videoUrl.searchParams.set("playlist", videoId);
      return videoUrl.toString();
    }

    return url; // fallback for other platforms
  } catch {
    return url; // if URL parsing fails, return as-is
  }
}


export default function HeroBanner({ data }: { data: any }) {

  const [src, setSrc] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSrc(
      'https://www.youtube.com/embed/vWcpUhcpnns?autoplay=1&loop=1&playlist=vWcpUhcpnns&controls=0&modestbranding=1&rel=0&mute=1'
    );
  }, []);

  return (
    <section className="home_banner">
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



      <div className="home_banner_media">
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          className="home_banner_video"
          poster="https://res.cloudinary.com/dbgrco4jr/video/upload/so_0,q_auto,f_auto,w_1920/v1779179213/home-page-video_uo6due.jpg"
          preload="metadata"
        >
          <source
            src="https://res.cloudinary.com/dbgrco4jr/video/upload/q_auto,f_auto/v1779179213/home-page-video_uo6due"
            type="video/mp4"
          />
        </video> */}

        


        <iframe
          width="560"
          height="315"
          src={src}
          title="YouTube video player"
          onLoad={() => setLoaded(true)}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity .3s'
          }}
          >
            
        </iframe>

      </div>

      <NotificationBar />
    </section>
  );
}