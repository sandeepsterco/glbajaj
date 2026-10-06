"use client";

import { useEffect, useRef, useState } from "react";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api";
import BlogGrid from "./BlogGrid";
import BlogMain from "./BlogMain";
import BlogSidebar, {
  PENDING_BLOG_FILTERS_KEY,
  type BlogFilterValues,
} from "./BlogSidebar";

interface Props {
  initialBlogsData: any;
  initialFilters: BlogFilterValues;
  initialPage?: number;
  tagSlug?: string;
  tags?: { id?: number | string; name: string; slug: string }[];
}

function buildBlogsQuery(filters: BlogFilterValues, page: number) {
  const params = new URLSearchParams({ page: String(page) });
  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.year) params.set("year", filters.year);
  if (filters.month) params.set("month", filters.month);
  return params.toString();
}

async function fetchBlogs(filters: BlogFilterValues, page: number, tagSlug?: string) {
  const endpoint = tagSlug
    ? `blogs/tags/${encodeURIComponent(tagSlug)}?${buildBlogsQuery(filters, page)}`
    : `blogs?${buildBlogsQuery(filters, page)}`;
  return apiFetch(endpoint, {
    method: "GET",
    cache: "no-store",
  });
}

export default function BlogListingClient({
  initialBlogsData,
  initialFilters,
  initialPage = 1,
  tagSlug,
  tags: initialTags,
}: Props) {
  const [blogsData, setBlogsData] = useState<any>(initialBlogsData);
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);

  useEffect(() => {
    const pendingFilters = sessionStorage.getItem(PENDING_BLOG_FILTERS_KEY);
    if (!pendingFilters) return;

    sessionStorage.removeItem(PENDING_BLOG_FILTERS_KEY);
    try {
      const nextFilters = JSON.parse(pendingFilters) as BlogFilterValues;
      setFilters(nextFilters);
      setPage(1);
      const currentRequestId = ++requestId.current;
      setLoading(true);
      void fetchBlogs(nextFilters, 1, tagSlug).then(({ data, error }) => {
        if (currentRequestId !== requestId.current) return;
        setBlogsData(error ? null : data);
        setLoading(false);
      });
    } catch {
      sessionStorage.removeItem(PENDING_BLOG_FILTERS_KEY);
    }
  }, [tagSlug]);

  const loadBlogs = async (nextFilters: BlogFilterValues, nextPage: number) => {
    const currentRequestId = ++requestId.current;
    setLoading(true);
    const { data, error } = await fetchBlogs(nextFilters, nextPage, tagSlug);
    if (currentRequestId !== requestId.current) return;
    setBlogsData(error ? null : data);
    setLoading(false);
  };

  const handleFiltersChange = (nextFilters: BlogFilterValues) => {
    setFilters(nextFilters);
    setPage(1);
    void loadBlogs(nextFilters, 1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    void loadBlogs(filters, nextPage);
  };

  const blogsResponse = blogsData?.blogs;
  const pagination = Array.isArray(blogsResponse) ? null : blogsResponse;
  const allItems: any[] = Array.isArray(blogsResponse)
    ? blogsResponse
    : pagination?.data ?? [];
  const mainBlog = allItems[0] ?? null;
  const gridBlogs = allItems.slice(1);
  const featuredBlogs: any[] = blogsData?.featuredBlogs ?? [];
  const comments: any[] = blogsData?.comments ?? [];
  const tags = initialTags ?? Array.from(
    new Map(
      allItems
        .flatMap((blog) => (Array.isArray(blog.tags) ? blog.tags : []))
        .filter((tag) => tag.slug)
        .map((tag) => [tag.slug, tag]),
    ).values(),
  );

  return (
    <>
      {mainBlog && <BlogMain data={mainBlog} slug="blogs" />}
      <section className="blog_listing" aria-busy={loading}>
        <div className="container25">
          <div className="blog_listing_grid">
            <div className="blog_listing_left">
              {loading && <p aria-live="polite">Loading blogs...</p>}
              {gridBlogs.length > 0
                ? gridBlogs.map((blog: any, idx: number) => (
                    <BlogGrid key={blog.slug ?? idx} data={blog} slug="blogs" />
                  ))
                : !mainBlog && !loading && <p>No blogs found.</p>}
              {pagination && (
                <PaginationWrapper
                  currentPage={pagination?.current_page || page}
                  totalPages={pagination?.last_page || 1}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
            <BlogSidebar
              featuredBlogs={featuredBlogs}
              comments={comments}
              currentCategory={filters.category}
              currentYear={filters.year}
              currentMonth={filters.month}
              currentSearch={filters.search}
              tags={tags}
              currentTagSlug={tagSlug}
              slug="blogs"
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}