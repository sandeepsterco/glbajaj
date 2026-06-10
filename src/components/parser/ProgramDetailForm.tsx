"use client"
import React, { useState, useEffect } from "react";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { State, City } from "country-state-city";
import { API_URL, RECAPTCHA_SITE_KEY } from "@/src/config/config";
import RecaptchaField from "./RecaptchaField";

interface Department {
  name: string;
  image: string;
  slug: string;
}

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  dob: string;
  state: string;      
  stateLabel: string;  
  city: string;
  department: string; 
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  state?: string;
  city?: string;
  department?: string;
  recaptcha?: string;
}

type ApiFieldErrors = Record<string, string[] | string>;

type ApiResponse = {
  success?: boolean;
  message?: string;
  errors?: ApiFieldErrors;
};

interface SubmitState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

const fetchDepartments = async (): Promise<Department[]> => {
  const { data, error } = await apiFetch("departments");
  if (error) throw new Error(error);
  return data?.data ?? [];
};


const INDIA_STATES = State.getStatesOfCountry("IN"); // sorted A–Z


function validate(fd: FormData): FormErrors {
  const e: FormErrors = {};
  if (!fd.name.trim())                        e.name       = "Name is required.";
  else if (fd.name.trim().length < 3)         e.name       = "Name must be at least 3 characters.";
  if (!fd.email.trim())                       e.email      = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) e.email = "Enter a valid email.";
  if (!fd.phone.trim())                       e.phone      = "Mobile number is required.";
  else if (!/^\d{7,15}$/.test(fd.phone))     e.phone      = "Enter a valid mobile number.";
  if (!fd.dob)                                e.dob        = "Date of birth is required.";
  if (!fd.state)                              e.state      = "State is required.";
  if (!fd.city)                               e.city       = "City is required.";
  if (!fd.department)                         e.department = "Department is required.";
  return e;
}

function normalizeApiErrors(errors?: ApiFieldErrors): FormErrors {
  const normalized: FormErrors = {};

  Object.entries(errors ?? {}).forEach(([field, value]) => {
    normalized[field as keyof FormErrors] = Array.isArray(value) ? value[0] : value;
  });

  return normalized;
}

export interface ProgramDetailFormProps {
  /** Pre-select department when opened from program list modal */
  defaultDepartmentSlug?: string;
}

