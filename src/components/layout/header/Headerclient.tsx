"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./header.css";
import { BASE_URL } from "@/src/config/config";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = {
  title: string;
  slug: string;
  url: string;
  children: MenuItem[];
};

function groupMenuItemsIntoColumns(menuItems: MenuItem[]): MenuItem[][] {
  // Fixed 1-2-2-1 distribution across 4 columns
  const distributions = [1, 1, 1, 1];
  const columns: MenuItem[][] = [];
  let i = 0;

  for (const count of distributions) {
    const slice = menuItems.slice(i, i + count);
    if (slice.length > 0) columns.push(slice);
    i += count;
  }

  return columns;
}

const COL_CLASSES: Record<number, string> = {
  0: "why_col",
  1: "facilities_col",
  2: "alumni_col",
  3: "happenings_col",
};

const SOCIALS = [
  { icon: "facebook.png", label: "Facebook", href:"https://www.facebook.com/glbitm" },
  { icon: "x-social.png", label: "X / Twitter", href:"https://x.com/glbajaj" },
  { icon: "youtube.png", label: "YouTube", href:"https://www.youtube.com/user/glbitm07" },
  { icon: "insta.png", label: "Instagram", href:"https://www.instagram.com/glbajajitm/" },
  { icon: "linkedin.png", label: "LinkedIn", href:"https://www.linkedin.com/school/g-l-bajaj-institute-of-technology-and-management/" },
];

// Resolves label for any child type:
// - child_menu entries have `title`
// - module entries have `data.name`
function getChildLabel(sub: any): string {
  if (sub?.title) return sub.title;
  if (sub?.data?.name) return sub.data.name;
  return "";
}

