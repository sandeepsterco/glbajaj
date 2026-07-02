"use client"

import ThankYouPage from "@/src/app/(innerPage)/thank-you/page";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Subscribe() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

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

        const {data, error} = await apiFetch(`newsletter?email=${encodeURIComponent(trimmed)}`, {
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