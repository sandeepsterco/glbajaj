"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { UpcomingEventsResponse, MediaCoverageItem, NewsEventItem } from "./HomeHighlights";

function formatDateParts(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = date.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  const year = date.getFullYear().toString();
  const dayMonth = `${day} ${month}`;
  return {
    day,
    month,
    year,
    dayMonth,
    full: date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  };
}

interface HomeUpcomingEventsClientProps {
  events: UpcomingEventsResponse;
}

export default function HomeHighlightsClient({ events }: HomeUpcomingEventsClientProps) {
  return (
      <div className="left_col">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={events.newsAndEvents.length > 1}
          slidesPerView={1}
          spaceBetween={15}
          speed={800}
          breakpoints={{
            576: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
        >
          {events.mediaCoverage.map((event: MediaCoverageItem) => {
            const d = formatDateParts(event.date);
            return (
              <SwiperSlide key={event.id}>
                <div className="content_col">
                  <Link
                    href="/happenings/media-coverage"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <figure>
                      <img
                        src={event.image ?? ""}
                        alt={event.title}
                        loading="lazy"
                        width="723"
                        height="568"
                        className="img-fluid w-100"
                      />
                    </figure>
                  </Link>

                  <div className="sec_data" data-aos="fade-up" data-aos-delay="800">
                    <div className="left">
                      <p className="date text-white">
                        {d.full}
                      </p>

                      <h4 className="title text-white">
                        {event.title}
                      </h4>
                    </div>

                    <div className="right">
                      <Link href="/happenings/media-coverage">
                        <div className="arrow_btn1">
                          <img
                            alt="see more icon"
                            src="/images/home/slide_arrow_right.svg"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

  );
}