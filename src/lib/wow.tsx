"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react"

export default function Wowjs({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const WOW = require('wowjs');
        const wow = new WOW.WOW({
            live: false,
        });
        wow.init();
    }, [pathname]);

    return <>{children}</>
}