"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import ProgramApplyModal from "../../programs/ProgramApplyModal";
import type { Department } from "@/src/components/parser/programDetailForm/ProgramDetailForm";

type ApplyModalState = {
  open: boolean;
  departmentSlug?: string;
};

const ProgramApplyContext = createContext<((departmentSlug: string) => void) | null>(null);

export function useProgramApply() {
  const openApplyModal = useContext(ProgramApplyContext);
  if (!openApplyModal) {
    throw new Error("useProgramApply must be used within ProgramApplyProvider");
  }
  return openApplyModal;
}

type Props = {
  departments: Department[];
  children: ReactNode;
};

export default function ProgramApplyProviderClient({ departments, children }: Props) {
  const [applyModal, setApplyModal] = useState<ApplyModalState>({ open: false });

  const openApplyModal = useCallback((departmentSlug: string) => {
    setApplyModal({ open: true, departmentSlug });
  }, []);

  const closeApplyModal = useCallback(() => {
    setApplyModal({ open: false });
  }, []);

  return (
    <ProgramApplyContext.Provider value={openApplyModal}>
      {children}
      <ProgramApplyModal
        open={applyModal.open}
        departmentSlug={applyModal.departmentSlug}
        departments={departments}
        onClose={closeApplyModal}
      />
    </ProgramApplyContext.Provider>
  );
}