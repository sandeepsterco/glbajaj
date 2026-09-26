"use client";

// Client component: needs an onClick handler, which a server component can't hold.
import { useProgramApply } from "./Programapplyproviderclient";

type Props = {
  departmentSlug: string;
};

export default function ProgramApplyButton({ departmentSlug }: Props) {
  const openApplyModal = useProgramApply();

  return (
    <button type="button" onClick={() => openApplyModal(departmentSlug)}>
      Apply Now
    </button>
  );
}