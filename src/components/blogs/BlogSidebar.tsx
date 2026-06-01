"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";

// Generate last 12 months from today
function getLast12Months(): { label: string; value: string }[] {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      // API takes year, pass YYYY-MM so you can filter by month too if needed
      // If API only supports year, use d.getFullYear().toString()
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    });
  }
  return months;
}

interface Props {
  featuredBlogs: any[];
  comments: any[];
  categories: any[];
  currentCategory: string;
  currentYear: string;
  currentSearch: string;
  slug: string;
}

export default function BlogSidebar({
  featuredBlogs,
  comments,
  categories,
  currentCategory,
  currentYear,
  currentSearch,
  slug,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    updateParam("search", searchInput.trim());
  };

  const archives = getLast12Months();

  return (
    <div className="blog_listing_right">
      {/* Search */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleSearch}
        >
          <img
            src="/images/icons/search-icon.svg"
            className="img-fluid"
            alt="search"
          />
        </button>
      </div>

      {/* Recent Posts */}
      {featuredBlogs.length > 0 && (
        <div className="recent_post">
          <h5>Recent Posts</h5>
          <ul>
            {featuredBlogs.map((blog: any, idx: number) => (
              <li key={blog.slug ?? idx}>
                <p>{blog.title}</p>
                <span>
                  <img
                    src="/images/icons/arrow-right.svg"
                    alt="arrow"
                    className="img-fluid"
                  />
                </span>
                {blog.slug && (
                  <Link
                    href={`${BASE_URL}${slug}/${blog.slug}`}
                    className="strech_link"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Comments */}
      {comments.length > 0 && (
        <div className="recent_comments">
          <h5 className="font21">Recent Comments</h5>
          {comments.map((comment: any, idx: number) => (
            <div key={idx} className="recent_comt">
              <figure>
                <img
                  src={comment?.avatar || "/images/recent-comments.webp"}
                  className="img-fluid"
                  alt={comment?.author || "commenter"}
                />
              </figure>
              <p>
                {comment?.author && <strong>{comment.author}</strong>}
                {comment?.author ? " on " : ""}
                {comment?.blog_title}
              </p>
              {comment?.blog_slug && (
                <Link
                  href={`${BASE_URL}${slug}/${comment.blog_slug}`}
                  className="strech_link"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Archives */}
      <div className="archive_section">
        <h5 className="font21">Archives:</h5>
        <ul>
          {archives.map((arc) => (
            <li key={arc.value}>
              <button
                className={`archive-btn${currentYear === arc.value ? " active" : ""}`}
                onClick={() => updateParam("year", currentYear === arc.value ? "" : arc.value)}
              >
                {arc.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="categories_section">
          <h5 className="font21">Categories:</h5>
          <ul>
            {categories.map((cat: any) => (
              <li key={cat.id ?? cat.slug}>
                <button
                  className={`category-btn${currentCategory === String(cat.id ?? cat.slug) ? " active" : ""}`}
                  onClick={() =>
                    updateParam(
                      "category",
                      currentCategory === String(cat.id ?? cat.slug)
                        ? ""
                        : String(cat.id ?? cat.slug)
                    )
                  }
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}