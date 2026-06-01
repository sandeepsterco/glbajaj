"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Department {
  name: string;
  slug: string;
  image: string;
}

interface FacultyFiltersProps {
  departments: Department[];
  currentDepartment: string;
  currentFilter: string;
}

export default function FacultyFilters({
  departments,
  currentDepartment,
  currentFilter,
}: FacultyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset both paginations on filter change
      params.delete("grid_page");
      params.delete("table_page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="faculty_header">
      <select
        className="form-select"
        aria-label="Select Department"
        value={currentDepartment}
        onChange={(e) => updateParam("department", e.target.value)}
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept.slug} value={dept.slug}>
            {dept.name}
          </option>
        ))}
      </select>

      <select
        className="form-select sort_by"
        aria-label="Sort order"
        value={currentFilter}
        onChange={(e) => updateParam("filter", e.target.value)}
      >
        <option value="a-z">Sort A – Z</option>
        <option value="z-a">Sort Z – A</option>
      </select>
    </div>
  );
}