"use client";
import { useState } from "react";
import { NOTIFICATIONS } from "@/src/data/homepage/heroSliderData";

export default function NotificationBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <>
      <div className="absolute px-[5.3rem] py-[1.6rem] z-30 bg-[#000000]/69 backdrop-blur-[0.4rem] border-t border-white/10 flex items-center w-[128.6rem] mx-auto left-1/2 -translate-x-1/2 mt-[-3.5rem]">
        <div className="flex-shrink-0 flex items-center text-white text-[2.4rem] leading-[3.6rem] font-bold">
          Notifications
        </div>

        <div className="flex-1 overflow-hidden mx-3">
          <div className="ticker-track flex gap-16 whitespace-nowrap animate-ticker">
            {[...NOTIFICATIONS, ...NOTIFICATIONS].map((n, i) => (
              <span
                key={i}
                className="text-gray-300 text-[11px] tracking-wide inline-block"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss notifications"
          className="flex-shrink-0 mr-3 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <svg
            width="8"
            height="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 10 10"
          >
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 28s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
