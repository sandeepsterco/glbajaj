"use client";

import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";

interface UpcomingEvent {
  id: number;
  heading: string;
  title: string | null;
  subtitle: string | null;
  image: string;
  date: string;
  description: string;
  bg_color: string | null;
  slug: string;
}

const fetchUpcomingEvents = async (): Promise<UpcomingEvent[]> => {
  const { data, error } = await apiFetch("upcoming-events");
  if (error) throw new Error(error);
  return data?.upcoming_events ?? [];
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

  if (isError || !events || events.length === 0) return null;

  const [first, ...rest] = events;
  const firstDate = formatDateParts(first.date);

  return (
    <>
      <div className="grid">
        <div className="left_col">
          <div className="content_col">
            <figure>
              <img
                src={first.image}
                alt={first.heading}
                data-aos="fade-up"
                data-aos-delay="800"
                loading="lazy"
                width="723"
                height="568"
                className="img-fluid w-100"
              />
            </figure>

            <div className="data-overlay">
              <div className="top" data-aos="fade-up" data-aos-delay="800">
                <span className="date">
                  {firstDate.day}
                  <br />
                  {firstDate.month}
                </span>
                <span className="year">{firstDate.year.slice(0, 2)}</span>
              </div>
              <div className="bottom" data-aos="fade-up" data-aos-delay="800">
                <span className="year">{firstDate.year.slice(2)}</span>
                <h6 className="name">{first.heading}</h6>
              </div>
            </div>

            <div className="sec_data" data-aos="fade-up" data-aos-delay="800">
              <div className="left">
                <p className="date text-white" data-aos="fade-up" data-aos-delay="800">
                  {firstDate.full}
                </p>
                <h4 className="title text-white" data-aos="fade-up" data-aos-delay="800">
                  {first.heading}
                </h4>
              </div>

              <div className="right">
                <Link href={`/news-events/${first.slug}`} data-aos="fade-up" data-aos-delay="800">
                  <div className="arrow_btn1">
                    <img alt="see more icon" src="/images/home/slide_arrow_right.svg" loading="lazy" />
                  </div>
                  {/* <img
                    src="/images/home/see_more_icon.svg"
                    alt="right chevron icon"
                    width="60"
                    height="40"
                  /> */}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="right_col">
          <ul>
            {rest.map((event, index) => {
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
