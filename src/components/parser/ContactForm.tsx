"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_URL, RECAPTCHA_SITE_KEY } from "@/src/config/config";
import RecaptchaField from "./RecaptchaField";

type FieldErrors = Record<string, string[] | string>;

type ContactFormState = {
  name: string;
  address: string;
  phone: string;
  email: string;
  message: string;
  type: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  errors?: FieldErrors;
};

const INITIAL_FORM: ContactFormState = {
  name: "",
  address: "",
  phone: "",
  email: "",
  message: "",
  type: "admission",
};

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldsData, setFieldsData] = useState<ContactFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  const resetFields = () => {
    setFieldsData(INITIAL_FORM);
    setErrors({});
  };

  const resetRecaptcha = () => {
    setRecaptchaToken(null);
    setRecaptchaKey((key) => key + 1);
  };

  const getFieldError = (field: string) => {
    const value = errors[field];
    if (Array.isArray(value)) return value[0];
    return typeof value === "string" ? value : "";
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFieldsData((state) => ({
      ...state,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setErrors({ recaptcha: ["Please complete the reCAPTCHA verification."] });
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}contact-form`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...fieldsData,
          ...(recaptchaToken ? { "g-recaptcha-response": recaptchaToken } : {}),
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }

        toast.error(data.message || "Failed to submit form");
        resetRecaptcha();
        return;
      }

      toast.success(data.message || "Thank you! Your message has been submitted.");
      resetFields();
      resetRecaptcha();
    } catch {
      resetFields();
      resetRecaptcha();
      toast.error("Failed to submit form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <h4>Get In Touch With Us</h4>

        <form onSubmit={submitHandler} noValidate>
          <div className="form-group">
            <input type="text" placeholder="Student Name" name="name" value={fieldsData.name} onChange={changeHandler} />
            {getFieldError("name") ? <p className="field-error" role="alert">{getFieldError("name")}</p> : null}
          </div>

          <div className="form-group">
            <input type="text" placeholder="Address" name="address" value={fieldsData.address} onChange={changeHandler} />
            {getFieldError("address") ? <p className="field-error" role="alert">{getFieldError("address")}</p> : null}
          </div>

          <div className="form-group">
            <input type="text" placeholder="Phone" name="phone" value={fieldsData.phone} onChange={changeHandler} />
            {getFieldError("phone") ? <p className="field-error" role="alert">{getFieldError("phone")}</p> : null}
          </div>

          <div className="form-group">
            <input type="email" placeholder="Email" name="email" value={fieldsData.email} onChange={changeHandler} />
            {getFieldError("email") ? <p className="field-error" role="alert">{getFieldError("email")}</p> : null}
          </div>

          <div className="form-group">
            <textarea id="exampleFormControlTextarea1" rows={5} placeholder="Message" name="message" value={fieldsData.message} onChange={changeHandler}></textarea>
            {getFieldError("message") ? <p className="field-error" role="alert">{getFieldError("message")}</p> : null}
          </div>

          <div className="form-group">
            <select name="type" value={fieldsData.type} onChange={changeHandler}>
              <option value="admission">Admission</option>
              <option value="feedback">Feedback</option>
              <option value="enquiry">Enquiry</option>
            </select>
            {getFieldError("type") ? <p className="field-error" role="alert">{getFieldError("type")}</p> : null}
          </div>

          {RECAPTCHA_SITE_KEY ? (
            <div className="form-group">
              <RecaptchaField
                key={recaptchaKey}
                siteKey={RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  setRecaptchaToken(token);
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.recaptcha;
                    return next;
                  });
                }}
                onExpired={() => setRecaptchaToken(null)}
              />
              {getFieldError("recaptcha") ? <p className="field-error" role="alert">{getFieldError("recaptcha")}</p> : null}
            </div>
          ) : null}

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Apply Now"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
}