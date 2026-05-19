"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export default function CourseSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-box input_group" ref={containerRef}>
      <input
        type="text"
        placeholder="Search Courses"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setIsOpen(true);
        }}
        value={searchQuery}
        className="search_input"
        onFocus={() => setIsOpen(true)}
      />
      <img src="/images/icons/search.png" alt="search icon" className="search_icon" />

      {/* dropdown */}
      {isOpen && debouncedQuery && (
        <div
          className="absolute top-full left-0 w-full bg-white  rounded shadow mt-2 h-[30rem] overflow-y-auto z-50"
          style={{ fontFamily: "var(--font-tasa)" }}
        >
          {/* Loading */}
          {isLoading && <p className="py-[1rem] px-[2rem] text-[2rem] text-center">Loading...</p>}

          {/* Error */}
          {isError && (
            <p className="py-[1rem] px-[2rem] text-[2rem] text-red-500 text-center">Something went wrong</p>
          )}

          {/* No Results */}
          {!isLoading && data?.length === 0 && (
            <p className="no_course text-[2rem] text-center">No courses found</p>
          )}

          {/* results */}
          {data?.map((course: any) => (
            <div
              key={course.id}
              className="courses_lists hover:bg-gray-100 cursor-pointer last:border-none"
            >
              {course.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
