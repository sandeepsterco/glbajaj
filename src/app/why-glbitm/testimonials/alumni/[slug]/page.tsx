import TestimonialDetail from "@/src/components/testimonial/TestimonialDetail";
import TestimonialListing from "@/src/components/testimonial/TestimonialListing";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound, permanentRedirect } from "next/navigation";

const TYPE_SLUG = "alumni";
const isNumeric = (s: string) => /^\d+$/.test(s);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (isNumeric(slug)) return await getPageSEO(`why-glbitm/testimonials/alumni/${slug}`);
    return await getPageSEO(`why-glbitm/testimonials/alumni/${slug}`);
}

export default async function TestimonialDetailPage({ params }: { params: any }) {
    const { slug } = await params;

    if (isNumeric(slug)) {
        const page = Number(slug);
        if (page < 1) notFound();
        if (page === 1) permanentRedirect(`/why-glbitm/testimonials/${TYPE_SLUG}`);
        return <TestimonialListing typeSlug={TYPE_SLUG} page={page} />;
    }

    const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
        apiFetch(`testimonial/${slug}`),
        apiFetch(`cms/testimonials`),
        getPageSEO(`why-glbitm/testimonials/alumni/${slug}`),
    ]);

    if (error) notFound();

    const pageData = CmsData?.data;
    const modularData = data?.testimonial_details?.data;

    const globalSchemaArgs = {
        canonicalUrl: seoData?.alternates?.canonical || BASE_URL || '',
        pageTitle: seoData?.title || '',
        metaDescription: seoData?.description || '',
        primaryImageUrl: modularData?.image || '',
        datePublishedIso: modularData?.created_at || '',
        dateModifiedIso: modularData?.updated_at || '',
        languageTag: 'en-IN',
        currentPageName: modularData?.name || '',
        currentPageSlug: `${BASE_URL}why-glbitm/testimonials/alumni/${slug}`,
        parentMenus: [
            ...(pageData?.parent_menus ?? []),
            {
            title: pageData?.page_title,
            url: pageData?.current_page_slug,
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
            <TestimonialDetail data={data?.testimonial_details} />
        </>
    )
}