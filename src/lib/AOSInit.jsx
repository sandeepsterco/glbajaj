"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  const pathname = usePathname();

  // Initialize once, globally.
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Re-scan the DOM every time the route changes.
  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  return null;
}