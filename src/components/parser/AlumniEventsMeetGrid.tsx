"use client"
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";
import { usePathname } from "next/navigation";

type AlumniEvent = {
  id: number;
  title: string;
  image?: string | null;
  alt?: string;
  slug: string;
};

type AlumniEventsYear = {
  year: number;
  events: AlumniEvent[];
};

type AlumniEventsResponse = {
  alumni_events?: AlumniEventsYear[];
  undated_events?: AlumniEvent[];
};

export default function AlumniEventsMeetGrid({ pageName, data }: { pageName: string; data: AlumniEventsResponse }) {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean);
  const parentSlug = slug[0]
  const childSlug = slug[1];

  const alumniEvents = data?.alumni_events ?? [];
  const undatedEvents = data?.undated_events ?? [];

  const renderEvents = (events: AlumniEvent[]) => (
    <div className="award-list">
      {events.map((item) => (
        <div className="award-box" key={item.id}>
          <figure className="flash-effect-2">
            <Image
              src={item.image || "/images/default/gallery-main.webp"}
              className="img-fluid w-100"
              width={600}
              height={443}
              loading="lazy"
              alt={item.alt || pageName}
            />
          </figure>
          {item.title && <p>{item.title}</p>}
          <Link
            href={`${BASE_URL}${parentSlug}/${childSlug}/${item.slug}`}
            className="strech_link"
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <>
        {alumniEvents.map(({ year, events }) => (
          <section key={year} className="alumni-events-year">
            <h4 className="font24">{year}</h4>
            {renderEvents(events)}
          </section>
        ))}
        {undatedEvents.length > 0 && (
          <section className="alumni-events-undated">
            <h4 className="font24">Other Events</h4>
            {renderEvents(undatedEvents)}
          </section>
        )}
      </>
    </>
  );
}