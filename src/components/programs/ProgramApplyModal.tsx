"use client";

import { useEffect } from "react";
import ProgramDetailForm from "@/src/components/parser/ProgramDetailForm";

interface ProgramApplyModalProps {
  open: boolean;
  departmentSlug?: string;
  onClose: () => void;
}

export default function ProgramApplyModal({
  open,
  departmentSlug,
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
        <ProgramDetailForm
          key={departmentSlug ?? "apply"}
          defaultDepartmentSlug={departmentSlug}
        />
      </div>
    </div>
  );
}
