// src/components/common/ApiErrorFallback.tsx
// ✅ Server Component safe — no hooks, no "use client"

import { BASE_URL } from "@/src/config/config";
import Link from "next/link";

interface ApiErrorFallbackProps {
  message?: string;
  heading?: string;
}

export default function ApiErrorFallback({
  message,
  heading = "Something went wrong",
}: ApiErrorFallbackProps) {
  return (
    <>
      <style>{`

        .ef-root {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          background: #F7F5F0;
        }

        .ef-card {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          border: 1.5px solid #E2DDD6;
          border-radius: 4px;
          padding: 48px 40px 40px;
          box-shadow: 6px 6px 0px #D4CFC8;
        }

        .ef-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C0392B;
          background: #FDF0EE;
          border: 1px solid #F5C6C2;
          border-radius: 2px;
          padding: 3px 10px;
          margin-bottom: 24px;
        }

        .ef-icon {
          font-size: 40px;
          line-height: 1;
          margin-bottom: 16px;
          display: block;
        }

        .ef-heading {
          font-size: 28px;
          font-weight: 800;
          color: #1A1714;
          line-height: 1.15;
          margin: 0 0 12px;
          letter-spacing: -0.03em;
        }

        .ef-message {
          font-size: 12.5px;
          color: #7A746C;
          line-height: 1.75;
          margin: 0 0 32px;
          background: #F7F5F0;
          border-left: 3px solid #E2DDD6;
          padding: 10px 14px;
          border-radius: 0 2px 2px 0;
          word-break: break-word;
        }

        .ef-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .ef-btn-home {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          background: #1A1714;
          color: #F7F5F0;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.15s;
        }

        .ef-btn-home:hover { background: #333; }

        .ef-decoration {
          position: absolute;
          top: -1px;
          right: 32px;
          width: 40px;
          height: 4px;
          background: #C0392B;
          border-radius: 0 0 3px 3px;
        }
      `}</style>

      <div className="ef-root">
        <div className="container">
            <div className="ef-card">
            <div className="ef-decoration" aria-hidden="true" />

            <span className="ef-tag">API_ERROR</span>

            <span className="ef-icon" role="img" aria-label="error">⚠</span>

            <h2 className="ef-heading">{heading}</h2>

            {message && (
                <p className="ef-message">{message}</p>
            )}

            <div className="ef-actions">
                <Link href={BASE_URL ?? '/'} className="ef-btn-home">
                ← Back to home
                </Link>
            </div>
            </div>
        </div>
      </div>
    </>
  );
}