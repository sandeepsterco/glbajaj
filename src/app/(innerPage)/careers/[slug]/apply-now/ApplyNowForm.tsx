"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { City, Country, ICity, ICountry, IState, State } from "country-state-city";
import { RECAPTCHA_SITE_KEY } from "@/src/config/config";
import RecaptchaField from "./RecaptchaField";

type FieldErrors = Record<string, string[]>;

type FormState = {
  opening_name: string;
  first_name: string;
  last_name: string;
  dob: string;
  father_name: string;
  gender: string;
  marital_status: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  phone: string;
  email: string;
  designation: string;
  experience: string;
  qualification: string;
  skills: string;
  name_of_organization: string;
  current_industry: string;
  functional_area: string;
  preferred_location: string;
  area_of_interest: string;
  current_salary: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  errors?: FieldErrors;
};

const INITIAL_FORM = (openingName: string): FormState => ({
  opening_name: openingName,
  first_name: "",
  last_name: "",
  dob: "",
  father_name: "",
  gender: "",
  marital_status: "",
  address: "",
  country: "",
  state: "",
  city: "",
  zipcode: "",
  phone: "",
  email: "",
  designation: "",
  experience: "",
  qualification: "",
  skills: "",
  name_of_organization: "",
  current_industry: "",
  functional_area: "",
  preferred_location: "",
  area_of_interest: "",
  current_salary: "",
});

