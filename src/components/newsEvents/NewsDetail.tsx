"use client"
import { useState } from "react";
import ReactParser from "../common/reactParser/ReactParser";
import Link from "next/link";

export function NewsDetail({data}:{data:any}) {
    const [showSocialMenus, setShowSocialMenus] = useState(false);

    const toggleMenus = ()=>{
        setShowSocialMenus((state)=>!state)
    }

    return (
        <section className="news_details">
            <div className="container25">
                <div className="newst_details_header">
                    {data?.date && (
                        <p className="date">{new Date(data.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}</p>
                    )}
                    <figure>
                        <button  role="button" className="share_btn cursor-pointer" onClick={toggleMenus}><img src="/images/icons/share.svg" className="img-fluid" alt="share" /></button>
                        <div className={`social_buttons ${showSocialMenus ? 'active' : ''}`}>
                                    <Link className="fbtn" href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank"><img src="/images/icons/f.svg" alt="icon" /></Link>

                                    

                                    <a className="fbtn" href="#" target="_blank">
                                        <img src="/images/icons/whatsapp-logo.webp" alt="icon" className="img-fluid" />
                                        </a>

                                    <a className="fbtn" href="#" target="_blank"><img src="/images/icons/x.svg" alt="icon" /></a>

                                    <a className="fbtn" href="#" target="_blank"><img src="/images/icons/instagram-lcon.svg" alt="icon" className="img-fluid" /></a>

                                    <a className="fbtn" href="#" target="_blank"><img src="/images/icons/in.svg" alt="icon" /></a>

                                    <a className="fbtn" href="#" target="_blank"><img src="/images/icons/email_icons.svg" alt="icon" /></a>
                        </div>                    
                    </figure>
                </div>
                {data?.heading && (
                    <h1>{data.heading}</h1>
                )}

                {data?.news_and_events_detail && (
                    <ReactParser html={data.news_and_events_detail} />
                )}

            </div>
        </section>
    )
}