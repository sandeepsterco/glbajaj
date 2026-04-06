import Script from "next/script";

export default function ScriptLoader() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
        strategy="afterInteractive"
      />
      <Script src="/js/custom.js" strategy="afterInteractive" />
    </>
  );
}
