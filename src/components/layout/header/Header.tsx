"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./header.css";
import { BASE_URL } from "@/src/config/config";
import { usePathname } from "next/navigation";

type MenuItem = {
  title: string;
  slug: string;
  url:string;
  children: MenuItem[];
};

function groupMenuItemsIntoColumns(menuItems: MenuItem[]): MenuItem[][] {
  const GROUPED_PAIRS: Record<string, string> = {
    "Facilities": "Quality Initiatives",
    "Happenings": "Alumni",
  };

  const columns: MenuItem[][] = [];
  let i = 0;

  while (i < menuItems.length) {
    const item = menuItems[i];
    const pairedTitle = GROUPED_PAIRS[item.title];

    if (pairedTitle && menuItems[i + 1]?.title === pairedTitle) {
      columns.push([menuItems[i], menuItems[i + 1]]);
      i += 2;
    } else {
      columns.push([item]);
      i += 1;
    }
  }

  return columns;
}

const COL_CLASSES: Record<number, string> = {
  0: "why_col",
  1: "facilities_col",
  2: "happenings_col",
};

const SOCIALS = [
  { icon: "facebook.png", label: "Facebook" },
  { icon: "x-social.png", label: "X / Twitter" },
  { icon: "youtube.png", label: "YouTube" },
  { icon: "insta.png", label: "Instagram" },
  { icon: "linkedin.png", label: "LinkedIn" },
];

