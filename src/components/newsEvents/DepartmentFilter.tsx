"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  departments: { name: string; slug: string }[];
  currentDepartment: string;
  basePath?: string;
}

export default function DepartmentFilter({ departments, currentDepartment, basePath, }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    if(basePath){
      return router.push(
        value ? `${basePath}?department=${encodeURIComponent(value)}` : basePath
      );
    }else{
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("department", value);
      } else {
        params.delete("department");
      }
      params.delete("page"); 
      router.push(`${pathname}?${params.toString()}`);
    }
    
  };

  return (
    <select
      className="form-select"
      aria-label="Select Department"
      value={currentDepartment}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value="">Select Department</option>
      {departments.map((dept) => (
        <option key={dept.slug} value={dept.slug}>
          {dept.name}
        </option>
      ))}
    </select>
  );
}