import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";

const Footer = async () => {
  const { data: footerData, error: footerError } = await apiFetch(
    "menu?location=footer",
  );

  return (
    <>
      <footer className="home_footer">
        <div className="container">
          <div className="footer_top">
            <div className="footer_logo">
              <Image
                src="/images/logo/footer-logo.png"
                alt="GL Bajaj Logo"
                width={260}
                height={84}
              />
            </div>

            <div className="footer_content">
              <div className="footer_address">
                <h3>GL Bajaj Institute of Technology and Management</h3>
                <p>
                  Plot No.2 , APJ Abdul Kalam Road, Knowledge Park 3, Greater
                  Noida, Uttar Pradesh, India, 201306
                </p>
              </div>

              <div className="footer_contact">
                <div>
                  <h4>Email</h4>
                  <a href="mailto:office@glbitm.ac.in">office@glbitm.ac.in</a>
                </div>

                <div>
                  <h4>Helpline No.</h4>
                  <a href="tel:8010000234">8010-000-234</a>
                </div>

                <div>
                  <h4>Phone</h4>
                  <p>
                    <a href="tel:+917290008310">+91 7290008310</a>,
                    <a href="tel:+917290008390">+91 7290008390</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Quick Links --> */}
          <div className="footer_links">
            <ul>
              <li>
                <Link href="#!">Quick Links</Link>
              </li>
              {footerData?.menuItems?.map((item: any, idx: number) => (
                <React.Fragment key={idx}>
                  <li className="text-white w-[5px] h-[5px] rounded-full flex items-center">
                    •
                  </li>
                  <li>
                    <Link
                      href={item?.slug ? BASE_URL + item.slug : ''}
                      className="text-[1.4rem] leading-[2.1rem] text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>

          {/* <!-- Bottom --> */}
          <div className="footer_bottom">
            <div className="footer_bottom_left">
              <p>
                Copyright © 2026 GL Bajaj Institute of Technology and Management
              </p>
              <p>
                Website Design and Development by {" "}
                <a href="https://www.stercodigitex.com/" target="_blank">
                  Sterco Digitex
                </a>
              </p>
            </div>

            <div className="footer_bottom_right">
              {/* <!-- Social Icons --> */}
              <div className="social_icons">
                <a href="https://www.facebook.com/glbitm" target="_blank">
                  <img
                    src="/images/icons/social/facebook-color.svg"
                    alt="facebook icon"
                  />
                </a>
                <a href="https://x.com/glbajaj" target="_blank">
                  <img src="/images/icons/social/x-color.svg" alt="" />
                </a>
                <a href="https://www.youtube.com/user/glbitm07" target="_blank">
                  <img
                    src="/images/icons/social/youtube-color.svg"
                    alt=""
                  />
                </a>
                <a href="https://www.instagram.com/glbajajitm/" target="_blank">
                  <img
                    src="/images/icons/social/insta-color.svg"
                    alt=""
                  />
                </a>
                <a href="https://www.linkedin.com/school/g-l-bajaj-institute-of-technology-and-management/" target="_blank">
                  <img
                    src="/images/icons/social/linkedin-color.svg"
                    alt=""
                  />
                </a>
              </div>

              {/* <!-- Subscribe --> */}
              <div className="subscribe_box">
                <input type="email" placeholder="Enter Email to Subscribe" />
                <button>
                  <img src="/images/icons/send-yellow.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>



      <MobileMenu />
    </>

  );
};







export default Footer;
