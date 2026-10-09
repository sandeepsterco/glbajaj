"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import SocialShare from "../common/SocialShare";

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

interface BlogTag {
  id?: number | string;
  name: string;
  slug: string;
}

export interface BlogFilterValues {
  search?: string;
  category?: string;
  year?: string;
  month?: string;
}

export const PENDING_BLOG_FILTERS_KEY = "pending-blog-filters";

interface Props {
  shareTitle?:string;
  featuredBlogs: any[];
  comments: any[];
  currentCategory?: string;
  currentYear?: string;
  currentMonth?: string;
  currentSearch?: string;
  tags?: BlogTag[];
  currentTagSlug?: string;
  slug: string;
  /** When set, archive/search/category filters link here (e.g. blog listing on detail pages). */
  listingPath?: string;
  showSearch?: boolean;
  onFiltersChange?: (filters: BlogFilterValues) => void;
}

function normalizeComment(comment: unknown) {
  if (typeof comment === "string") return { comment };
  return comment as Record<string, unknown>;
}

function FilterChip({ label, href, onRemove }: {
  label: string;
  href: string;
  onRemove?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <div className="blog_filter_chip">
      <span>{label}</span>
      <Link href={href} onClick={onRemove} className="blog_filter_chip_remove" aria-label={`Remove ${label} filter`}>
        ×
      </Link>
    </div>
  );
}

export default function BlogSidebar({
  shareTitle,
  featuredBlogs,
  comments,
  currentCategory,
  currentYear,
  currentMonth,
  currentSearch,
  tags = [],
  currentTagSlug = "",
  slug,
  listingPath,
  showSearch = true,
  onFiltersChange,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [categories, setCategories] = useState<any[]>([]);
  const filterBase = listingPath ?? pathname;
  const listingHref = `${BASE_URL}${slug}`;
  const selectedCategoryParam = onFiltersChange
    ? currentCategory
    : searchParams.get("category") ?? currentCategory;

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    let mounted = true;
    async function loadCategories() {
      const { data } = await apiFetch("blog-categories");
      if (!mounted) return;
      setCategories(Array.isArray(data?.categories) ? data.categories : []);
    }
    loadCategories();
    return () => {
      mounted = false;
    };
  }, []);

  const buildHref = (updates: Record<string, string | null | undefined>) => {
    if (onFiltersChange || listingPath) return filterBase;
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.delete("page");
    const query = params.toString();
    return query ? `${filterBase}?${query}` : filterBase;
  };

  const applyFilterUpdates = (updates: Record<string, string | null | undefined>) => {
    const nextFilters = {
      search: updates.search === undefined ? currentSearch : updates.search ?? "",
      category: updates.category === undefined ? currentCategory : updates.category ?? "",
      year: updates.year === undefined ? currentYear : updates.year ?? "",
      month: updates.month === undefined ? currentMonth : updates.month ?? "",
    };

    if (onFiltersChange) {
      onFiltersChange(nextFilters);
      return;
    }

    if (listingPath) {
      sessionStorage.setItem(PENDING_BLOG_FILTERS_KEY, JSON.stringify(nextFilters));
      router.push(filterBase);
      return;
    }

    router.push(buildHref(updates));
  };

  const handleFilterClick = (
    event: MouseEvent<HTMLAnchorElement>,
    updates: Record<string, string | null | undefined>,
  ) => {
    if (!onFiltersChange && !listingPath) return;
    event.preventDefault();
    applyFilterUpdates(updates);
  };

  const handleSearch = () => {
    applyFilterUpdates({ search: searchInput?.trim() || null });
  };

  const archives = getLast12Months();
  const selectedArchive = archives.find(
    (arc) => currentYear === arc.year && currentMonth === arc.month
  );
  const archiveFilterLabel = selectedArchive?.label ?? (currentYear || null);
  const hasArchiveFilter = Boolean(currentYear);
  const selectedCategory = categories.find((cat) => {
    const catId = String(cat.id);
    const catSlug = String(cat.slug ?? "").trim().toLowerCase();
    const catName = String(cat.name ?? "").trim().toLowerCase();
    const selectedValue = String(selectedCategoryParam ?? "").trim().toLowerCase();
    return selectedValue === catId || selectedValue === catSlug || (catName && selectedValue === catName);
  });

  return (
    <div className="blog_listing_right">
      {shareTitle && (
        <div className="newst_details_header">
          <SocialShare title={shareTitle || ""} options={['facebook', 'whatsapp', 'linkedin', 'x']} showMenu={true} />
        </div>
      )}
      
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
              image?: string;
              blog?: any;
            };
            return (
            <div key={idx} className="recent_comt">
              <figure>
                <img
                  src={comment?.blog?.image || "/images/recent-comments.webp"}
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
              href={listingHref}
              onRemove={listingPath ? (event) => handleFilterClick(event, { year: null, month: null }) : undefined}
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
                <Link href={`${BASE_URL}${slug}/${arc.year}/${arc.month}`} 
                // onClick={(event) => handleFilterClick(event, { year: arc.year, month: arc.month })} 
                className={isActive ? "active" : ""}>
                  {arc.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {tags.length > 0 && (
        <div className="categories_section">
          <h5 className="font21">Tags:</h5>
          {currentTagSlug && (
            <div className="blog_active_filters">
              <FilterChip
                label={tags.find((tag) => tag.slug === currentTagSlug)?.name ?? currentTagSlug.replace(/-/g, " ")}
                href={listingHref}
              />
            </div>
          )}
          <ul>
            {tags.map((tag, idx) => (
              <li key={tag.slug ?? tag.id ?? idx}>
                <Link
                  href={`${BASE_URL}${slug}/${encodeURIComponent(tag.slug)}`}
                  className={tag.slug === currentTagSlug ? "active" : ""}
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )} 

      {categories.length > 0 && (
        <div className="categories_section">
          <h5 className="font21">Categories:</h5>
          {selectedCategory && (
            <div className="blog_active_filters">
              <FilterChip
                label={selectedCategory.name}
                href={listingHref}
                onRemove={listingPath ? (event) => handleFilterClick(event, { category: null }) : undefined}
              />
            </div>
          )}
          <ul>
            {categories.map((cat: any) => {
              const catId = String(cat.id);
              const catSlug = String(cat.slug);
              const catName = String(cat.name ?? "").trim().toLowerCase();
              const selectedValue = String(selectedCategoryParam ?? "").trim().toLowerCase();
              const isActive =
                selectedValue === catId ||
                selectedValue === catSlug.toLowerCase() ||
                selectedValue === catName;
              const href = `${BASE_URL}${slug}/category/${encodeURIComponent(catSlug)}`;
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