export default function Header({ headerData }: { headerData?: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null);

  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const columns = groupMenuItemsIntoColumns(
    headerData?.sidebarMenu?.menuItems ?? []
  );

  return (
    <>
      <header className={`main_header ${megaMenuOpen ? " active" : ""} ${isScrolled ? "scrolled" : ""} ${isHome ? 'home_header' : 'inner_header'}`}>

        {/* Top bar */}
        <div className="top_header">
          <div className="container-fluid">
            <div className="row justify-end mx-0">
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
                      <Link href="#" aria-label={label} target="_blank" className="social_link">
                        <img src={`/images/icons/social/${icon}`} alt={label} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom nav bar */}
        <div className="bottom_header">
          <div className="container-fluid">

            <div className="btn_head_menu">
              {/* Logo */}
              <div className="site_brand">
                <Link href={BASE_URL ?? '/'} className="navbar-brand" aria-label="GL Bajaj home">
                  {isScrolled || !isHome && !megaMenuOpen ? (
                    <Image
                      src="/images/logo/colored-logo.png"
                      alt="GL Bajaj University"
                      className="img-fluid blue_logo"
                      width={415}
                      height={112}
                      priority
                    />
                  ) : (
                    <Image
                      src="/images/logo/logo.png"
                      alt="GL Bajaj University"
                      className="white_logo"
                      width={415}
                      height={112}
                      priority
                    />
                  )}
                </Link>
              </div>

              {/* Navigation */}
              <div className="site_nav">
                <ul>
                    {headerData?.headerMenu?.menuItems?.length > 0 &&
                      headerData.headerMenu.menuItems.map((item: any, itemIdx: number) => {
                        const isActive = activeMegaMenu === itemIdx;
                        // const isActive = true;
                        const hasChildren = item?.children?.length > 0;
                        const slugKey = item?.slug; // e.g. "about-glbitm", "academics"

                        // ── ACADEMICS ──────────────────────────────────────────────
                        if (slugKey === "academics") {
                          const programsItem = item.children.find(
                            (c: any) => c.title === "Programs"
                          );
                          const departmentItems = item.children.find(
                            (c: any) => c.title === "Departments"
                          );
                          const allPages = item.children.filter(
                            (c: any) => c.title !== "Departments" && c.title !== "Programs"
                          );

                          return (
                            <li
                              key={itemIdx}
                              className={`drom_menu ${isActive ? "active" : ""}`}
                              onMouseEnter={() => {
                                setActiveMegaMenu(itemIdx);
                                setMegaMenuOpen(true);
                              }}
                              onMouseLeave={() => {
                                setActiveMegaMenu(null);
                                setMegaMenuOpen(false);
                              }}
                            >
                              <Link href={item?.slug ? BASE_URL + item.slug : ""}>
                                {item.title}
                              </Link>

                              <div
                                className="dropdown_item dropdown_academics"
                                style={{
                                  transform: isActive
                                    ? "translateX(0%) scaleY(1)"
                                    : "translateX(0%) scaleY(0)",
                                  opacity: isActive ? 1 : 0,
                                }}
                              >
                                <div className="mega_container">
                                  <div className="mega_left">
                                    {programsItem && (
                                      <div className="megg_lft_top">
                                        <h4>{programsItem.title}</h4>
                                        {programsItem.entries?.length > 0 && (
                                          <ul>
                                            {programsItem.entries.map(
                                              (entry: any, eIdx: number) => (
                                                <li key={eIdx}>
                                                  <Link
                                                    href={
                                                      entry?.slug
                                                        ? BASE_URL + entry.slug
                                                        : ""
                                                    }
                                                    onClick={() => {
                                                      setMegaMenuOpen(false);
                                                      setActiveMegaMenu(null);
                                                    }}
                                                  >
                                                    {entry.data.name}
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        )}
                                      </div>
                                    )}

                                    {departmentItems && (
                                      <div className="mega_left_btm">
                                        <h4>{departmentItems.title}</h4>
                                        {departmentItems.entries?.length > 0 && (
                                          <ul>
                                            {departmentItems.entries.map(
                                              (entry: any, eIdx: number) => (
                                                <li key={eIdx}>
                                                  <Link
                                                    href={
                                                      entry?.slug
                                                        ? BASE_URL + entry.slug
                                                        : ""
                                                    }
                                                    onClick={() => {
                                                      setMegaMenuOpen(false);
                                                      setActiveMegaMenu(null);
                                                    }}
                                                  >
                                                    {entry.data.name}
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  <div className="mega_right">
                                    <ul>
                                      {allPages?.length > 0 &&
                                        allPages.map((page: any, pageIdx: number) => (
                                          <li key={pageIdx}>
                                            <Link
                                              href={BASE_URL + page?.slug}
                                              onClick={() => {
                                                setMegaMenuOpen(false);
                                                setActiveMegaMenu(null);
                                              }}
                                            >
                                              {page?.title}
                                            </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        }

                        // ── ABOUT US (nested children) ──────────────────────────────
                        // First child becomes a top-level link; the rest go inside dropdown
                        if (hasChildren) {
                          const [firstChild, ...restChildren] = item.children as MenuItem[];

                          return (
                            <li
                              key={itemIdx}
                              className={`drom_menu ${isActive ? "active" : ""}`}
                              onMouseEnter={() => {
                                setActiveMegaMenu(itemIdx);
                                setMegaMenuOpen(true);
                              }}
                              onMouseLeave={() => {
                                setActiveMegaMenu(null);
                                setMegaMenuOpen(false);
                              }}
                            >
                              {/* First child rendered as the visible nav link */}
                              <Link
                                href={firstChild?.slug ? BASE_URL + firstChild.slug : ""}
                              >
                                {item.title}
                              </Link>

                              {/* Dropdown contains firstChild's own children + restChildren */}
                              <div
                                className={`dropdown_item dropdown_${slugKey}`}
                                style={{
                                  transform: isActive
                                    ? "translateX(0%) scaleY(1)"
                                    : "translateX(0%) scaleY(0)",
                                  opacity: isActive ? 1 : 0,
                                }}
                              >
                                <div className={`mega_container inner dropdown_grid_${slugKey}`}>

                                  {/* firstChild's nested children as a column */}
                                  {firstChild?.children?.length > 0 && (
                                    <div className="dropdown_col">
                                      <h4 className={`menu_title ${firstChild?.children?.length>0 ? 'has-children':'no-children'}`}><Link href={firstChild.slug} className="menu_title_link">{firstChild.title}</Link></h4>
                                      <ul>
                                        {firstChild.children.map(
                                          (sub: MenuItem, subIdx: number) => (
                                            <li key={subIdx}>
                                              <Link
                                                href={sub?.slug ? BASE_URL + sub.slug : ""}
                                                onClick={() => {
                                                  setMegaMenuOpen(false);
                                                  setActiveMegaMenu(null);
                                                }}
                                              >
                                                {sub.title}
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Remaining top-level children each as their own column */}
                                  {restChildren.map((child: MenuItem, cIdx: number) => (
                                    <div key={cIdx} className="dropdown_col">
                                      {/* If the child itself is a link with no sub-children */}
                                      {child.children?.length === 0 ? (
                                        <Link
                                          href={child?.slug ? BASE_URL + child.slug : ""}
                                          onClick={() => {
                                            setMegaMenuOpen(false);
                                            setActiveMegaMenu(null);
                                          }}
                                        >
                                          {child.title}
                                        </Link>
                                      ) : (
                                        <>
                                          <h4>{child.title}</h4>
                                          <ul>
                                            {child.children.map(
                                              (sub: MenuItem, subIdx: number) => (
                                                <li key={subIdx}>
                                                  <Link
                                                    href={
                                                      sub?.slug ? BASE_URL + sub.slug : ""
                                                    }
                                                    onClick={() => {
                                                      setMegaMenuOpen(false);
                                                      setActiveMegaMenu(null);
                                                    }}
                                                  >
                                                    {sub.title}
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </>
                                      )}
                                    </div>
                                  ))}

                                </div>
                              </div>
                            </li>
                          );
                        }

                        // ── PLAIN LINK (no children) ────────────────────────────────
                        return (
                          <li key={itemIdx}>
                            <Link href={item?.slug ? BASE_URL + item.slug : ""}>
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>

                {/* Icons */}
                <div className="menu_bars">
                  <Link href="#" className="search_open" aria-label="Search">
                    {isScrolled || !isHome ? (
                      <img
                        src="/images/icons/header/search-icon-black.svg"
                        alt="search"
                        className="img-fluid w-100"
                      />
                    ) : (
                      <img
                        src="/images/icons/header/search-icon.svg"
                        alt="search"
                        className="img-fluid w-100"
                      />
                    )}
                  </Link>
                  <button
                    type="button"
                    className="hamb_open"
                    aria-label="Open menu"
                    aria-expanded={sidebarOpen}
                    onClick={() => setSidebarOpen(true)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    {isScrolled || !isHome ? (
                      <img
                        src="/images/icons/header/hamburger-black.svg"
                        alt="menu"
                        className="img-fluid w-100"
                      />
                    ) : (
                      <img
                        src="/images/icons/header/hamburger.svg"
                        alt="menu"
                        className="img-fluid w-100"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        id="humburgeroverlay"
        className={sidebarOpen ? "active" : ""}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
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
          {columns.map((colItems, colIdx) => (
            <div
              key={colIdx}
              className={`hmburger_col ${COL_CLASSES[colIdx] ?? ""}`}
            >
              {colItems.map((menuData, menuIdx) => (
                <React.Fragment key={menuIdx}>
                  {menuData.title && (
                    <h4 className="title24">{menuData.title}</h4>
                  )}
                  <ul>
                    {menuData.children.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link href={item?.slug ? BASE_URL + item.slug : ''} onClick={() => setSidebarOpen(false)}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>

        <Image
          src={'/images/pattern/hamburger.png'}
          width={1479}
          height={138}
          alt="hamburger pattern"
          className="hamburger_pattern img-fluid"
        />
      </div>
    </>
  );
}