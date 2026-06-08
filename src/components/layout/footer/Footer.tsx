import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const { data: footerData, error: footerError } = await apiFetch(
    "menu?location=footer",
  );

  return (
    // <footer className="bg-[#3E3E3E] pt-[8rem] pb-[6rem]">
    //   <div className="container">
    //     {/* Top Section */}
    //     <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-[3.7rem] items-center">
    //       <div className="bg-transparent inline-block">
    //         <Image
    //           src="/images/logo/footer-logo.png"
    //           alt="GL Bajaj Logo"
    //           width={260}
    //           height={84}
    //         />
    //       </div>

    //       <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-[9rem] w-full">
    //         <div className="">
    //           <h3 className="text-white font-medium text-[2.1rem] leading-[3.6rem]">
    //             GL Bajaj Institute of Technology and Management
    //           </h3>
    //           <p className="text-white text-sm md:text-[1.6rem] leading-[2.4rem] mt-[1.2rem]">
    //             Plot No.2 , APJ Abdul Kalam Road, Knowledge Park 3, Greater
    //             Noida, Uttar Pradesh, India, 201306
    //           </p>
    //         </div>

    //         <div className="flex flex-wrap md:flex-nowrap gap-6 xl:gap-[4.5rem] items-center">
    //           <div>
    //             <h4 className="text-white text-[1.6rem] leading-[2.4rem] font-semibold">
    //               Email
    //             </h4>
    //             <a
    //               href="mailto:office@glbitm.ac.in"
    //               className="text-white text-[1.6rem] leading-[2.4rem] mt-[1rem] block"
    //             >
    //               office@glbitm.ac.in
    //             </a>
    //           </div>
    //           <div>
    //             <h4 className="text-white text-[1.6rem] leading-[2.4rem] font-semibold">
    //               Helpline No.
    //             </h4>
    //             <a
    //               href="tel:8010000234"
    //               className="text-white text-[1.6rem] leading-[2.4rem] mt-[1rem] block"
    //             >
    //               8010-000-234
    //             </a>
    //           </div>
    //           <div className="min-w-[160px]">
    //             <h4 className="text-white text-[1.6rem] leading-[2.4rem] font-semibold">
    //               Phone
    //             </h4>
    //             <p className="">
    //               <a
    //                 href="tel:+917290008310"
    //                 className="text-white text-[1.6rem] leading-[2.4rem] mt-[1rem] inline-block"
    //               >
    //                 +91 7290008310
    //               </a>
    //               ,{" "}
    //               <a
    //                 href="tel:+917290008390"
    //                 className="text-white text-[1.6rem] leading-[2.4rem] mt-[1rem]  inline-block"
    //               >
    //                 +91 7290008390
    //               </a>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="py-[2rem] border-b border-t border-[#D2AB67] ml-[29.7rem] mt-[2.6rem] mb-[2rem]">
    //       <ul className="flex flex-wrap justify-center lg:justify-start items-center gap-x-[1.5rem]">
    //         <li>
    //           <Link
    //             href="#"
    //             role="button"
    //             className="text-[1.4rem] leading-[2.1rem] text-white"
    //           >
    //             Quick Links
    //           </Link>
    //         </li>
    //         {footerData?.menuItems?.map((item: any, idx: number) => (
    //           <React.Fragment key={idx}>
    //             <li className="text-white w-[5px] h-[5px] rounded-full flex items-center">
    //               •
    //             </li>
    //             <li>
    //               <Link
    //                 href={item?.slug ? BASE_URL+ item.slug : ''}
    //                 className="text-[1.4rem] leading-[2.1rem] text-white"
    //               >
    //                 {item.title}
    //               </Link>
    //             </li>
    //           </React.Fragment>
    //         ))}
    //       </ul>
    //     </div>

    //     {/* Bottom Section */}
    //     <div className=" ml-[29.7rem] mt-[2rem] relative flex flex-col lg:flex-row justify-between items-center text-[1.4rem] leading-[2.1rem] text-white">
    //       <div className="flex items-center gap-[5rem]">
    //         <p className=" text-white">
    //           Copyright © 2026 GL Bajaj Institute of Technology and Management
    //         </p>

    //         <p className=" text-white">
    //           Website Design and Development by{" "}
    //           <a
    //             href="https://www.stercodigitex.com/"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="hover:text-white transition-colors"
    //           >
    //             Sterco
    //           </a>
    //         </p>
    //       </div>

    //       <div className="flex flex-col sm:flex-row items-center gap-[4.7rem]">
    //         {/* Social Icons */}
    //         <div className="flex items-center gap-[1rem]">
    //           <a
    //             href="#"
    //             className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
    //           >
    //             <Image
    //               src={"/images/icons/social/facebook-color.svg"}
    //               width={15}
    //               height={15}
    //               alt="facebook-icon"
    //             />
    //           </a>
    //           <a
    //             href="#"
    //             className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
    //           >
    //             <Image
    //               src={"/images/icons/social/x-color.svg"}
    //               width={15}
    //               height={15}
    //               alt="x-icon"
    //             />
    //           </a>
    //           <a
    //             href="#"
    //             className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
    //           >
    //             <Image
    //               src={"/images/icons/social/youtube-color.svg"}
    //               width={15}
    //               height={15}
    //               alt="youtube-icon"
    //             />
    //           </a>
    //           <a
    //             href="#"
    //             className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
    //           >
    //             <Image
    //               src={"/images/icons/social/insta-color.svg"}
    //               width={15}
    //               height={15}
    //               alt="instagram-icon"
    //             />
    //           </a>
    //           <a
    //             href="#"
    //             className="w-[25px] h-[25px] rounded-full bg-white text-[#3b3a39] flex items-center justify-center hover:bg-[#FECE49] hover:text-white transition-all p-[0.6rem]"
    //           >
    //             <Image
    //               src={"/images/icons/social/linkedin-color.svg"}
    //               width={15}
    //               height={15}
    //               alt="linkedin-icon"
    //             />
    //           </a>
    //         </div>

    //         {/* Newsletter Subscription */}
    //         <div className="flex items-center">
    //           <div className="relative flex items-center">
    //             <input
    //               type="email"
    //               placeholder="Enter Email to Subscribe"
    //               className="bg-transparent border border-white/50 text-white text-[13px] pl-[1.3rem] h-[5rem] w-[26.3rem] focus:outline-none focus:border-[#FECE49] transition-colors placeholder:text-[1.4rem] placeholder:leading-[2.1rem]"
    //             />
    //             <button
    //               type="button"
    //               className="absolute right-[2rem]"
    //               aria-label="Subscribe"
    //             >
    //               <Image
    //                 src={"/images/icons/common/send-yellow.svg"}
    //                 width={17}
    //                 height={16}
    //                 alt="send-icon"
    //               />
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </footer>



    <>
      <footer className="home_footer">
        <div className="container">
          <div className="footer_top">
            {/* <!-- Logo --> */}
            <div className="footer_logo">
              <Image
                src="/images/logo/footer-logo.png"
                alt="GL Bajaj Logo"
                width={260}
                height={84}
              />
            </div>

            {/* <!-- Content --> */}
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

      <div className="fixed-bottom mobile-footer">
        <div className="modal-new modal1">
          <div className="program-drawer">
            <div className="drawer-track">
              <div className="drawer-panel" id="panelMain">
                <div className="pro_menu">
                  <div className="section-heading">Courses</div>
                    <div className="home_courses_section "><div className="search-box input_group"> <input placeholder="Search Courses" className="search_input" type="text" /> <Image src="/images/icons/search.png" alt="search icon" className="search_icon" width={20} height={20} /> </div></div>                
                    
                    <div className="courses_Box">
                      <ul className="menu-list">
                        <li>
                          <figure>
                            <img src="/images/undergraduate-img.webp" alt="" className="img-fluid" /></figure>
                            <div className="course_bx">
                                  <figcaption>
                                    <h4>Undergraduate</h4>
                                    <p>Courses</p>
                                  </figcaption>
                                <span>
                                  <img src="/images/home/slide_arrow_right.svg" alt="" className="img-fluid" width={50} height={50} />
                                </span>
                            </div> 
                            <a href="#" className="strech_link"></a>                          
                        </li>
                        
                        <li>
                          <figure>
                            <img src="/images/postgraduate-img.webp" alt="" className="img-fluid" /></figure>
                            <div className="course_bx">
                                  <figcaption>
                                    <h4>Post Graduate</h4>
                                    <p>Courses</p>
                                  </figcaption>
                                <span>
                                  <img src="/images/home/slide_arrow_right.svg" alt="" className="img-fluid" width={50} height={50} />
                                </span>
                            </div>  
                            <a href="#" className="strech_link"></a>                        
                        </li>
                      </ul>
                    </div>
                  
                </div>                
              </div>
            </div>
          </div>
        </div>
        <div className="modal-new modal2">
          <div className="mobile_admission_wrapper">
            <div className="mobile_admission">
              <h4 className="title28">Admissions 2026</h4>
              <ul>
                <li><a href="">Admission Procedure</a></li>
                <li><a href="">Eligiblity</a></li>
                <li><a href="">Fee Structure</a></li>
                <li><a href="">Scholarship</a></li>
                <li><a href="">Document Required</a></li>
                <li><a href="">Admission FAQs</a></li>
              </ul>
            </div>
            <div className="m-admission-helpline">
              <h5>Admissions Helpline</h5>
              <ul>
                <li>
                  <div className="conatct_svg"><Image src="/images/icons/menu-phone.svg" alt="Icon"
                    width={50}
                    height={50}
                  /></div>
                  <p><a href="tel:919989776661">+91 9989 776661</a></p>
                </li>
                <li>
                  <div className="conatct_svg"><Image src="/images/icons/menu-mail.svg" alt="Icon"
                    width={50}
                    height={50}
                  /></div>
                  <p><a href="mailto:office@glbitm.ac.in">office@glbitm.ac.in</a></p>
                </li>
              </ul>
            </div>
            <div className="m-view">
              <a href="" className="apply_online_btn">Apply Online</a>
              <a href="" className="download_prospectus_btn">Download Prospectus</a>
            </div>
          </div>
        </div>
        <div className="modal-new modal3">
          <div className="mobile-contact">
            <div className="contact-logo">
              <Image src="/images/logo/colored-logo.png" className="img-fluid" alt="Icon" 
              width={270} height={88} />
              <h6>GL Bajaj Institute of Technology and Management</h6>
            </div>
            <div className="contact_menu">
              <ul>
                <li>
                  <div className="conatct_svg"><Image src="/images/icons/menu-phone.svg" alt="Icon" width={20} height={20}
                  /></div>
                  <p><a href="tel:+91 7290008310">+91 7290008310</a></p>
                </li>
                <li>
                  <div className="conatct_svg"><Image src="/images/icons/menu-telephone.svg" alt="Icon"
                    width={20}
                    height={20}
                  /></div>
                  <p><a href="tel:+8010-000-234">+8010-000-234</a></p>
                </li>
                <li>
                  <div className="conatct_svg"><Image src="/images/icons/menu-mail.svg" alt="Icon"
                    width={20}
                    height={20}
                  /></div>
                  <p><a href="mailto:office@glbitm.ac.in">office@glbitm.ac.in</a></p>
                </li>                
                <li>
                  <div className="conatct_svg"><Image src="/images/icons/menu-location.svg" alt="Icon"
                    width={20}
                    height={20}
                  /></div>
                  <p>Plot No.2 , APJ Abdul Kalam Road, Knowledge Park 3, Greater Noida, Uttar Pradesh, India, 201306</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="modal-new modal4">
          <div className="menu_scroll">
            <div className="mobile_menu">
              <ul>
                 <li className="drop_down">
                    <a href="#" className="drop_btn">About Us</a>
                    <ul className="submenu">
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Our Inspiration</a></li>
                        <li><a href="#">Logo Philosophy</a></li>
                        <li><a href="#">Affiliations & Accreditations</a></li>
                    </ul>
                </li>
                <li><a href="">Why GLBITM?</a></li>
                <li><a href="">Facilities</a></li>
                <li><a href="">Academics</a></li>
                <li><a href="">Departments</a></li>
                <li><a href="">Training & Placement</a></li>
                <li><a href="">Research</a></li>
              </ul>
            </div>
            <div className="others_mobile_menu">
              <ul>
                <li><a href="">Quick Links</a></li>
                <li><a href="">Testimonials</a></li>
                <li><a href="">Stakeholder Feedback</a></li>
                <li><a href="">Careers</a></li>
                <li><a href="">Student Corner</a></li>
                <li><a href="">Quality Initiatives</a></li>
                <li><a href="">Happenings</a></li>
                <li><a href="">Alumni</a></li>
              </ul>
            </div>           
          </div>
        </div>
        <div className="tab-nav mobile-nav">
          <div className="footer-trigger modal1">
            <svg xmlns="http://www.w3.org/2000/svg" width="27.865" height="18.622" viewBox="0 0 27.865 18.622">
              <g id="g2946" transform="translate(0.5 0.5)">
                <g id="g2948" transform="translate(0 0)">
                  <g id="Group_28169" data-name="Group 28169">
                    <g id="g2956" transform="translate(0 2.064)">
                      <path id="path2958"
                        d="M-571.2,0h1.919a.811.811,0,0,1,.811.811V14.747a.811.811,0,0,1-.811.811h-25.244a.811.811,0,0,1-.811-.811V.811A.811.811,0,0,1-594.521,0h1.919"
                        transform="translate(595.332)" fill="none" stroke="" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1" />
                    </g>
                    <g id="g2960" transform="translate(13.433 0)">
                      <path id="path2962"
                        d="M-253.3-266.079v3.568a.378.378,0,0,1-.378.378h-6.585A4.091,4.091,0,0,0-264-259.7v-14.919a2.7,2.7,0,0,1,2.7-2.7h7.622a.378.378,0,0,1,.378.378v8.973"
                        transform="translate(263.999 277.322)" fill="none" stroke=""
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                    <g id="g2964" transform="translate(2.73)">
                      <path id="path2966"
                        d="M-8.955-359.476H-2.37a4.091,4.091,0,0,1,3.74,2.432v-14.919a2.7,2.7,0,0,0-2.7-2.7H-8.955a.378.378,0,0,0-.378.378v14.433A.378.378,0,0,0-8.955-359.476Z"
                        transform="translate(9.333 374.666)" fill="none" stroke=""
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                    <g id="g2980" transform="translate(15.471 3.783)">
                      <path id="path2982" d="M0,0H6.627" transform="translate(0 -0.001)" fill="none"
                        stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                    <g id="g2988" transform="translate(15.471 7.759)">
                      <path id="path2990" d="M0,0H6.627" transform="translate(0 0)" fill="none" stroke=""
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                    <g id="g2996" transform="translate(15.471 11.736)">
                      <path id="path2998" d="M0,0H6.627" transform="translate(0 0)" fill="none" stroke=""
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                    <g id="g3000" transform="translate(4.77 3.782)">
                      <path id="path3002" d="M0,0H6.627" transform="translate(-0.002 -0.001)" fill="none"
                        stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                    <g id="g3008" transform="translate(4.77 7.759)">
                      <path id="path3010" d="M0,0H6.627" transform="translate(-0.002 0)" fill="none"
                        stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                    <g id="g3016" transform="translate(4.77 11.736)">
                      <path id="path3018" d="M0,0H6.627" transform="translate(-0.002 0)" fill="none"
                        stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
           <span>Programs</span>
          </div>

          <div className="footer-trigger modal2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20.979" height="19.624" viewBox="0 0 20.979 19.624">
              <g id="Id_card" transform="translate(0.5 0.5)">
                <g id="Group_28170" data-name="Group 28170" transform="translate(0 0)">
                  <path id="Path_24642" data-name="Path 24642"
                    d="M35.069,116h1.524a3.386,3.386,0,0,1,3.386,3.386v8.465a3.386,3.386,0,0,1-3.386,3.386H23.386A3.386,3.386,0,0,1,20,127.852v-8.465A3.386,3.386,0,0,1,23.386,116h1.693"
                    transform="translate(-20 -112.614)" fill="none" stroke="" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="1" />
                  <path id="Path_24643" data-name="Path 24643"
                    d="M219.386,39.386a1.693,1.693,0,0,1-3.386,0V36h3.386Z"
                    transform="translate(-207.704 -36)" fill="none" stroke="" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="1" />
                  <path id="Path_24644" data-name="Path 24644"
                    d="M104.91,241.079a1.693,1.693,0,0,1-1.693,1.693h-1.524A1.693,1.693,0,0,1,100,241.079v-3.386A1.693,1.693,0,0,1,101.693,236h1.524a1.693,1.693,0,0,1,1.693,1.693Z"
                    transform="translate(-96.614 -227.535)" fill="none" stroke="" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="1" />
                  <line id="Line_1520" data-name="Line 1520" x2="5.009" transform="translate(11.649 8.504)"
                    fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                  <line id="Line_1521" data-name="Line 1521" x2="5.009" transform="translate(11.649 11.882)"
                    fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                  <line id="Line_1522" data-name="Line 1522" x2="5.009" transform="translate(11.649 15.261)"
                    fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                </g>
              </g>
            </svg>
            <span>Admissions</span>
          </div>
          <div className="footer-trigger modal3">
            <svg xmlns="http://www.w3.org/2000/svg" width="21.015" height="21.054" viewBox="0 0 21.015 21.054">
              <path id="Icon_feather-phone-call" data-name="Icon feather-phone-call"
                d="M15.532,5.323A4.778,4.778,0,0,1,19.307,9.1M15.532,1.5a8.6,8.6,0,0,1,7.6,7.588m-.956,7.626v2.867a1.911,1.911,0,0,1-2.083,1.911,18.912,18.912,0,0,1-8.247-2.934,18.635,18.635,0,0,1-5.734-5.734A18.912,18.912,0,0,1,3.176,4.539a1.911,1.911,0,0,1,1.9-2.083H7.944A1.911,1.911,0,0,1,9.856,4.1a12.27,12.27,0,0,0,.669,2.685,1.911,1.911,0,0,1-.43,2.016L8.881,10.015a15.29,15.29,0,0,0,5.734,5.734l1.214-1.214a1.911,1.911,0,0,1,2.016-.43,12.27,12.27,0,0,0,2.685.669A1.911,1.911,0,0,1,22.174,16.714Z"
                transform="translate(-2.667 -0.948)" fill="rgba(0,0,0,0)" stroke="" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="1" />
            </svg>
            <span>Contact Us</span>
          </div>
          <div className="footer-trigger modal4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16.222" viewBox="0 0 20 16.222">
              <g id="Hamberger" transform="translate(0 0.5)">
                <line
                  id="Line_1"
                  data-name="Line 1"
                  x2="20"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1"
                />
                <line
                  id="Line_2"
                  data-name="Line 2"
                  x2="16.25"
                  transform="translate(0 7.61)"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1"
                />
                <line
                  id="Line_3"
                  data-name="Line 3"
                  x2="20"
                  transform="translate(0 15.222)"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1"
                />
              </g>
            </svg>
           <span>Menu</span>
          </div>
        </div>
      </div>
    </>

  );
};







export default Footer;