// Renders a single column (used for both mega_left and mega_right items)
function MenuColumn({
  child,
  setMegaMenuOpen,
  setActiveMegaMenu,
}: {
  child: any;
  setMegaMenuOpen: (v: boolean) => void;
  setActiveMegaMenu: (v: number | null) => void;
}) {
  const hasSubChildren =
    child.has_children === true && child.children?.length > 0;
  const childSlug = child?.slug ? BASE_URL + child.slug : child?.target_blank_url ? child.target_blank_url : "#";
  const childTarget = child?.target_blank_url ? "_blank" : "_self";
  const isNavigable = child?.slug && child.slug !== "#";

  return (
    <div
      className={`dropdown_col ${hasSubChildren ? "has-children" : "no-children"}`}
    >
      <h4
        className={`menu_title ${hasSubChildren ? "has-children" : "no-children"}`}
      >
        <Link
          href={childSlug}
          className="menu_title_link"
          target={childTarget}
          onClick={() => {
            if (isNavigable) {
              setMegaMenuOpen(false);
              setActiveMegaMenu(null);
            }
          }}
        >
          {child.title}
        </Link>
      </h4>

      {hasSubChildren && (
        <ul>
          {child.children.map((sub: any, subIdx: number) => {
            const label = getChildLabel(sub);
            const subSlug = sub?.slug ? BASE_URL + sub.slug : sub?.target_blank_url ? sub.target_blank_url : "#";
            const subTarget = sub?.target_blank_url ? "_blank" : "_self";
            const subNavigable = sub?.slug && sub.slug !== "#";

            if (!label) return null;

            return (
              <li key={subIdx}>
                <Link
                  href={subSlug}
                  target={subTarget}
                  onClick={() => {
                    if (subNavigable) {
                      setMegaMenuOpen(false);
                      setActiveMegaMenu(null);
                    }
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function HeaderClient({ headerData }: { headerData?: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const columns = groupMenuItemsIntoColumns(
    headerData?.sidebarMenu?.menuItems ?? []
  );

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    if (trimmed.length < 3) {
      setSearchError("Please enter at least 3 characters");
      return;
    }
    setSearchError("");
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`${BASE_URL}search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <header
        className={`main_header${megaMenuOpen ? " active" : ""} ${isScrolled ? "scrolled" : ""} ${isHome ? "home_header" : "inner_header"}`}
      >
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
                  {SOCIALS.map(({ icon, label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        aria-label={label}
                        target="_blank"
                        className="social_link"
                      >
                        <img
                          src={`/images/icons/social/${icon}`}
                          alt={label}
                        />
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
                <Link
                  href={BASE_URL ?? "/"}
                  className="navbar-brand"
                  aria-label="GL Bajaj home"
                >
                  {(isScrolled && !megaMenuOpen) || (!isHome && !megaMenuOpen) ? (
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
                    headerData.headerMenu.menuItems.map(
                      (item: any, itemIdx: number) => {
                        const isActive = activeMegaMenu === itemIdx;
                        const hasChildren = item?.has_children === true;
                        const slugKey = item?.slug;

                        if (hasChildren) {
                          const leftItems = item.children.filter(
                            (c: any) =>
                              c.position === "left" || c.type === "module"
                          );
                          const rightItems = item.children.filter(
                            (c: any) =>
                              c.position === "right" && c.type !== "module"
                          );
                          const noPositionItems = item.children.filter(
                            (c: any) =>
                              c.position !== "left" &&
                              c.position !== "right" &&
                              c.type !== "module"
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
                              <Link
                                href={item?.slug ? BASE_URL + item.slug : ""}
                              >
                                {item.title}
                              </Link>

                              <div
                                className={`dropdown_item dropdown_${slugKey}`}
                                style={{
                                  transform: isActive
                                    ? "translateX(0%) scaleY(1)"
                                    : "translateX(0%) scaleY(0)",
                                  opacity: isActive ? 1 : 0,
                                }}
                              >
                                <div
                                  className={`mega_container dropdown_grid_${slugKey}`}
                                >
                                  {/* LEFT COLUMN */}
                                  {leftItems.length > 0 && (
                                    <div className="mega_left">
                                      {leftItems.map(
                                        (child: any, cIdx: number) => (
                                          <MenuColumn
                                            key={cIdx}
                                            child={child}
                                            setMegaMenuOpen={setMegaMenuOpen}
                                            setActiveMegaMenu={
                                              setActiveMegaMenu
                                            }
                                          />
                                        )
                                      )}
                                    </div>
                                  )}

                                  {/* RIGHT COLUMN */}
                                  {(rightItems.length > 0 ||
                                    noPositionItems.length > 0) && (
                                    <div className="mega_right">
                                      {[
                                        ...rightItems,
                                        ...noPositionItems,
                                      ].map((child: any, cIdx: number) => (
                                        <MenuColumn
                                          key={cIdx}
                                          child={child}
                                          setMegaMenuOpen={setMegaMenuOpen}
                                          setActiveMegaMenu={setActiveMegaMenu}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </li>
                          );
                        }

                        // Plain link — no children
                        return (
                          <li key={itemIdx}>
                            <Link
                              href={item?.slug ? BASE_URL + item.slug : item?.target_blank_url ? item.target_blank_url : '#'}
                              target={item?.target_blank_url ? '_blank' : '_self'}
                            >
                              {item.title}
                            </Link>
                          </li>
                        );
                      }
                    )}
                </ul>

                {/* Icons */}
                <div className="menu_bars">
                  <Link
                    href="#"
                    className="search_open"
                    aria-label="Search"
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchOpen(true);
                    }}
                  >
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
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
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

      {/* Search dialog */}
      {searchOpen && (
        <div className="global_search_dialog active">
          <div className="g_sc_box">
            <div className="sec_inpu_box">
              <div>
                <input
                  type="text"
                  className="form-control global_search_in"
                  placeholder="Search courses, departments, faculty…"
                  value={searchQuery}
                  autoFocus
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim().length >= 3) setSearchError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  type="button"
                  className="btn global_search_btn"
                  onClick={handleSearch}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
              {searchError && (
                <p
                  className="search_error"
                  style={{
                    color: "#b7b7b7",
                    font: "var(--font-12)",
                    position: "absolute",
                    marginTop: "0.5rem",
                  }}
                >
                  {searchError}
                </p>
              )}
            </div>
            <button
              className="secbtn_close cursor-pointer"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
                setSearchError("");
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

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
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
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
                    {menuData.children.map((item:any, itemIdx:number) => (
                      <li key={itemIdx}>
                        <Link
                        href={item?.slug ? BASE_URL + item.slug : item?.target_blank_url ? item.target_blank_url : ""}
                        target={item?.target_blank_url ? "_blank" : "_self"}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {item.title}
                      </Link>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>

        <Image
          src={"/images/pattern/hamburger.png"}
          width={1479}
          height={138}
          alt="hamburger pattern"
          className="hamburger_pattern img-fluid"
        />
      </div>
    </>
  );
}