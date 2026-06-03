"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AOSProvider({ children }:{children:React.ReactNode}) {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 50,
    });
  }, []);

  return children;
}