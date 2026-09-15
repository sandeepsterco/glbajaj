"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import { markAwaitingParser } from "@/src/lib/mainContentReady";

const ReactParser = dynamic(() => import("./ReactParser"), { ssr: false });

export default function ReactParserDynamic({ html }: { html: string }) {
  const markedHtmlRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (html && markedHtmlRef.current !== html) {
      markedHtmlRef.current = html;
      markAwaitingParser();
    }
  }, [html]);

  return (
    <div data-react-parser-dynamic="" style={{ display: "contents" }}>
      <ReactParser html={html} />
    </div>
  );
}