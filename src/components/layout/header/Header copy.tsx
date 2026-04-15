"use client";

import Link from "next/link";
import MobileMenuClient from "./MobileMenuClient";
import Image from "next/image";
import { BASE_URL } from "@/src/config/config";
import { useState } from "react";
import { SOCIAL_LINKS } from "@/src/data/header/headerData";

function TopBar() {
  return (
    <div className="hidden lg:flex">
      <div className="container mx-auto lg:flex justify-end">
        <div className="bg-[#000000] lg:inline-flex items-center text-[#fff] px-[1.5rem] py-[0.5rem] text-[1.8rem] leading-[2.4rem]">
          <span className="flex items-center gap-[1rem]">
            Toll free No:{" "}
            <Link
              href="tel:8010002234"
              className="text-white font-semibold hover:text-amber-300 transition-colors"
            >
              801 000 2234
            </Link>
          </span>
          <span className="w-[1px] h-[1.5rem] bg-[#D2AB67] mx-[2rem]" />
          <div className="flex items-center gap-[2rem]">
            {SOCIAL_LINKS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-[1.2rem] h-[1.2rem] flex items-center justify-center text-white"
              >
                <Image
                  src={s.icon}
                  alt={s.label}
                  width={12}
                  height={12}
                  priority
                  className="max-w-[max-content] h-auto"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopNav({
  hoveredIndex,
  setHoveredIndex,
  menuItems,
}: {
  hoveredIndex: null | number;
  setHoveredIndex: (i: number | null) => void;
  menuItems: any;
}) {
  const hoveredItem = hoveredIndex !== null ? menuItems?.[hoveredIndex] : null;
  const subMenus =
    hoveredItem && "subMenus" in hoveredItem ? hoveredItem.subMenus : null;

  return (
    <nav
      className="hidden lg:flex gap-[4rem] relative"
      aria-label="Primary navigation"
      // onMouseLeave={() => setHoveredIndex(null)}
    >
      {menuItems?.map((item: any, index: number) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
        >
          <Link
            href={`${BASE_URL}${item.url}`}
            className={`relative  py-[1.5rem] text-[2.1rem] leading-[3.6rem] transition-colors duration-200 whitespace-nowrap flex items-center h-full ${hoveredIndex === index ? "text-[#FECE49]" : "text-[#fff]"}`}
          >
            {item.title}
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#926B29] transition-all duration-300 z-10 ${hoveredIndex === index ? "w-full" : "w-0"}`}
            />
          </Link>
        </div>
      ))}
    </nav>
  );
}

export default function GLBajajHeader({ headerData }: { headerData: any }) {
  console.log("header data headerData", headerData);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hoveredItem =
    hoveredIndex !== null ? headerData?.menuItems?.[hoveredIndex] : null;
  const hasSubMenus = hoveredItem && "subMenus" in hoveredItem;
  const subMenus =
    hoveredItem && "subMenus" in hoveredItem ? hoveredItem.subMenus : null;

  return (
    <header className="w-full absolute top-0 z-999">
      <TopBar />
      <div className="bg-transparent relative">
        <div className="container">
          <div className="flex gap-[3rem] justify-between">
            <div className="logo" onMouseEnter={() => setHoveredIndex(null)}>
              <Image
                src={"/images/logo/logo.png"}
                width={520}
                height={168}
                alt="Logo"
                priority
                className="max-w-[41.5rem]"
              />
            </div>
            <div className="flex gap-[3rem] relative">
              <div className="hidden lg:flex flex-1 justify-end">
                <DesktopNav
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  menuItems={headerData?.menuItems || []}
                />
              </div>
              <div className="">
                <MobileMenuClient />
              </div>

              {/* Outer Mega Menu Dropdown */}
              <div
                className={`absolute left-0 top-[calc(100%-3px)] w-full transition-all duration-300 z-[9999] ${subMenus ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
              >
                <div className=" text-white pt-[6.6rem] flex gap-[24.6rem] border-t border-white/10 pointer-events-auto pr-[15rem]">
                  {subMenus && (
                    <>
                      <div className="flex-1 flex flex-col gap-[10rem]">
                        {subMenus.leftMenus?.map(
                          (section: any, idx: number) => (
                            <div key={idx}>
                              {section.title ? (
                                <h4 className="text-[#D2AB67] text-[2.4rem] leading-[3.6rem] font-semibold mb-[5rem] tracking-wide">
                                  {section.title}
                                </h4>
                              ) : (
                                <h4 className="text-transparent select-none text-[1.8rem] font-semibold mb-[1.5rem] tracking-wide pointer-events-none border-none"></h4>
                              )}
                              <ul className="flex flex-col">
                                {section.menus.map(
                                  (link: any, lidx: number) => (
                                    <li
                                      key={lidx}
                                      className="border-b border-[#C08552]/30 relative group/link"
                                    >
                                      <Link
                                        href={link.href}
                                        className="block py-[1rem] text-[1.6rem] leading-[2.4rem] transition-all duration-200 hover:text-[#D2AB67] hover:translate-x-[0.5rem] flex items-center font-normal"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          ),
                        )}
                      </div>

                      <div className="flex-1 flex flex-col gap-[3.5rem]">
                        {subMenus.rightMenus?.map(
                          (section: any, idx: number) => (
                            <div key={idx}>
                              {section.title && (
                                <h4 className="text-[#D2AB67] text-[2.4rem] leading-[3.6rem] font-semibold mb-[1.5rem]">
                                  {section.title}
                                </h4>
                              )}
                              <ul className="flex flex-col">
                                {section.menus.map(
                                  (link: any, lidx: number) => (
                                    <li
                                      key={lidx}
                                      className="border-b border-[#C08552]/30 last:border-0 relative group/link"
                                    >
                                      <Link
                                        href={link.href}
                                        className="block py-[1.2rem] text-[1.5rem] text-white/90 transition-all duration-200 hover:text-[#D2AB67] hover:translate-x-[0.5rem]"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          ),
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`backdrop${hasSubMenus ? " fixed bg-[#333333] left-0 top-0 w-full h-screen opacity-90 z-[-1]" : ""} `}
      />
    </header>
  );
}
