import GalleryDetailPage from "@/src/components/gallery/GalleryDetail";
import { apiFetch } from "@/src/lib/api"
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const {slug } = await params;
    return getPageSEO(`why-glbitm/workshops/${slug}`);
}

export default async function GalleryDetail({
    params,
}: {
    params: Promise<{  slug: string }>;
}) {
    const {slug} = await params;

    const [{data, error}, seoData] = await Promise.all([
        apiFetch(`workshops-seminars/${slug}`),
        getPageSEO(`why-glbitm/workshops/${slug}`),
    ]);

    const workshopsData = data.workshop_details;

    if(error || workshopsData?.length  === 0) notFound();

    const pagePath = `why-glbitm/workshops/${slug}`;
    const globalSchema = buildPageGlobalSchema(seoData, pagePath);

    const currentSlug = 'workshops';

    return(
        <>
            {seoData.schema && (
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
                slug={currentSlug}
                pathname={`/why-glbitm/workshops/${slug}`}
                tabs={null}
                parentSlug="why-glbitm"
                mainClass="happenings_page"
                showTabs={true}
                currentPageTitle={workshopsData?.data?.title}
            >
                <GalleryDetailPage gallery_data={workshopsData} slug={slug} />
            </InnerPageLayoutWrapper>
        </>
    )
}