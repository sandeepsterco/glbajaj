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

  const query = new URLSearchParams({
    page: String(currentPage),
    ...(search && { search }),
    ...(category && { category }),
    ...(year && { year }),
  }).toString();

  const { data: blogsData, error } = await apiFetch(`blogs?${query}`);

  if (error) {
    return <ApiErrorFallback heading="Couldn't load blogs" message={error} />;
  }

  const pagination = blogsData?.blogs;
  const allItems: any[] = pagination?.data ?? [];
  const featuredBlogs: any[] = blogsData?.featuredBlogs ?? [];
  const comments: any[] = blogsData?.comments ?? [];
  const categories: any[] = blogsData?.categories ?? []; // ← from same response
  
  const mainBlog = allItems[0] ?? null;
  const gridBlogs = allItems.slice(1);

  const slug = "blogs";

  return (
    <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>
      {/* Hero / Featured Blog */}
      <BlogMain data={mainBlog} slug={slug} />

      {/* Listing + Sidebar */}
      <section className="blog_listing">
        <div className="container25">
          <div className="blog_listing_grid">
            <div className="blog_listing_left">
              {gridBlogs.length > 0 ? (
                gridBlogs.map((blog: any, idx: number) => (
                  <BlogGrid key={blog.slug ?? idx} data={blog} slug={slug} />
                ))
              ) : (
                <p>No blogs found.</p>
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
              currentSearch={search}
              slug={slug}
            />
          </div>
        </div>
      </section>
    </InnerPageLayoutWrapper>
  );
}