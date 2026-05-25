"use client"
import { useState, useEffect } from "react";
import ReactParser from "../common/reactParser/ReactParser";
import Link from "next/link";

export function ConferenceDetail({data}:{data:any}) {
    const [showSocialMenus, setShowSocialMenus] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.href);
        setPageTitle(data?.data?.title );
    }, [data?.data?.title]);

    const toggleMenus = () => {
        setShowSocialMenus((state) => !state);
    };

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(pageTitle);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + " " + currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        instagram: `https://www.instagram.com/`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    };

    return (
        <section className="news_details">
            <div className="container25">
                {data?.data?.title && <h1>{data.data.title}</h1>}

                {data?.cms?.news_and_events_detail && (
                    <ReactParser html={data?.cms?.news_and_events_detail} />
                )}
            </div>
        </section>
    );
}