"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import RouteChangeHandler from "./parser/RouteChangeHandler";
import { useNonce } from "../lib/NonceProvider";

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

const FANCYBOX_PATHS = ["/gallery", "/digital-pathshala"];

function pageNeedsFancybox(pathname) {
  if (FANCYBOX_PATHS.some((segment) => pathname.includes(segment))) {
    return true;
  }

  return Boolean(
    document.querySelector(".media_grid_Bx, [data-fancybox]")
  );
}

function scheduleCustomJsInit() {
  if (typeof window.__scheduleInitCustomJS === "function") {
    window.__scheduleInitCustomJS();
  } else if (typeof window.__initCustomJS === "function") {
    window.__initCustomJS();
  }
}

export default function ScriptLoader() {
  const pathname = usePathname();
  const nonce = useNonce();  
  const [deferredReady, setDeferredReady] = useState(false);
  const [swiperReady, setSwiperReady] = useState(false);
  const [needsFancybox, setNeedsFancybox] = useState(false);
  const [fancyboxReady, setFancyboxReady] = useState(false);

  useEffect(() => {
    scheduleDeferredLoad(() => setDeferredReady(true));
  }, []);

  useEffect(() => {
    if (!deferredReady) return;

    const check = () => {
      const needs = pageNeedsFancybox(pathname);
      setNeedsFancybox(needs);

      if (needs && document.querySelector(".media_grid_Bx, [data-fancybox]")) {
        scheduleCustomJsInit();
      }
    };

    check();

    const timers = [500, 1500, 3000].map((delay) => window.setTimeout(check, delay));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [deferredReady, pathname]);

  useEffect(() => {
    if (!fancyboxReady || !needsFancybox) return;
    scheduleCustomJsInit();
  }, [fancyboxReady, needsFancybox]);

  const canLoadCustomJs = swiperReady && (!needsFancybox || fancyboxReady);

  return (
    <>
      {deferredReady && (
        <Script
          src="/js/swiper-bundle.min.js"
          strategy="lazyOnload"
          nonce={nonce}
          onLoad={() => setSwiperReady(true)}
        />
      )}
      {deferredReady && needsFancybox && !fancyboxReady && (
        <Script
          src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"
          strategy="lazyOnload"
          nonce={nonce}
          onLoad={() => setFancyboxReady(true)}
        />
      )}
      {canLoadCustomJs && (
        <Script src="/js/custom.js" strategy="lazyOnload" nonce={nonce} />
      )}
      {canLoadCustomJs && <RouteChangeHandler />}
    </>
  );
}
