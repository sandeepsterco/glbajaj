"use client";

import Script from "next/script";

export default function ScriptLoader() {
  return (
    <>
      <Script src="/js/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/js/custom.js" strategy="afterInteractive" />
    </>
  );
}
