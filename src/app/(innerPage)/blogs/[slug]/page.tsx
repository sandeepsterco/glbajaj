import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import BlogFeaturedSlider from "@/src/components/blogs/BlogFeaturedSlider";
import BlogSidebar from "@/src/components/blogs/BlogSidebar";
import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import Image from "next/image";

interface SearchParams {
  search?: string;
  category?: string;
  year?: string;
  month?: string;
}

function buildFilterQuery(params: {
  search: string;
  category: string;
  year: string;
  month: string;
}) {
  const parts: string[] = [];
  if (params.search) parts.push(`search=${encodeURIComponent(params.search)}`);
  if (params.category) parts.push(`category=${encodeURIComponent(params.category)}`);
  if (params.year) parts.push(`year=${encodeURIComponent(params.year)}`);
  if (params.month) parts.push(`month=${encodeURIComponent(params.month)}`);
  return parts.length ? `?${parts.join("&")}` : "";
}

function formatBlogDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogSections({ sections }: { sections: unknown }) {
  if (!sections) return null;
  if (typeof sections === "string") {
    return <ReactParser html={sections} />;
  }
  if (typeof sections === "object") {
    return Object.entries(sections as Record<string, string>).map(([key, html]) => (
      <ReactParser key={key} html={html} />
    ));
  }
  return null;
}

export default async function BlogDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug: blogSlug } = await params;
  const queryParams = await searchParams;
  const search = queryParams.search || "";
  const category = queryParams.category || "";
  const year = queryParams.year || "";
  const month = queryParams.month || "";
  const hasFilters = Boolean(search || category || year || month);

  const filterQuery = buildFilterQuery({ search, category, year, month });
  const fetchOptions = hasFilters ? { cache: "no-store" as const } : undefined;
  const listSlug = "blogs";

  const [{ data, error }, { data: categoriesData }] = await Promise.all([
    apiFetch(`blogs/${blogSlug}${filterQuery}`, fetchOptions),
    apiFetch("blog-categories", fetchOptions),
  ]);

  if (error) {
    return <ApiErrorFallback heading="Couldn't load blog" message={error} />;
  }

  const details = data?.details;
  if (!details) {
    return (
      <ApiErrorFallback
        heading="Couldn't load blog"
        message="Blog details were not found."
      />
    );
  }

  const featuredBlogs: any[] = data?.featuredBlogs ?? [];
  const comments: any[] = data?.comments ?? [];
  const categories: any[] = categoriesData?.categories ?? [];
  const listingPath = `${BASE_URL}${listSlug}`;

  return (
    <>
      <section className="blog_details_banner">
        <div className="container-lg">
          <div className="txdcx_banner_img">
            <figure>
              <Image
                src={details.image || "/images/blog-details-banner.webp"}
                alt={details.title || "GL Bajaj"}
                className="img-fluid w-100"
                width={1200}
                height={500}
                priority
              />
            </figure>
            <figcaption>
              {details.date && <div className="date">{formatBlogDate(details.date)}</div>}
              {details.title && <h3>{details.title}</h3>}
              {details.description && <p>{details.description}</p>}
            </figcaption>
          </div>
        </div>
      </section>

      <section className="blog_details">
        <div className="container25">
          <div className="blog_details_grid">
            <div className="blog_details_left">
              {details.description && !details.sections && (
                <blockquote>{details.description}</blockquote>
              )}

              <BlogSections sections={details.sections} />

              <BlogFeaturedSlider blogs={featuredBlogs} listSlug={listSlug} />

              <div className="admin_form">
                <div className="admin_header">
                  <figure>
                    <img
                      src="/images/admin-profile.webp"
                      className="img-fluid"
                      alt="admin profile"
                    />
                  </figure>
                  <div className="admin_details">
                    <h5>Admin</h5>
                    <p>Author</p>
                  </div>
                </div>

                <h4 className="font24">Leave a Reply</h4>
                <p>
                  Your email address will not be published. Required fields are marked *
                </p>
                <form>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        aria-label="First name"
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        aria-label="Last name"
                      />
                    </div>
                    <div className="col-lg-12">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                      />
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        className="form-control"
                        id="blogComment"
                        rows={5}
                        placeholder="Comment"
                      />
                    </div>
                    <div className="col-lg-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                          Save my name, email, and website in this browser for the next time I
                          comment.
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="btn post_cumment">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <BlogSidebar
              featuredBlogs={featuredBlogs}
              comments={comments}
              categories={categories}
              currentCategory={category}
              currentYear={year}
              currentMonth={month}
              currentSearch={search}
              slug={listSlug}
              listingPath={listingPath}
              showSearch={false}
            />
          </div>
        </div>
      </section>
    </>
  );
}
