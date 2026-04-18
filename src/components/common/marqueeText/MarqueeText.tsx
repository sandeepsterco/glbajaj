"use client";

import { useRef } from "react";

function MarqueeText({ text }: { text: string }) {
  return (
    <div className="notifi_text_wrapper">
      <div className="marquee_track">
        <p className="marquee_content">
          {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}
        </p>
      </div>
    </div>
  );
}

export default MarqueeText;