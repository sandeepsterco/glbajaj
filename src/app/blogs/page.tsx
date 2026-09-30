import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";

import { apiFetch } from "@/src/lib/api";

import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";

import BlogMain from "@/src/components/blogs/BlogMain";

import BlogGrid from "@/src/components/blogs/BlogGrid";

import BlogSidebar from "@/src/components/blogs/BlogSidebar";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

interface SearchParams {
  page?: string;

  search?: string;

  category?: string;

  year?: string;

  month?: string;

  tag_id?: string;
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

  if (params.category)
    parts.push(`category=${encodeURIComponent(params.category)}`);

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

  const tagId = params.tag_id || "";

  const hasFilters = Boolean(search || category || year || month || tagId);

  const query = buildBlogsQuery({
    page: currentPage,

    search,

    category,

    year,

    month,
  });

  const fetchOptions = hasFilters ? { cache: "no-store" as const } : undefined;

  const [{ data: blogsData, error }, seoData] = await Promise.all([
    tagId
      ? apiFetch(`blogs/tags/${encodeURIComponent(tagId)}`, fetchOptions)
      : apiFetch(`blogs?${query}`, fetchOptions),
    getPageSEO(`blogs`),
  ]);

  if (error) notFound();

  const tagBlogs: any[] | null = tagId && Array.isArray(blogsData?.blogs)
    ? blogsData.blogs
    : null;
  const pageData = blogsData?.blogs;

  const pagination = tagBlogs ? null : blogsData?.blogs;
  const allItems: any[] = tagBlogs ?? pagination?.data ?? [];
  const featuredBlogs: any[] = blogsData?.featuredBlogs ?? [];
  const comments: any[] = blogsData?.comments ?? [];
  const mainBlog = allItems[0] ?? null;
  const gridBlogs = allItems.slice(1);
  const currentTagName =
    tagBlogs
      ?.flatMap((blog) => (Array.isArray(blog.tags) ? blog.tags : []))
      .find((tag: any) => String(tag.id) === tagId)?.name ?? "";
  const slug = "blogs";

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: "",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageSlug: `${BASE_URL}blogs`,
    currentPageName: "Blogs",
    // parentMenus:[
    //   {
    //     title:'alumni',
    //     url:"alumni"
    //   },
    // ],
  };

  const globalSchema = buildGlobalSchema(globalSchemaArgs);

  return (
    <>
      {seoData?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.schema),
          }}
        />
      )}
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}
      <InnerPageLayoutWrapper
        pathname={`/${slug}`}
        slug={slug}
        tabs={null}
        mainClass="happenings_page"
        showTabs={true}
      >
        {mainBlog && <BlogMain data={mainBlog} slug={slug} />}

        <section className="blog_listing">
          <div className="container25">
            <div className="blog_listing_grid">
              <div className="blog_listing_left">
                {gridBlogs.length > 0
                  ? gridBlogs.map((blog: any, idx: number) => (
                      <BlogGrid
                        key={blog.slug ?? idx}
                        data={blog}
                        slug={slug}
                      />
                    ))
                  : !mainBlog && <p>No blogs found.</p>}

                {!tagId && (
                  <PaginationWrapper
                    currentPage={pagination?.current_page || 1}
                    totalPages={pagination?.last_page || 1}
                  />
                )}
              </div>

              <BlogSidebar
                featuredBlogs={featuredBlogs}
                comments={comments}
                currentCategory={category}
                currentYear={year}
                currentMonth={month}
                currentSearch={search}
                currentTagId={tagId}
                currentTagName={currentTagName}
                slug={slug}
              />
            </div>
          </div>
        </section>
      </InnerPageLayoutWrapper>
    </>
  );
}
