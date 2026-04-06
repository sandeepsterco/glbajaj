import { apiFetch } from "@/src/lib/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const { data: footerData, error: footerError } = await apiFetch(
    "menu?location=footer",
    { revalidate: 300 },
  );

  return (
    <footer className="bg-[#3E3E3E] pt-[8rem] pb-[6rem]">
      <div className="container">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-[3.7rem] items-center">
          <div className="bg-transparent inline-block">
            <Image
              src="/images/logo/footer-logo.png"
              alt="GL Bajaj Logo"
              width={260}
              height={84}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-[9rem] w-full">
            <div className="">
              <h3 className="text-white font-medium text-[2.1rem] leading-[3.6rem]">
                GL Bajaj Institute of Technology and Management
              </h3>
              <p className="text-white text-sm md:text-[1.6rem] leading-[2.4rem] mt-[1.2rem]">
                Plot No.2 , APJ Abdul Kalam Road, Knowledge Park 3, Greater
                Noida, Uttar Pradesh, India, 201306
              </p>
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-6 xl:gap-[4.5rem] items-center">
              <div>
                <h4 className="text-white text-[1.6rem] leading-[2.4rem] font-semibold">
                  Email
                </h4>
                <a
                  href="mailto:office@glbitm.ac.in"
                  className="text-white text-[1.6rem] leading-[2.4rem] mt-[1rem] block"
                >
                  office@glbitm.ac.in
                </a>
              </div>
              <div>
                <h4 className="text-white text-[1.6rem] leading-[2.4rem] font-semibold">
                  Helpline No.
                </h4>
                <a
                  href="tel:8010000234"
                  className="text-white text-[1.6rem] leading-[2.4rem] mt-[1rem] block"
                >
                  8010-000-234
                </a>
              </div>
              <div className="min-w-[160px]">
                <h4 className="text-white text-[1.6rem] leading-[2.4rem] font-semibold">
                  Phone
                </h4>
                <p className="">
                  <a
                    href="tel:+917290008310"
                    className="text-white text-[1.6rem] leading-[2.4rem] mt-[1rem] inline-block"
                  >
                    +91 7290008310
                  </a>
                  ,{" "}
                  <a
                    href="tel:+917290008390"
                    className="text-white text-[1.6rem] leading-[2.4rem] mt-[1rem]  inline-block"
                  >
                    +91 7290008390
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-[2rem] border-b border-t border-[#D2AB67] ml-[29.7rem] mt-[2.6rem] mb-[2rem]">
          <ul className="flex flex-wrap justify-center lg:justify-start items-center gap-x-[1.5rem]">
            <li>
              <Link
                href="#"
                className="text-[1.4rem] leading-[2.1rem] text-white"
              >
                Quick Links
              </Link>
            </li>
            {footerData?.menuItems?.map((item: any, idx: number) => (
              <React.Fragment key={idx}>
                <li className="text-white w-[5px] h-[5px] rounded-full flex items-center">
                  •
                </li>
                <li>
                  <Link
                    href={item.url}
                    className="text-[1.4rem] leading-[2.1rem] text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className=" ml-[29.7rem] mt-[2rem] relative flex flex-col lg:flex-row justify-between items-center text-[1.4rem] leading-[2.1rem] text-white">
          <div className="flex items-center gap-[5rem]">
            <p>
              Copyright © 2026 GL Bajaj Institute of Technology and Management
            </p>

            <p>
              Website Design and Development by{" "}
              <a
                href="https://www.stercodigitex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Sterco
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-[4.7rem]">
            {/* Social Icons */}
            <div className="flex items-center gap-[1rem]">
              <a
                href="#"
                className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
              >
                <Image
                  src={"/images/icons/social/facebook-color.svg"}
                  width={15}
                  height={15}
                  alt="facebook-icon"
                />
              </a>
              <a
                href="#"
                className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
              >
                <Image
                  src={"/images/icons/social/x-color.svg"}
                  width={15}
                  height={15}
                  alt="x-icon"
                />
              </a>
              <a
                href="#"
                className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
              >
                <Image
                  src={"/images/icons/social/youtube-color.svg"}
                  width={15}
                  height={15}
                  alt="youtube-icon"
                />
              </a>
              <a
                href="#"
                className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
              >
                <Image
                  src={"/images/icons/social/insta-color.svg"}
                  width={15}
                  height={15}
                  alt="instagram-icon"
                />
              </a>
              <a
                href="#"
                className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
              >
                <Image
                  src={"/images/icons/social/linkedin-color.svg"}
                  width={15}
                  height={15}
                  alt="linkedin-icon"
                />
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="flex items-center">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter Email to Subscribe"
                  className="bg-transparent border border-white/50 text-white text-[13px] pl-[1.3rem] h-[5rem] w-[26.3rem] focus:outline-none focus:border-[#FECE49] transition-colors placeholder:text-[1.4rem] placeholder:leading-[2.1rem]"
                />
                <button
                  type="button"
                  className="absolute right-[2rem]"
                  aria-label="Subscribe"
                >
                  <Image
                    src={"/images/icons/common/send-yellow.svg"}
                    width={17}
                    height={16}
                    alt="send-icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
