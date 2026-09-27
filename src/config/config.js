export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DEFAULT_API_URL = "https://project-demo.in/glbitm/api/";
export const API_URL = (process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_URL).replace(/\/+$/, "") + "/";
export const SEO_URL = process.env.NEXT_PUBLIC_SEO_URL;
export const APPLY_NOW = process.env.NEXT_PUBLIC_APPLY_NOW;
export const REVALIDATE = process.env.NEXT_PUBLIC_REVALIDATE;
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
