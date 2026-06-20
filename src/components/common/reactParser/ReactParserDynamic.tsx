
"use client"
import dynamic from "next/dynamic";

const ReactParser = dynamic(()=>import('./ReactParser'), {ssr:false});

export default function ReactParserDynamic({ html }: { html: string }) {
  return <ReactParser html={html} />;
}
