"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { UpcomingEventsResponse, MediaCoverageItem, NewsEventItem } from "./HomeUpcomingEvents";

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

export default function HomeUpcomingEventsClient({ events }: HomeUpcomingEventsClientProps) {
  return (
  

      <div className="right_col">
        <ul>
          {events.newsAndEvents.map((event: NewsEventItem) => {
            const d = formatDateParts(event.date);
            return (
              <li key={event.id}>
                <Link href={`/happenings/news-events/${event.slug}`}>
                  <div className="text">
                    <span className="date">{d.full}</span>
                    <p>{event.heading}</p>
                  </div>
                  <img
                    src="/images/home/see_more_icon.svg"
                    alt="right chevron icon"
                    width="60"
                    height="60"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
  );
}