"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Subscribe() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();

    

    const handleSubscribe = async () => {
        const trimmed = email.trim();

        if(!trimmed){
            toast.error("Please enter your email address.", {
                position: "bottom-center",
                duration: 4000,
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(trimmed)){
            toast.error("Please enter a valid email address.", {
                position: "bottom-center",
                duration: 4000,
            });
            return;
        }

        setLoading(true);

        const query = new URLSearchParams({
            email: trimmed,
            utm_source: searchParams.get("utm_source") ?? "",
            utm_medium: searchParams.get("utm_medium") ?? "",
            utm_campaign: searchParams.get("utm_campaign") ?? "",
            utm_term: searchParams.get("utm_term") ?? "",
            utm_content: searchParams.get("utm_content") ?? "",
        });

        const {data, error} = await apiFetch(`newsletter?${query.toString()}`, {
            method:"POST",
            cache:'no-store',
        })

        setLoading(false);

        if (error) {
            toast.error("Something went wrong. Please try again.", {
                position: "bottom-center",
                duration: 4000,
            });
            return;
        }

        if (data?.success === false) {
            const firstErrorKey = Object.keys(data.errors ?? {})[0];
            const firstErrorMsg = data.errors?.[firstErrorKey]?.[0] ?? data.message ?? "Subscription failed.";

            toast.error(firstErrorMsg, {
                position: "bottom-center",
                duration: 4000,
            });
            return;
        }

        setEmail("");
        router.push("/thank-you");
    }

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter')handleSubscribe();
    }

    return (
        <div className="subscribe_box">
            <input
                type="email"
                placeholder="Enter Email to Subscribe" 
                value={email}    
                onChange={(e)=>setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
            />
            <button
                aria-label="send button"
                onClick={handleSubscribe}
                disabled={loading}
            >
                {loading ? (
                    <span className="subscribe_loader" />
                ) : (
                    <img src="/images/icons/send-yellow.svg" alt="" />
                )}
            </button>
        </div>
    )
}