import { apiFetch } from "@/src/lib/api";
import ProgramDetailFormClient from "./ProgramDetailFormClient";

export interface Department {
  name: string;
  image: string;
  slug: string;
}

async function getDepartments(): Promise<Department[]> {
  try {
    const { data, error } = await apiFetch("departments");
    if (error) return [];
    return data?.data ?? [];
  } catch {
    return [];
  }
}

export interface ProgramDetailFormProps {
  /** Pre-select department when opened from program list modal */
  defaultDepartmentSlug?: string;
}

export default async function ProgramDetailForm({
  defaultDepartmentSlug,
}: ProgramDetailFormProps = {}) {
  const departments = await getDepartments();

  return (
    <ProgramDetailFormClient
      departments={departments}
      defaultDepartmentSlugProp={defaultDepartmentSlug}
    />
  );
}