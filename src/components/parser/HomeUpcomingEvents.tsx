"use client";

import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// "mediaCoverage" entries: no image, just title/date/slug
interface MediaCoverageItem {
  id: number;
  title: string;
  date: string;
  featured: string | null;
  slug: string;
  image:string | null;
}

// "newsAndEvents" entries: full card data including image
interface NewsEventItem {
  id: number;
  heading: string;
  title: string | null;
  subtitle: string | null;
  image: string;
  date: string;
  description: string;
  bg_color: string | null;
  display_order: number | null;
  featured: string | null;
  slug: string;
}

interface UpcomingEventsResponse {
  status: boolean;
  mediaCoverage: MediaCoverageItem[];
  newsAndEvents: NewsEventItem[];
}

const fetchUpcomingEvents = async (): Promise<UpcomingEventsResponse> => {
  const { data, error } = await apiFetch("featured-media-coverage-and-news");
  if (error) throw new Error(error);
  return data ?? { status: false, mediaCoverage: [], newsAndEvents: [] };
};

function formatDateParts(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = date.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  const year = date.getFullYear().toString();
  const dayMonth = `${day} ${month}`;
  return { day, month, year, dayMonth, full: date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) };
}

export default function HomeUpcomingEvents() {
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ["upcoming_events"],
    queryFn: fetchUpcomingEvents,
  });

  if (isLoading) {
    return (
      <SkeletonGroup
        wrapperClassName="!mt-[3rem] !block"
        count={1}
        className="bg-gray-300 h-[50rem] w-full"
      />
    );
  }

  const hasMediaCoverage = !!events?.mediaCoverage?.length;
  const hasNewsAndEvents = !!events?.newsAndEvents?.length;

  if (isError || !events || (!hasMediaCoverage && !hasNewsAndEvents)) return null;

  return (
    <>
      <div className="grid">
        <div className="left_col">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={events.newsAndEvents.length > 1}
            slidesPerView={1}
            speed={800}
          >
            {events.mediaCoverage.map((event: MediaCoverageItem) => {
              const d = formatDateParts(event.date);
              return (
                <SwiperSlide key={event.id}>
                  <div className="content_col">
                    <figure>
                      <img
                        src={event.image ?? ''}
                        alt={event.title}
                        data-aos="fade-up"
                        data-aos-delay="800"
                        loading="lazy"
                        width="723"
                        height="568"
                        className="img-fluid w-100"
                      />
                    </figure>

                    <div className="sec_data" data-aos="fade-up" data-aos-delay="800">
                      <div className="left">
                        <p className="date text-white" data-aos="fade-up" data-aos-delay="800">
                          {d.full}
                        </p>
                        <h4 className="title text-white" data-aos="fade-up" data-aos-delay="800">
                          {event.title}
                        </h4>
                      </div>

                      <div className="right">
                        <Link href={`/media-coverage`} data-aos="fade-up" data-aos-delay="800">
                          <div className="arrow_btn1">
                            <img alt="see more icon" src="/images/home/slide_arrow_right.svg" loading="lazy" />
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

        <div className="right_col">
          <ul>
            {events.newsAndEvents.map((event: NewsEventItem) => {
              const d = formatDateParts(event.date);
              return (
                <li key={event.id} data-aos="fade-up" data-aos-delay="200">
                  <Link href={`/news-events/${event.slug}`}>
                    <div className="text" data-aos="fade-up" data-aos-delay="400">
                      <span className="date">{d.full}</span>
                      <p>{event.heading}</p>
                    </div>
                    <img
                      src="/images/home/see_more_icon.svg"
                      alt="right chevron icon"
                      width="60"
                      height="60"
                      data-aos="fade-up"
                      data-aos-delay="600"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}