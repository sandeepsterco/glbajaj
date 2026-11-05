import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import TestimonialList from "@/src/components/testimonial/TestimonialList";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";
import { getTestimonialTab } from "@/src/lib/testimonialTypes";

export default async function TestimonialListing({
    typeSlug,
    page,
    seoPath = "why-glbitm/testimonials",
    basePath,                         // pagination base; default /why-glbitm/testimonials/<typeSlug>
    layoutSlug = "testimonials",      // slug for InnerPageLayoutWrapper
    pathname = "/why-glbitm/testimonials",
    parentSlug = "why-glbitm",        // pass null for no parent
    showTabs = true,
    parentMenus,                      // override schema parent menus
}: {
    typeSlug: string;
    page: number;
    seoPath?: string;
    basePath?: string;
    layoutSlug?: string;
    pathname?: string;
    parentSlug?: string | null;
    showTabs?: boolean;
    parentMenus?: { title: string; url: string }[];
}) {
    const tab = getTestimonialTab(typeSlug);
    if (!tab) notFound();

    const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
        apiFetch(`testimonial?type=${tab.apiType}&page=${page}`),
        apiFetch(`cms/testimonials`),
        getPageSEO(seoPath),
    ]);

    if (error) notFound();

    const pagination = data?.testimonials;
    if (page > 1 && !pagination?.data?.length) notFound();

    const pageData = CmsData?.data;

    const globalSchema = buildGlobalSchema({
        canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
        pageTitle: seoData?.title || "",
        metaDescription: seoData?.description || "",
        primaryImageUrl: "",
        datePublishedIso: pageData?.created_at || "",
        dateModifiedIso: pageData?.updated_at || "",
        languageTag: "en-IN",
        currentPageName: pageData?.page_title || "",
        currentPageSlug: `${BASE_URL}${seoPath}`,
        parentMenus: parentMenus ?? [...(pageData?.parent_menus ?? [])],
    });

    return (
        <>
            {seoData?.schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
                />
            )}
            {globalSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
                />
            )}
            <InnerPageLayoutWrapper
                slug={layoutSlug}
                pathname={pathname}
                parentSlug={parentSlug ?? undefined}
                tabs={null}
                mainClass="happenings_page"
                showTabs={false}
            >
                <TestimonialList
                    data={pagination}
                    typeSlug={typeSlug}
                    showTabs={showTabs}
                    basePath={basePath}
                />
            </InnerPageLayoutWrapper>
        </>
    );
}