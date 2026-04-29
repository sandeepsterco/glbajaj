"use client";

import Script from "next/script";
import { useState } from "react";
import RouteChangeHandler from "./parser/RouteChangeHandler";

export default function ScriptLoader() {
  const [swiperReady, setSwiperReady] = useState(false);

  return (
    <>
      <Script
        src="/js/swiper-bundle.min.js"
        strategy="afterInteractive"
        onLoad={() => setSwiperReady(true)}
      />
      <Script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js" strategy="afterInteractive" />
      {swiperReady && <Script src="/js/custom.js" strategy="afterInteractive" />}
      {swiperReady && <RouteChangeHandler />}
    </>
  );
}
