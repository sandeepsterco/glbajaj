"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import RouteChangeHandler from "./parser/RouteChangeHandler";

function scheduleDeferredLoad(callback) {
  let done = false;

  const run = () => {
    if (done) return;
    done = true;
    callback();
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 2500 });
  } else {
    window.setTimeout(run, 2500);
  }

  window.addEventListener("scroll", run, { passive: true, once: true });
  window.addEventListener("pointerdown", run, { once: true });
}

function pageNeedsFancybox(pathname) {
  if (pathname.includes("/gallery") || pathname.includes("/digital-pathshala")) {
    return true;
  }

  return Boolean(
    document.querySelector(".media_grid_Bx, [data-fancybox]")
  );
}

export default function ScriptLoader() {
  const pathname = usePathname();
  const [deferredReady, setDeferredReady] = useState(false);
  const [swiperReady, setSwiperReady] = useState(false);
  const [needsFancybox, setNeedsFancybox] = useState(false);
  const [fancyboxReady, setFancyboxReady] = useState(false);

  useEffect(() => {
    scheduleDeferredLoad(() => setDeferredReady(true));
  }, []);

  useEffect(() => {
    if (!deferredReady) return;

    setNeedsFancybox(pageNeedsFancybox(pathname));

    const recheck = window.setTimeout(() => {
      setNeedsFancybox(pageNeedsFancybox(pathname));
    }, 2000);

    return () => window.clearTimeout(recheck);
  }, [deferredReady, pathname]);

  const canLoadCustomJs = swiperReady && (!needsFancybox || fancyboxReady);

  return (
    <>
      {deferredReady && (
        <Script
          src="/js/swiper-bundle.min.js"
          strategy="lazyOnload"
          onLoad={() => setSwiperReady(true)}
        />
      )}
      {deferredReady && needsFancybox && !fancyboxReady && (
        <Script
          src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"
          strategy="lazyOnload"
          onLoad={() => setFancyboxReady(true)}
        />
      )}
      {canLoadCustomJs && (
        <Script src="/js/custom.js" strategy="lazyOnload" />
      )}
      {canLoadCustomJs && <RouteChangeHandler />}
    </>
  );
}
