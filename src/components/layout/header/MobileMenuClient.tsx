"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "About Us", href: "/about" },
  { label: "Courses & Admission", href: "/courses" },
  { label: "Academics", href: "/academics" },
  { label: "Departments", href: "/departments" },
  { label: "Training & Placement", href: "/placement" },
  { label: "Research", href: "/research" },
];

export default function MobileMenuClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const toggleSearch = useCallback(() => setSearchOpen((v) => !v), []);

  return (
    <>
      {/* Action icons — search + hamburger */}
      <div className="flex items-center gap-[3rem] h-full">
        {/* Search toggle */}
        <button
          onClick={toggleSearch}
          aria-label="Toggle search"
          className="text-white/80 hover:text-amber-400 transition-colors duration-200  cursor-pointer"
        >
          <Image
            src={"/images/icons/header/search.svg"}
            width={22}
            height={22}
            alt="Search"
          />
        </button>

        {/* Hamburger — mobile only */}
        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex flex-col justify-center gap-[1rem] cursor-pointer"
        >
          <span
            className={`block w-[2.4rem] h-[1px] bg-white rounded transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-[2rem] h-[1px] bg-white rounded transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-[2.4rem] h-[1px] bg-white rounded transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`absolute top-full left-0 right-0 bg-[#111]/95 backdrop-blur-sm overflow-hidden transition-all duration-300 z-40 ${
          searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 flex gap-2">
          <input
            type="search"
            placeholder="Search courses, departments, faculty…"
            className="flex-1 bg-white/10 border border-white/20 rounded-md px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            autoFocus={searchOpen}
          />
          <button className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors">
            Go
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full left-0 right-0 bg-[#1a1a1a]/98 backdrop-blur-md overflow-hidden transition-all duration-300 z-30 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col divide-y divide-white/5 px-4 pb-4 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-3.5 text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors flex items-center justify-between group"
            >
              <span>{item.label}</span>
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Mobile bottom bar */}
        <div className="border-t border-white/10 px-4 py-3 bg-black/30">
          <p className="text-[11px] text-gray-500 tracking-wide">
            Approved by AICTE &amp; Affiliated to AKTU
          </p>
        </div>
      </div>
    </>
  );
}
