"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function CourseSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["course-search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];

      const response = await fetch(
        `https://project-demo.in/jss/api/courses/search?search=${debouncedQuery}`,
      );

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      return data.data;
    },
    enabled: !!debouncedQuery, // only call when query exists
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search Courses"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <span>🔍</span>

      {/* dropdown */}
      {debouncedQuery && (
        <div className="absolute top-full left-0 w-full bg-white border rounded shadow mt-2 max-h-60 overflow-y-auto z-50">
          {/* Loading */}
          {isLoading && <p className="p-3 text-sm text-gray-500">Loading...</p>}

          {/* Error */}
          {isError && (
            <p className="p-3 text-sm text-red-500">Something went wrong</p>
          )}

          {/* No Results */}
          {!isLoading && data?.length === 0 && (
            <p className="p-3 text-sm text-gray-500">No courses found</p>
          )}

          {/* results */}
          {data?.map((course: any) => (
            <div
              key={course.id}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-none"
            >
              {course.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
