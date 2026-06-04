"use client";

import HeroBannerVideo from "./Herobannervideo";
import "./banner.css";
import dynamic from "next/dynamic";

const NotificationBar = dynamic(
  () => import("../../ui/notificationBar/NotificationBar")
);

export type BannerSlide = {
  image?: string;
  title?: string | null;
  sub_title?: string | null;
  url?: string | null;
  description?: string | null;
  video_link?: string;
  thumbnail_image?: string;
  slug?: string;
};

export default function HeroBanner({ data }: { data: BannerSlide[] }) {
  return (
    <section className="home_banner">
      <div className="home_banner_media">
        <HeroBannerVideo data={data} />
      </div>

      <NotificationBar />
    </section>
  );
}