export default function ApplyNowForm({ openingName }: { openingName: string }) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM(openingName));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  const resetRecaptcha = () => {
    setRecaptchaToken(null);
    setRecaptchaKey((key) => key + 1);
  };

  const countries = useMemo<ICountry[]>(() => Country.getAllCountries(), []);
  const states = useMemo<IState[]>(
    () => (selectedCountryCode ? State.getStatesOfCountry(selectedCountryCode) : []),
    [selectedCountryCode]
  );
  const cities = useMemo<ICity[]>(
    () =>
      selectedCountryCode && selectedStateCode
        ? City.getCitiesOfState(selectedCountryCode, selectedStateCode)
        : [],
    [selectedCountryCode, selectedStateCode]
  );

  const clearFieldError = (field: keyof FormState | "file" | "recaptcha") => {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleInputChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      clearFieldError(field);
      setSuccessMessage("");
      setErrorMessage("");
    };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    const country = countries.find((item) => item.name === countryName);
    const isoCode = country?.isoCode ?? "";

    setSelectedCountryCode(isoCode);
    setSelectedStateCode("");
    setForm((prev) => ({
      ...prev,
      country: countryName,
      state: "",
      city: "",
    }));
    clearFieldError("country");
    clearFieldError("state");
    clearFieldError("city");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const stateName = event.target.value;
    const stateData = states.find((item) => item.name === stateName);

    setSelectedStateCode(stateData?.isoCode ?? "");
    setForm((prev) => ({
      ...prev,
      state: stateName,
      city: "",
    }));
    clearFieldError("state");
    clearFieldError("city");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, city: event.target.value }));
    clearFieldError("city");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    clearFieldError("file");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setErrors({});

    if (!RECAPTCHA_SITE_KEY) {
      setErrorMessage("reCAPTCHA is not configured. Please contact support.");
      return;
    }

    if (!recaptchaToken) {
      setErrors({ recaptcha: ["Please complete the reCAPTCHA verification."] });
      setErrorMessage("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (selectedFile) {
        payload.append("file", selectedFile);
      }

      payload.append("g-recaptcha-response", recaptchaToken);

      const response = await fetch("https://project-demo.in/gl-bajaj/api/job-apply", {
        method: "POST",
        body: payload,
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setErrorMessage(result.message || "Something went wrong while submitting form.");
        resetRecaptcha();
        return;
      }

      setSuccessMessage(result.message || "Form submitted successfully.");
      setForm(INITIAL_FORM(openingName));
      setSelectedCountryCode("");
      setSelectedStateCode("");
      setSelectedFile(null);
      resetRecaptcha();
    } catch {
      setErrorMessage("Unable to submit the form right now. Please try again.");
      resetRecaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getError = (field: keyof FormState | "file" | "recaptcha") => errors[field]?.[0];

  return (
    <form onSubmit={handleSubmit}>
      

      <input type="hidden" name="opening_name" value={form.opening_name} />

      <div className="car_form_mainsec">
        <div className="input_sectilt">
          <h5>Personal Information</h5>
        </div>

        <div className="fm_gr_grid">
          <div className="form-group">
            <input type="text" placeholder="First Name" className="input_form" value={form.first_name} onChange={handleInputChange("first_name")} />
            {getError("first_name") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("first_name")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Last Name" className="input_form" value={form.last_name} onChange={handleInputChange("last_name")} />
            {getError("last_name") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("last_name")}</p> : null}
          </div>
          <div className="form-group">
            <input type="date" placeholder="Date of Birth" className="input_form" value={form.dob} onChange={handleInputChange("dob")} />
            {getError("dob") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("dob")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Father's Name" className="input_form" value={form.father_name} onChange={handleInputChange("father_name")} />
            {getError("father_name") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("father_name")}</p> : null}
          </div>
          <div className="form-group">
            <div className="genmainbox">
              <label>Gender :</label>
              <div className="gender_group">
                <input type="radio" id="male" name="gender" value="male" checked={form.gender === "male"} onChange={handleInputChange("gender")} />
                <label htmlFor="male">Male</label>
              </div>
              <div className="gender_group">
                <input type="radio" id="female" name="gender" value="female" checked={form.gender === "female"} onChange={handleInputChange("gender")} />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            {getError("gender") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("gender")}</p> : null}
          </div>

          <div className="form-group">
            <select value={form.marital_status} onChange={handleInputChange("marital_status")}>
              <option value="">Select Marital Status</option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
            </select>
            {getError("marital_status") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("marital_status")}</p> : null}
          </div>
        </div>

        <div className="input_sectilt">
          <h5>Contact Details</h5>
        </div>

        <div className="fm_gr_grid">
          <div className="form-group">
            <input type="text" placeholder="Address" className="input_form" value={form.address} onChange={handleInputChange("address")} />
            {getError("address") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("address")}</p> : null}
          </div>
          <div className="form-group">
            <select value={form.country} onChange={handleCountryChange}>
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {getError("country") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("country")}</p> : null}
          </div>
          <div className="form-group">
            <select value={form.state} onChange={handleStateChange} disabled={!selectedCountryCode}>
              <option value="">Select State</option>
              {states.map((stateData) => (
                <option key={stateData.isoCode} value={stateData.name}>
                  {stateData.name}
                </option>
              ))}
            </select>
            {getError("state") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("state")}</p> : null}
          </div>
          <div className="form-group">
            <select value={form.city} onChange={handleCityChange} disabled={!selectedCountryCode || !selectedStateCode}>
              <option value="">Select City</option>
              {cities.map((cityData) => (
                <option key={cityData.name} value={cityData.name}>
                  {cityData.name}
                </option>
              ))}
            </select>
            {getError("city") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("city")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Zipcode" className="input_form" value={form.zipcode} onChange={handleInputChange("zipcode")} />
            {getError("zipcode") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("zipcode")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Phone Number" className="input_form" value={form.phone} onChange={handleInputChange("phone")} />
            {getError("phone") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("phone")}</p> : null}
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" className="input_form" value={form.email} onChange={handleInputChange("email")} />
            {getError("email") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("email")}</p> : null}
          </div>
        </div>

        <div className="input_sectilt">
          <h5>Professional Details</h5>
        </div>

        <div className="fm_gr_grid">
          <div className="form-group">
            <input type="text" placeholder="Designation" className="input_form" value={form.designation} onChange={handleInputChange("designation")} />
            {getError("designation") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("designation")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Experience" className="input_form" value={form.experience} onChange={handleInputChange("experience")} />
            {getError("experience") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("experience")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Qualification Details" className="input_form" value={form.qualification} onChange={handleInputChange("qualification")} />
            {getError("qualification") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("qualification")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Skills" className="input_form" value={form.skills} onChange={handleInputChange("skills")} />
            {getError("skills") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("skills")}</p> : null}
          </div>
        </div>

        <div className="input_sectilt">
          <h5>Current Employee Details</h5>
        </div>

        <div className="fm_gr_grid">
          <div className="form-group">
            <input type="text" placeholder="Name of Organization" className="input_form" value={form.name_of_organization} onChange={handleInputChange("name_of_organization")} />
            {getError("name_of_organization") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("name_of_organization")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Current Industry" className="input_form" value={form.current_industry} onChange={handleInputChange("current_industry")} />
            {getError("current_industry") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("current_industry")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Functional Area" className="input_form" value={form.functional_area} onChange={handleInputChange("functional_area")} />
            {getError("functional_area") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("functional_area")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Preferred Location" className="input_form" value={form.preferred_location} onChange={handleInputChange("preferred_location")} />
            {getError("preferred_location") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("preferred_location")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Area of Interest" className="input_form" value={form.area_of_interest} onChange={handleInputChange("area_of_interest")} />
            {getError("area_of_interest") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("area_of_interest")}</p> : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Current Salary" className="input_form" value={form.current_salary} onChange={handleInputChange("current_salary")} />
            {getError("current_salary") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("current_salary")}</p> : null}
          </div>
        </div>
        <div className="fm_gr_grid">
          <div className="form-group">
            <input type="file" className="input_form" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} />
            {getError("file") ? <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("file")}</p> : null}
          </div>
          <div className="form-group" style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" className="apply_btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Apply Now"}
            </button>
          </div>
        </div>

        {RECAPTCHA_SITE_KEY ? (
          <div className="form-group" style={{ marginTop: "1rem" }}>
            <RecaptchaField
              key={recaptchaKey}
              siteKey={RECAPTCHA_SITE_KEY}
              onChange={(token) => {
                setRecaptchaToken(token);
                clearFieldError("recaptcha");
                setSuccessMessage("");
                setErrorMessage("");
              }}
              onExpired={() => setRecaptchaToken(null)}
            />
            {getError("recaptcha") ? (
              <p style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{getError("recaptcha")}</p>
            ) : null}
          </div>
        ) : null}

        {successMessage ? (
        <div className="form-feedback form-feedback--success" role="alert">
          <p>{successMessage}</p>
        </div>
      ) : null}

      {/* {errorMessage ? (
        <div className="error_message">
          <p>{errorMessage}</p>
        </div>
      ) : null} */}
      </div>
    </form>
  );
}
