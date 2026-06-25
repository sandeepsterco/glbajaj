"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface DataInterface {
  image: string;
  alt: string;
  slug: string;
}

interface CompanyLogosProps {
  data: DataInterface[];
}

const LOGOS_PER_SLIDE = 15; // 3 rows × 5 columns

export default function CompanyLogoSliders({ data }: CompanyLogosProps) {
  // Chunk data into groups of 15
  const slides: DataInterface[][] = [];
  for (let i = 0; i < data.length; i += LOGOS_PER_SLIDE) {
    slides.push(data.slice(i, i + LOGOS_PER_SLIDE));
  }

  return (
    <section className="our_recruiters">
      <div className="container25">
        <Swiper
          modules={[ Autoplay]}
        //   navigation
          speed={2000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={slides.length > 1}
          className="our_recruiters-swiper"
          spaceBetween={14}
        >
          {slides.map((slideLogos, slideIdx) => (
            <SwiperSlide key={slideIdx}>
              <ul className="our_recruiters-grid">
                {slideLogos.map((item, idx) => (
                  <li key={idx}>
                    <figure>
                      <img
                        alt={item?.alt}
                        className="img-fluid w-100 aos-init aos-animate"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        loading="lazy"
                        src={item?.image}
                      />
                    </figure>
                  </li>
                ))}
              </ul>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}