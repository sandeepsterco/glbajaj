import { apiFetch } from "@/src/lib/api";
import ProgramApplyProviderClient from "./Programapplyproviderclient";
import type { Department } from "@/src/components/parser/programDetailForm/ProgramDetailForm";
import type { ReactNode } from "react";

async function getDepartments(): Promise<Department[]> {
  try {
    const { data, error } = await apiFetch("departments");
    if (error) return [];
    return data?.data ?? [];
  } catch {
    return [];
  }
}

export default async function ProgramApplyProvider({ children }: { children: ReactNode }) {
  const departments = await getDepartments();

  return (
    <ProgramApplyProviderClient departments={departments}>
      {children}
    </ProgramApplyProviderClient>
  );
}