"use client";

import { useState } from "react";

export default function CopyUrlButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <button type="button" className="apply_btn" onClick={handleCopy}>
            {copied ? "Copied!" : "Share"}
        </button>
    );
}
