"use client"

import { useEffect } from "react"

export default function Wowjs({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const WOW = require('wowjs');
        const wow = new WOW.WOW({
            live: false,
        });
        wow.init();
    }, []);

    return <>{children}</>
}