export default function ProgramDetailForm({
  defaultDepartmentSlug: defaultDepartmentSlugProp,
}: ProgramDetailFormProps = {}) {
  const pathname = usePathname();
  const pathDepartmentSlug =
    pathname.split("/").filter(Boolean).slice(-2, -1)[0] ?? "";
  const defaultDepartmentSlug =
    defaultDepartmentSlugProp ?? pathDepartmentSlug;

  // Fetch departments from API
  const { data: departments = [], isLoading: deptLoading } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", countryCode: "+91",
    phone: "", dob: "", state: "", stateLabel: "",
    city: "", department: "",
  });

  const [cities, setCities] = useState<{ name: string }[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  // Pre-select department when slug is available (detail page or list modal)
  useEffect(() => {
    if (!defaultDepartmentSlug || departments.length === 0) return;
    const match = departments.some((d) => d.slug === defaultDepartmentSlug);
    if (match) {
      setFormData((prev) => ({ ...prev, department: defaultDepartmentSlug }));
    }
  }, [defaultDepartmentSlug, departments]);

  // Update cities when state changes
  useEffect(() => {
    if (formData.state) {
      const stateCities = City.getCitiesOfState("IN", formData.state);
      setCities(stateCities);
    } else {
      setCities([]);
    }
    // Reset city when state changes
    setFormData(prev => ({ ...prev, city: "" }));
    if (errors.city) setErrors(prev => ({ ...prev, city: undefined }));
  }, [formData.state]);

  const resetRecaptcha = () => {
    setRecaptchaToken(null);
    setRecaptchaKey((key) => key + 1);
  };

  // Generic field change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // State dropdown — also store the display label
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isoCode = e.target.value;
    const stateObj = INDIA_STATES.find(s => s.isoCode === isoCode);
    setFormData(prev => ({
      ...prev,
      state: isoCode,
      stateLabel: stateObj?.name ?? "",
    }));
    if (errors.state) setErrors(prev => ({ ...prev, state: undefined }));
  };

  // Blur — mark touched & validate field
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Touch everything
    const allTouched: Partial<Record<keyof FormData, boolean>> = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach(k => { allTouched[k] = true; });
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setErrors((prev) => ({ ...prev, recaptcha: "Please complete the reCAPTCHA verification." }));
      setSubmitState({ status: "error", message: "Please complete the reCAPTCHA verification." });
      return;
    }

    setSubmitState({ status: "loading", message: "" });

    try {
      const selectedDept = departments.find(d => d.slug === formData.department);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        dob: formData.dob,
        state: formData.stateLabel,
        city: formData.city,
        department_name: selectedDept?.name ?? formData.department,
        ...(recaptchaToken ? { "g-recaptcha-response": recaptchaToken } : {}),
      };

      const res = await fetch(`${API_URL}program-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: ApiResponse = await res.json();

      if (!res.ok || !result.success) {
        const apiErrors = normalizeApiErrors(result.errors);
        setErrors((prev) => ({ ...prev, ...apiErrors }));
        setTouched((prev) => ({
          ...prev,
          ...Object.fromEntries(Object.keys(apiErrors).map((key) => [key, true])),
        }));
        setSubmitState({
          status: "error",
          message: result?.message || "Something went wrong. Please try again.",
        });
        resetRecaptcha();
        return;
      }

      setSubmitState({
        status: "success",
        message: result?.message || "Thank you! Your application has been submitted. We'll be in touch shortly.",
      });

      // Reset
      setFormData({ name: "", email: "", countryCode: "+91", phone: "", dob: "", state: "", stateLabel: "", city: "", department: "" });
      setTouched({});
      setErrors({});
      resetRecaptcha();
    } catch {
      setSubmitState({ status: "error", message: "Network error. Please check your connection and try again." });
      resetRecaptcha();
    }
  };

  const isSubmitting = submitState.status === "loading";

  // Helper — show error only when field has been touched
  const fieldError = (field: keyof FormErrors) =>
    touched[field as keyof FormData] && errors[field] ? (
      <p className="field-error" role="alert">{errors[field]}</p>
    ) : null;

  return (
    <div className="program-form">
      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>

          {/* Student Name */}
          <div className={`form-group ${touched.name && errors.name ? "has-error" : ""}`}>
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {fieldError("name")}
          </div>

          {/* Email */}
          <div className={`form-group ${touched.email && errors.email ? "has-error" : ""}`}>
            <input
              type="email"
              name="email"
              placeholder="Student Email ID"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {fieldError("email")}
          </div>

          {/* Phone */}
          <div className={`form-group phone-group ${touched.phone && errors.phone ? "has-error" : ""}`}>
            {/* <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-label="Country code"
              defaultValue={'+91'}
              className="countryCode"
            >
              <option value="+91" disabled>+91</option>
            </select> */}
            <input name="countryCode" value="+91" disabled aria-label="Country code" 
              className="countryCode" />
            <input
              type="tel"
              name="phone"
              placeholder="Student Mobile No."
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
          </div>
          
          {fieldError("phone") && <div className="form-group">{fieldError("phone")}</div>}
          

          {/* Date of Birth */}
          <div className={`form-group ${touched.dob && errors.dob ? "has-error" : ""}`}>
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              max={new Date().toISOString().split("T")[0]}
            />
            {fieldError("dob")}
          </div>

          {/* State + City */}
          <div className="row">
            {/* State */}
            <div className={`form-group ${touched.state && errors.state ? "has-error" : ""}`}>
              <select
                name="state"
                value={formData.state}
                onChange={handleStateChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-label="State"
              >
                <option value="">State</option>
                {INDIA_STATES.map(s => (
                  <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                ))}
              </select>
              {fieldError("state")}
            </div>

            {/* City — populated after state chosen */}
            <div className={`form-group ${touched.city && errors.city ? "has-error" : ""}`}>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting || !formData.state}
                aria-label="City"
              >
                <option value="">
                  {formData.state
                    ? cities.length > 0 ? "City" : "No cities found"
                    : "City"}
                </option>
                {cities.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
              {fieldError("city")}
            </div>
          </div>

          {/* Department — from API */}
          <div className={`form-group ${touched.department && errors.department ? "has-error" : ""}`}>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting || deptLoading}
              aria-label="Department"
            >
              <option value="">
                {deptLoading ? "Loading departments…" : "Select Department"}
              </option>
              {departments.map(d => (
                <option key={d.slug} value={d.slug}>{d.name}</option>
              ))}
            </select>
            {fieldError("department")}
          </div>

          {/* Consent note */}
          <div className="note">
            By submitting this form, I agree to receive notifications from the University in
            the form of SMS/E-mail/Call.
          </div>

          {RECAPTCHA_SITE_KEY ? (
            <div className="form-group" style={{ marginTop: "1rem" }}>
              <RecaptchaField
                key={recaptchaKey}
                siteKey={RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  setRecaptchaToken(token);
                  setErrors((prev) => ({ ...prev, recaptcha: undefined }));
                }}
                onExpired={() => setRecaptchaToken(null)}
              />
              {errors.recaptcha ? <p className="field-error" role="alert">{errors.recaptcha}</p> : null}
            </div>
          ) : null}

          {/* Submit */}
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? <span className="btn-loading"><span className="spinner" aria-hidden="true" />Submitting…</span>
              : "Apply Now"
            }
          </button>

          {/* Feedback */}
          {submitState.status === "success" && (
            <div className="form-feedback form-feedback--success" role="alert">
              <span className="feedback-icon" aria-hidden="true">✓</span>
              {submitState.message}
            </div>
          )}
          {submitState.status === "error" && (
            <div className="form-feedback form-feedback--error" role="alert">
              <span className="feedback-icon" aria-hidden="true">✕</span>
              {submitState.message}
            </div>
          )}

        </form>
      </div>

    </div>
  );
}