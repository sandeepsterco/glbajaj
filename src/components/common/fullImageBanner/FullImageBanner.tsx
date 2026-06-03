import Image from "next/image";
import HeroBannerVideo from "./Herobannervideo";
import "./banner.css";
import dynamic from "next/dynamic";
const NotificationBar = dynamic(()=>import("../../ui/notificationBar/NotificationBar"));

const POSTER =
  "https://res.cloudinary.com/dbgrco4jr/video/upload/so_0,q_auto,f_auto,w_1920/v1779179213/home-page-video_uo6due.jpg";

export default function HeroBanner({ data }: { data: any }) {
  return (
    <section className="home_banner">
      <div className="home_banner_media">
        <Image
          src={POSTER}
          alt="GL Bajaj campus"
          fill
          priority
          fetchPriority="high"
          className="home_banner_poster object-cover"
          sizes="100vw"
        />

        <HeroBannerVideo />
      </div>

      <NotificationBar />
    </section>
  );
}