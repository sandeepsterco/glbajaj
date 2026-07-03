"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect } from "react";
import { markAwaitingParser } from "@/src/lib/mainContentReady";

const ReactParser = dynamic(() => import("./ReactParser"), { ssr: false });

export default function ReactParserDynamic({ html }: { html: string }) {
  if (typeof window !== "undefined" && html) {
    markAwaitingParser();
  }

  useLayoutEffect(() => {
    if (html) markAwaitingParser();
  }, [html]);

  return (
    <div data-react-parser-dynamic="" style={{ display: "contents" }}>
      <ReactParser html={html} />
    </div>
  );
}
