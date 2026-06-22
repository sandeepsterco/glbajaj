import { APPLY_NOW, BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import React from "react";

const Footer = async () => {
  const [
    { data: footerData, error: footerError },
    { data: infoData, error: infoError }
  ] = await Promise.all([apiFetch("menu?location=footer"), apiFetch("info")]);

  const getValue = (key: string) => {
    const found = infoData?.data.find((item: any) => item.key == key) ?? null;
    return {
      value: found?.value ?? null,
      image: found?.image ?? null,
    }
  }

  if (footerError && infoError) return;

  return (
    <>
    <div className="fixButtons">
              <Link
                href={APPLY_NOW ?? ''}
                target="_blank"
                className="vertical-floating-btn CTA_Applynow"
              >
                360 View
              </Link>
            </div>
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
                {getValue('institute_name').value && (
                  <h3>{getValue('institute_name').value}</h3>
                )}
                {getValue('address').value && (
                  <p>{getValue('address').value}</p>
                )}
              </div>

              <div className="footer_contact">
                {getValue('email').value && (
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${getValue('email').value}`}>{getValue('email').value}</a>
                  </div>
                )}

                {getValue('helpline').value && (
                  <div>
                    <h4>Helpline No.</h4>
                    <a href={`tel:${getValue('helpline').value.split('-').join('')}`}>{getValue('helpline').value}</a>
                  </div>
                )}
                <div>

                </div>

                {getValue('phone').value && (
                  <div>
                    <h4>Phone</h4>
                    <p>
                      <a href={`tel:${getValue('phone').value}`}>{getValue('phone').value}</a>,
                      <a href={`tel:${getValue('phone1').value}`}>{getValue('phone1').value}</a>
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>

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

          <div className="footer_bottom">
            <div className="footer_bottom_left">
              {getValue('copyright').value && (
                <p>
                  {getValue('copyright').value}
                </p>
              )}

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

                {getValue('facebook').value && (
                  <a href={getValue('facebook').value} target="_blank">
                    <img
                      src={getValue('facebook').image}
                      alt="facebook icon"
                    />
                  </a>
                )}

                {getValue('twitter').value && (
                  <a href={getValue('twitter').value} target="_blank">
                    <img
                      src={getValue('twitter').image}
                      alt="X icon"
                    />
                  </a>
                )}

                {getValue('youtube').value && (
                  <a href={getValue('youtube').value} target="_blank">
                    <img
                      src={getValue('youtube').image}
                      alt="youtube icon"
                    />
                  </a>
                )}

                {getValue('instagram').value && (
                  <a href={getValue('instagram').value} target="_blank">
                    <img
                      src={getValue('instagram').image}
                      alt="instagram icon"
                    />
                  </a>
                )}

                {getValue('linkedin').value && (
                  <a href={getValue('linkedin').value} target="_blank">
                    <img
                      src={getValue('linkedin').image}
                      alt="linkedin icon"
                    />
                  </a>
                )}

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
