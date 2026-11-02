
"use client";

import { useRef } from "react";
import type { InputHTMLAttributes } from "react";
import "./date-input.css";

interface DateInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  placeholder?: string;
}

export default function DateInput({
  placeholder = "Select Date",
  value = "",
  className = "",
  onChange,
  ...props
}: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    const input = inputRef.current;

    if (!input || input.disabled) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
      input.click();
    }
  };

  return (
    <div className={`custom-date-input ${className}`}>
      {!value && (
        <span className="date-placeholder">
          {placeholder}
        </span>
      )}

      <input
        {...props}
        ref={inputRef}
        type="date"
        value={value}
        onChange={onChange}
        className={`date-native-input ${!value ? "is-empty" : ""}`}
      />

      <button
        type="button"
        className="date-icon-btn"
        onClick={openDatePicker}
        disabled={props.disabled}
        aria-label="Open date picker"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
        </svg>
      </button>
    </div>
  );
}
