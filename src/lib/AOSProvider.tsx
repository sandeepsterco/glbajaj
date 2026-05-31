"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "../styles/scroll-reveal.css";

function applyDelay(el: Element) {
  const delay = el.getAttribute("data-aos-delay");
  if (delay) {
    (el as HTMLElement).style.setProperty("--aos-delay", delay);
  }
}

function initScrollReveal(root: ParentNode = document) {
  const elements = root.querySelectorAll<HTMLElement>("[data-aos]:not(.is-revealed)");
  if (!elements.length) return () => {};

  elements.forEach(applyDelay);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  elements.forEach((el) => {
    if (el.closest(".home_banner")) return;
    observer.observe(el);
  });

  return () => observer.disconnect();
}

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const disconnect = initScrollReveal();
    const refreshTimer = window.setTimeout(() => initScrollReveal(), 150);

    return () => {
      disconnect();
      window.clearTimeout(refreshTimer);
    };
  }, [pathname]);

  return children;
}
