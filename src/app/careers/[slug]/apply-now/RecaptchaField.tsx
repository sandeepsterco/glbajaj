"use client";

import dynamic from "next/dynamic";

const ReCAPTCHAWidget = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
  loading: () => <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Loading reCAPTCHA…</p>,
});

type RecaptchaFieldProps = {
  siteKey: string;
  onChange: (token: string | null) => void;
  onExpired: () => void;
};

export default function RecaptchaField({ siteKey, onChange, onExpired }: RecaptchaFieldProps) {
  if (!siteKey) return null;
  return <ReCAPTCHAWidget sitekey={siteKey} onChange={onChange} onExpired={onExpired} />;
}
