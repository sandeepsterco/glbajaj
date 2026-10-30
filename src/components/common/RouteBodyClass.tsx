"use client"
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteBodyClass(){
    const pathname = usePathname();

    useEffect(()=>{
        let routeClass = pathname == '/' ? 'homepage' :pathname.split('/').filter(Boolean).join("-")
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") + '-page';
        

        if(!routeClass) return;
        document.body.classList.add(routeClass);

        return()=>document.body.classList.remove(routeClass);
    }, [pathname])

    return null;
}