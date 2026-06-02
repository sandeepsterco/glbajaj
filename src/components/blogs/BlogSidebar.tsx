"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";

function getLast12Months(): { label: string; year: string; month: string }[] {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      year: String(d.getFullYear()),
      month: String(d.getMonth() + 1),
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
  currentMonth: string;
  currentSearch: string;
  slug: string;
  /** When set, archive/search/category filters link here (e.g. blog listing on detail pages). */
  listingPath?: string;
  showSearch?: boolean;
}

function normalizeComment(comment: unknown) {
  if (typeof comment === "string") return { comment };
  return comment as Record<string, unknown>;
}

function FilterChip({ label, href }: { label: string; href: string }) {
  return (
    <div className="blog_filter_chip">
      <span>{label}</span>
      <Link href={href} className="blog_filter_chip_remove" aria-label={`Remove ${label} filter`}>
        ×
      </Link>
    </div>
  );
}

export default function BlogSidebar({
  featuredBlogs,
  comments,
  categories,
  currentCategory,
  currentYear,
  currentMonth,
  currentSearch,
  slug,
  listingPath,
  showSearch = true,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch);
  const filterBase = listingPath ?? pathname;

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const buildHref = (updates: Record<string, string | null | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.delete("page");
    const query = params.toString();
    return query ? `${filterBase}?${query}` : filterBase;
  };

  const handleSearch = () => {
    router.push(buildHref({ search: searchInput.trim() || null }));
  };

  const archives = getLast12Months();
  const selectedArchive = archives.find(
    (arc) => currentYear === arc.year && currentMonth === arc.month
  );
  const archiveFilterLabel = selectedArchive?.label ?? (currentYear || null);
  const hasArchiveFilter = Boolean(currentYear);
  const selectedCategory = categories.find(
    (cat) => String(cat.id) === currentCategory
  );

  return (
    <div className="blog_listing_right">
      {showSearch && (
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
            className="btn btn-outline-secondary cursor-pointer"
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
      )}

      {featuredBlogs.length > 0 && (
        <div className="recent_post">
          <h5>Featured Posts</h5>
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

      {comments.length > 0 && (
        <div className="recent_comments">
          <h5 className="font21">Recent Comments</h5>
          {comments.map((raw: unknown, idx: number) => {
            const comment = normalizeComment(raw) as {
              author?: string;
              comment?: string;
              avatar?: string;
              blog?: { slug?: string };
            };
            return (
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
                {comment?.comment}
              </p>
              {comment?.blog?.slug && (
                <Link
                  href={`${BASE_URL}${slug}/${comment.blog.slug}`}
                  className="strech_link"
                />
              )}
            </div>
            );
          })}
        </div>
      )}

      <div className="archive_section">
        <h5 className="font21">Archives:</h5>
        {hasArchiveFilter && archiveFilterLabel && (
          <div className="blog_active_filters">
            <FilterChip
              label={archiveFilterLabel}
              href={buildHref({ year: null })}
            />
          </div>
        )}
        <ul>
          {archives.map((arc, idx) => {
            const isActive =
              currentYear === arc.year && currentMonth === arc.month;
            const href = buildHref({ year: arc.year });
            return (
              <li key={`${arc.year}-${arc.month}-${idx}`}>
                <Link href={href} className={isActive ? "active" : ""}>
                  {arc.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {categories.length > 0 && (
        <div className="categories_section">
          <h5 className="font21">Categories:</h5>
          {selectedCategory && (
            <div className="blog_active_filters">
              <FilterChip
                label={selectedCategory.name}
                href={buildHref({ category: null })}
              />
            </div>
          )}
          <ul>
            {categories.map((cat: any) => {
              const catId = String(cat.id);
              const isActive = currentCategory === catId;
              const href = buildHref({ category: catId });
              return (
                <li key={catId}>
                  <Link href={href} className={isActive ? "active" : ""}>
                    {cat.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
