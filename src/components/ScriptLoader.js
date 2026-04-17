"use client";

import Script from "next/script";
import { useState } from "react";

export default function ScriptLoader() {
  const [swiperReady, setSwiperReady] = useState(false);

  return (
    <>
      <Script
        src="/js/swiper-bundle.min.js"
        strategy="afterInteractive"
        onLoad={() => setSwiperReady(true)}
      />
      {swiperReady && <Script src="/js/custom.js" strategy="afterInteractive" />}
    </>
  );
}
