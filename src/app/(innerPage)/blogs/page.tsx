import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import BlogMain from "@/src/components/blogs/BlogMain";
import BlogGrid from "@/src/components/blogs/BlogGrid";
import BlogSidebar from "@/src/components/blogs/BlogSidebar";

interface SearchParams {
  page?: string;
  search?: string;
  category?: string;
  year?: string;
  month?: string;
}

function buildBlogsQuery(params: {
  page: number;
  search: string;
  category: string;
  year: string;
  month: string;
}) {
  const parts = [`page=${params.page}`];
  if (params.search) parts.push(`search=${encodeURIComponent(params.search)}`);
  if (params.category) parts.push(`category=${encodeURIComponent(params.category)}`);
  if (params.year) parts.push(`year=${encodeURIComponent(params.year)}`);
  if (params.month) parts.push(`month=${encodeURIComponent(params.month)}`);
  return parts.join("&");
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.search || "";
  const category = params.category || "";
  const year = params.year || "";
  const month = params.month || "";
  const hasFilters = Boolean(search || category || year || month);

  const query = buildBlogsQuery({
    page: currentPage,
    search,
    category,
    year,
    month,
  });

  const fetchOptions = hasFilters ? { cache: "no-store" as const } : undefined;

  const [{ data: blogsData, error }, { data: categoriesData }] = await Promise.all([
    apiFetch(`blogs?${query}`, fetchOptions),
    apiFetch("blog-categories", fetchOptions),
  ]);

  if (error) {
    return <ApiErrorFallback heading="Couldn't load blogs" message={error} />;
  }

  const pagination = blogsData?.blogs;
  const allItems: any[] = pagination?.data ?? [];
  const featuredBlogs: any[] = blogsData?.featuredBlogs ?? [];
  const comments: any[] = blogsData?.comments ?? [];
  const categories: any[] = categoriesData?.categories ?? [];

  const mainBlog = allItems[0] ?? null;
  const gridBlogs = allItems.slice(1);

  const slug = "blogs";

  return (
    <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>
      {mainBlog && <BlogMain data={mainBlog} slug={slug} />}

      <section className="blog_listing">
        <div className="container25">
          <div className="blog_listing_grid">
            <div className="blog_listing_left">
              {gridBlogs.length > 0 ? (
                gridBlogs.map((blog: any, idx: number) => (
                  <BlogGrid key={blog.slug ?? idx} data={blog} slug={slug} />
                ))
              ) : (
                !mainBlog && <p>No blogs found.</p>
              )}
              <PaginationWrapper
                currentPage={pagination?.current_page || 1}
                totalPages={pagination?.last_page || 1}
              />
            </div>

            <BlogSidebar
              featuredBlogs={featuredBlogs}
              comments={comments}
              categories={categories}
              currentCategory={category}
              currentYear={year}
              currentMonth={month}
              currentSearch={search}
              slug={slug}
            />
          </div>
        </div>
      </section>
    </InnerPageLayoutWrapper>
  );
}
