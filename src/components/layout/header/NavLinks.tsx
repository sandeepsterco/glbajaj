"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BASE_URL } from "@/src/config/config";

interface Tab {
  slug: string;
  title: string;
}

interface NavLinksProps {
  tabs: Tab[];
  activeSlug: string;
  tabTitle: string;
  pathname: string;
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const headerHeight = 80;
  const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  window.scrollTo({ top: y, behavior: "smooth" });
  window.history.replaceState(null, "", window.location.pathname);
};

export default function NavLinks({ tabs, activeSlug, tabTitle, pathname }: NavLinksProps) {
  const buildHref = (item: Tab) => {
    return pathname.includes("department")
      ? BASE_URL + "department/" + item.slug
      : BASE_URL + item.slug;
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If href contains '#', extract the hash and scroll to section
    if (href.includes("#")) {
      const hash = href.split("#")[1];
      scrollToSection(hash);
      // e.preventDefault();
    }
    // Otherwise, let Next.js <Link> handle normal navigation
  };

  return (
    <div className="inner_nav">
      <div className="about_menu_label paragraph">{tabTitle}</div>
      <ul className="about_menu_links">
        {tabs.map((item, itemIdx) => {
          const href = buildHref(item);
          if(pathname.includes('department') && item.title.toLowerCase() == 'home') return;
          return (
            <li key={itemIdx}>
              <Link
                href={href}
                className={`paragraph ${item.slug === activeSlug ? "active" : ""}`}
                onClick={(e) => handleClick(e, href)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}