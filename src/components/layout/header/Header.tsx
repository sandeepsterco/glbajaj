"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./header.css";

const BASE_URL = "/";

export default function Header({ headerData }: { headerData?: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  console.log('headerData',headerData);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const WHY_GLBITM = [
    "GLBITM at a Glance", "Campus Tour", "Life @ GL Bajaj", "Entrepreneurship",
    "International Relations", "Workshops & Seminars", "Industrial Experience",
    "Faculty", "Placements", "Student Life", "Awards & Rankings",
    "Clubs & Societies", "NIRF DCS", "Extra Curricular Activities",
    "Committee & Cells", "Testimonials",
  ];

  const FACILITIES = ["Academic Facilities", "Campus Facilities", "Other Facilities", "FAQs"];

  const QUALITY = [
    "Internal Quality Assurance Cell", "IQAC Committee", "IQAC Events",
    "Reports", "Value Education Cell", "Institute Innovation Cell - IIC",
    "Bhashini", "GLB Digital Pathshala",
  ];

  const HAPPENINGS = [
    "News & Events", "Media Coverage", "Notices & Announcements",
    "Gallery", "Workshops", "Guest Lectures",
  ];

  const ALUMNI = [
    "Overview", "Alumni Chapters", "Alumni Events & Meets",
    "Alumni Achievements", "Distinguished Alumni", "Alumni Testimonials",
  ];

  const STUDENT_CORNER = [
    "Dean Student Welfare", "Student Centric Policy", "Clubs & Societies",
    "NSS & NCC", "Student Chapters", "Student Council", "Hackathons",
    "Achievements", "Sports & GYM", "Counselling Support", "Life @ Campus",
  ];

  const DEPARTMENTS = [
    "Civil Engineering",
    "Computer Science and Engineering",
    "Computer Science and Engineering (AI)",
    "Computer Science and Engineering (AIML)",
    "Computer Science and Engineering (Data Science)",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
    "Computer Science & Information Technology",
    "Electrical and Electronics Engineering",
    "Applied Science and Humanities",
    "Master of Business Administration",
  ];

  const MEGA_RIGHT_LINKS = [
    "Teaching Practices & Pedagogy", "Our Leadership Team", "Faculty",
    "Academic Calendar - RO", "Curriculum & Syllabi", "System of Evaluation",
    "Examinations", "Committees", "Placements",
    "Industry – Academia MoUs & Alliances", "Dean Strategy",
    "Dean Student Welfare", "Code of Conduct", "Library", "Anti-Ragging",
    "GLB Digital Pathshala", "Guidelines & Policies", "Grievance",
    "Notices & Announcements",
  ];

  const SOCIALS = [
    { icon: "facebook.png", label: "Facebook" },
    { icon: "x-social.png", label: "X / Twitter" },
    { icon: "youtube.png", label: "YouTube" },
    { icon: "insta.png", label: "Instagram" },
    { icon: "linkedin.png", label: "LinkedIn" },
  ];

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <header className={`main_header${megaMenuOpen ? " active" : ""}`}>

        {/* Top bar */}
        <div className="top_header">
          <div className="container-fluid">
            <div className="top_menu">
              <div className="toll_sec">
                <ul>
                  <li>
                    <span>Toll free No</span>
                    <Link href="tel:8010000234">801 000 234</Link>
                  </li>
                </ul>
              </div>
              <ul className="h_social_sec">
                {SOCIALS.map(({ icon, label }) => (
                  <li key={label}>
                    <Link href="#" aria-label={label} target="_blank">
                      <img src={`/images/icons/social/${icon}`} alt={label} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom nav bar */}
        <div className="bottom_header">
          <div className="container-fluid">

            {/* Logo */}
            <div className="site_brand">
              <Link href={BASE_URL} className="navbar-brand" aria-label="GL Bajaj home">
                <Image
                  src="/images/logo/logo.png"
                  alt="GL Bajaj University"
                  className="img-fluid white_logo"
                  width={415}
                  height={112}
                  priority
                />
                <Image
                  src="/images/logo/logo.png"
                  alt="GL Bajaj University"
                  className="img-fluid blue_logo"
                  width={415}
                  height={112}
                  priority
                />
              </Link>
            </div>

            {/* Navigation */}
            <div className="site_nav">
              <ul>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/courses">Courses &amp; Admission</Link></li>

                {/* ── Mega Menu ── */}
                <li
                  className={`drom_menu${megaMenuOpen ? " active" : ""}`}
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <Link href="#">Academics</Link>

                  <div
                    className="dropdown_item"
                    style={{
                      transform: megaMenuOpen
                        ? "translateX(0%) scaleY(1)"
                        : "translateX(0%) scaleY(0)",
                      opacity: megaMenuOpen ? 1 : 0,
                    }}
                  >
                    <div className="mega_container">
                      {/* Left */}
                      <div className="mega_left">
                        <div className="megg_lft_top">
                          <h4>Programs</h4>
                          <ul>
                            <li><Link href="#">Undergraduate</Link></li>
                            <li><Link href="#">Post Graduate</Link></li>
                          </ul>
                        </div>
                        <div className="mega_left_btm">
                          <h4>Departments</h4>
                          <ul>
                            {DEPARTMENTS.map((dept) => (
                              <li key={dept}><Link href="#">{dept}</Link></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="mega_right">
                        <ul>
                          {MEGA_RIGHT_LINKS.map((item) => (
                            <li key={item}><Link href="#">{item}</Link></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                <li><Link href="#">Departments</Link></li>
                <li><Link href="#">Training &amp; Placement</Link></li>
                <li><Link href="#">Research</Link></li>
              </ul>

              {/* Icons */}
              <div className="menu_bars">
                <Link href="#" className="search_open" aria-label="Search">
                  <img
                    src="/images/icons/header/search-icon.svg"
                    alt="search"
                    className="img-fluid w-100"
                  />
                </Link>
                <button
                  type="button"
                  className="hamb_open"
                  aria-label="Open menu"
                  aria-expanded={sidebarOpen}
                  onClick={() => setSidebarOpen(true)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <img
                    src="/images/icons/header/hamburger.svg"
                    alt="menu"
                    className="img-fluid w-100"
                  />
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      <div
        id="humburgeroverlay"
        className={sidebarOpen ? "active" : ""}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`humburger_mainsec${sidebarOpen ? " active" : ""}`}
        id="humburger_sidebar"
      >
        <div className="close_icon">
          <figure>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <img src="/images/icons/header/close_icon.svg" alt="Close" />
            </button>
          </figure>
        </div>

        <div className="hmburger_grid">

          {/* Why GLBITM */}
          <div className="hmburger_col why_col">
            <h4 className="title24">Why GLBITM?</h4>
            <ul>
              {WHY_GLBITM.map((item) => (
                <li key={item}><Link href="#">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Facilities + Quality */}
          <div className="hmburger_col facilities_col">
            <h4 className="title24">Facilities</h4>
            <ul>
              {FACILITIES.map((item) => (
                <li key={item}><Link href="#">{item}</Link></li>
              ))}
            </ul>
            <h4 className="title24">Quality Initiatives</h4>
            <ul>
              {QUALITY.map((item) => (
                <li key={item}><Link href="#">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Happenings + Alumni */}
          <div className="hmburger_col happenings_col">
            <h4 className="title24">Happenings</h4>
            <ul>
              {HAPPENINGS.map((item) => (
                <li key={item}><Link href="#">{item}</Link></li>
              ))}
            </ul>
            <h4 className="title24">Alumni</h4>
            <ul>
              {ALUMNI.map((item) => (
                <li key={item}><Link href="#">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Student Corner */}
          <div className="hmburger_col">
            <h4 className="title24">Student Corner</h4>
            <ul>
              {STUDENT_CORNER.map((item) => (
                <li key={item}><Link href="#">{item}</Link></li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}