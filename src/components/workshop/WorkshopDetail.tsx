"use client"
import { useState, useEffect } from "react";
import ReactParser from "../common/reactParser/ReactParser";
import Link from "next/link";

export function WorkshopDetail({data}:{data:any}) {
    const [showSocialMenus, setShowSocialMenus] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.href);
        setPageTitle(data?.data?.heading || document.title || "");
    }, [data?.data?.heading]);

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
                <div className="newst_details_header">
                    {data?.data?.date && (
                        <p className="date">
                            {new Date(data?.data?.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    )}
                    {/* <figure>
                        <button
                            role="button"
                            className="share_btn cursor-pointer"
                            onClick={toggleMenus}
                        >
                            <img
                                src="/images/icons/share.svg"
                                className="img-fluid"
                                alt="share"
                            />
                        </button>

                        <div className={`social_buttons ${showSocialMenus ? "active" : ""}`}>
                            <Link className="fbtn share facebook" href={shareLinks.facebook} target="_blank">
                                <img src="/images/icons/f.svg" alt="icon" />
                            </Link>

                            <Link className="fbtn share whatsapp" href={shareLinks.whatsapp} target="_blank">
                                <img
                                    src="/images/icons/whatsapp-logo.webp"
                                    alt="icon"
                                    className="img-fluid"
                                />
                            </Link>

                            <Link className="fbtn share twitter" href={shareLinks.twitter} target="_blank">
                                <img src="/images/icons/x.svg" alt="icon" />
                            </Link>

                            <Link className="fbtn share instagram" href={shareLinks.instagram} target="_blank">
                                <img
                                    src="/images/icons/instagram-lcon.svg"
                                    alt="icon"
                                    className="img-fluid"
                                />
                            </Link>

                            <Link className="fbtn share linkedin" href={shareLinks.linkedin} target="_blank">
                                <img src="/images/icons/in.svg" alt="icon" />
                            </Link>

                            <Link className="fbtn share email" href={shareLinks.email} target="_blank">
                                <img src="/images/icons/email_icons.svg" alt="icon" />
                            </Link>
                        </div>
                    </figure> */}
                </div>

                {data?.data?.heading && <h1>{data.data.heading}</h1>}

                {data?.cms?.news_and_events_detail && (
                    <ReactParser html={data?.cms?.news_and_events_detail} />
                )}
            </div>
        </section>
    );
}