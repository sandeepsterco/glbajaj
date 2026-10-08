import BlogFeaturedSlider from "@/src/components/blogs/BlogFeaturedSlider";
import BlogSidebar from "@/src/components/blogs/BlogSidebar";
import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import Image from "next/image";
import BlogCommentForm from "@/src/components/blogs/BlogCommentForm";
import BlogListingClient from "@/src/components/blogs/BlogListingClient";
import { notFound, redirect } from "next/navigation";
import { buildBlogDetailSchema } from "@/src/lib/schema/blogDetailSchema";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";

interface SearchParams {
  page?: string;
  search?: string;
  category?: string;
  year?: string;
  month?: string;
}

interface BlogTag {
  id?: number | string;
  name: string;
  slug: string;
}

interface TagListingBlog {
  slug?: string;
  tags?: BlogTag[];
  [key: string]: unknown;
}

function formatBlogDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogSections({ sections }: { sections: any }) {
  if (!sections) return null;
  if (typeof sections === "string") {
    return <ReactParser html={sections} />;
  }
  return sections?.map((item: any, idx: number) => (
    <>
      {/* {item?.title && (
        <h3>{item.title}</h3>
      )} */}
      {item?.editors?.length > 0 &&
        item.editors.map((editorItem: any, editorIdx: number) => (
          <ReactParser key={editorIdx + idx} html={editorItem?.content} />
        ))}
    </>
  ));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`blogs/${slug}`);
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
  const page = Number(queryParams.page) || 1;
  const search = queryParams.search || "";
  const category = queryParams.category || "";
  const year = queryParams.year || "";
  const month = queryParams.month || "";
  const tagQuery = new URLSearchParams();

  if (category || year || month || search) redirect(`/blogs/${blogSlug}`);

  const parentSlug = "blogs";

  const [{ data }, seoData] = await Promise.all([
    apiFetch(`blogs/${blogSlug}`),
    getPageSEO(`blogs/${blogSlug}`),
  ]);

  const currentPageTitle =
  data?.details?.title ??
  blogSlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const details = data?.details;

  if (!details) {
    if (page > 1) tagQuery.set("page", String(page));
    if (search) tagQuery.set("search", search);
    if (category) tagQuery.set("category", category);
    if (year) tagQuery.set("year", year);
    if (month) tagQuery.set("month", month);
    const queryString = tagQuery.toString();
    const tagOptions = queryString ? { cache: "no-store" as const } : undefined;
    const { data: tagData, error: tagError } = await apiFetch(
      `blogs/tags/${encodeURIComponent(blogSlug)}${queryString ? `?${queryString}` : ""}`,
      tagOptions,
    );
    const tagBlogsResponse = tagData?.blogs;
    const tagBlogs: TagListingBlog[] = Array.isArray(tagBlogsResponse)
      ? (tagBlogsResponse as TagListingBlog[])
      : Array.isArray(tagBlogsResponse?.data)
        ? (tagBlogsResponse.data as TagListingBlog[])
        : [];

    if (tagError || !tagBlogsResponse) notFound();

    const tagName =
      tagBlogs
        .flatMap((blog) => (Array.isArray(blog.tags) ? blog.tags : []))
        .find((tag) => tag.slug === blogSlug)?.name ??
      blogSlug.replace(/-/g, " ");
    const tagList = Array.from(
      new Map(
        tagBlogs
          .flatMap((blog) => (Array.isArray(blog.tags) ? blog.tags : []))
          .filter((tag) => tag.slug)
          .map((tag) => [tag.slug, tag]),
      ).values(),
    );
    const tagGlobalSchema = buildGlobalSchema({
      canonicalUrl:
        seoData?.alternates?.canonical || `${BASE_URL}blogs/${blogSlug}`,
      pageTitle: seoData?.title || `${tagName} Blogs`,
      metaDescription: seoData?.description || "",
      primaryImageUrl: "",
      datePublishedIso: "",
      dateModifiedIso: "",
      languageTag: "en-IN",
      currentPageSlug: `${BASE_URL}blogs/${blogSlug}`,
      currentPageName: `${tagName} Blogs`,
      parentMenus: [{ title: "Blogs", url: "blogs" }],
    });
    return (
      <>
        {tagGlobalSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(tagGlobalSchema),
            }}
          />
        )}
        <BlogListingClient
          initialBlogsData={tagData}
          initialFilters={{ search, category, year, month }}
          initialPage={page}
          tagSlug={blogSlug}
          tags={tagList}
        />
      </>
    );
  }

  const featuredBlogs: any[] = data?.featuredBlogs ?? [];
  const comments: any[] = data?.comments ?? [];
  const featuredTags = featuredBlogs.flatMap((blog) =>
    Array.isArray(blog.tags) ? blog.tags : [],
  );
  const detailTags = (Array.isArray(details.tags) ? details.tags : [])
    .map((tag: any) => {
      const matchingTag = featuredTags.find(
        (featuredTag: any) => String(featuredTag.id) === String(tag.id),
      );
      return { ...tag, slug: tag.slug || matchingTag?.slug };
    })
    .filter((tag: any) => tag.slug);
  const listingPath = `${BASE_URL}${parentSlug}`;

  const blogDetailSchemaArgs = {
    blogUrl: `${BASE_URL}blogs/${blogSlug}` || "",
    headline: details?.title || "",
    summary: details?.description || "",
    images: [details?.image],
    datePublishedIso: details?.date || "",
    dateModifiedIso: details?.date || "",
    category: details?.category || "",
  };

  const blogDetailSchema = buildBlogDetailSchema(blogDetailSchemaArgs);

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: details?.image || "",
    datePublishedIso: details?.date || "",
    dateModifiedIso: details?.date || "",
    languageTag: "en-IN",
    currentPageName: details?.title || "",
    currentPageSlug: `${BASE_URL}blogs/${blogSlug}`,
    parentMenus: [
      {
        title: "Blogs",
        url: "blogs",
      },
    ],
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
      {blogDetailSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogDetailSchema) }}
        />
      )}
      <InnerPageLayoutWrapper slug={parentSlug} pathname={`${parentSlug}/${blogSlug}`} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>
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
              {details.date && (
                <div className="date">{formatBlogDate(details.date)}</div>
              )}
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

              <BlogFeaturedSlider blogs={featuredBlogs} listSlug={parentSlug} />

              <BlogCommentForm blogSlug={blogSlug} />

              {/* <div className="admin_form">
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
              </div> */}
            </div>

            <BlogSidebar
              featuredBlogs={featuredBlogs}
              comments={comments}
              currentCategory=""
              currentYear=""
              currentMonth=""
              currentSearch=""
              tags={detailTags}
              slug={parentSlug}
              listingPath={listingPath}
              showSearch={false}
            />
          </div>
        </div>
      </section>
      </InnerPageLayoutWrapper>
    </>
  );
}
