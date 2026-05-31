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
        strategy="lazyOnload"
        onLoad={() => setSwiperReady(true)}
      />
      <Script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js" strategy="lazyOnload" />
      {swiperReady && <Script src="/js/custom.js" strategy="lazyOnload" />}
      {swiperReady && <RouteChangeHandler />}
    </>
  );
}
