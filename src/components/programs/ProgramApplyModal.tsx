"use client";

import { useEffect } from "react";
import ProgramDetailFormClient from "@/src/components/parser/programDetailForm/ProgramDetailFormClient";
import type { Department } from "@/src/components/parser/programDetailForm/ProgramDetailForm";

interface ProgramApplyModalProps {
  open: boolean;
  departmentSlug?: string;
  /** Plain data, fetched server-side by ProgramApplyProvider and passed down. */
  departments: Department[];
  onClose: () => void;
}

export default function ProgramApplyModal({
  open,
  departmentSlug,
  departments,
  onClose,
}: ProgramApplyModalProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      id="ytModalOverlay"
      className="yt-modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-label="Apply for program"
    >
      <button
        id="ytModalClose"
        type="button"
        className="yt-modal-close"
        aria-label="Close"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="yt-modal-box yt-modal-box--form">
        <ProgramDetailFormClient
          key={departmentSlug ?? "apply"}
          departments={departments}
          defaultDepartmentSlugProp={departmentSlug}
        />
      </div>
    </div>
  );
}