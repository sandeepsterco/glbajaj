import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import Link from "next/link";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ parentSlug: string }>;
}) {
    const { parentSlug } = await params;
    return getPageSEO(`${parentSlug}/notices-announcements`);
}

interface SearchParams {
    page?: string;
    search?: string;
    category?: string;
    year?: string;
    month?: string;
}

export default async function NoticesAnnouncement({
    params,
    searchParams,
  }: {
    params: Promise<{ parentSlug: string }>;
    searchParams: Promise<SearchParams>;
  }) {
    const { parentSlug } = await params;
    const sp = await searchParams;
    const currentPage = Number(sp.page) || 1;

    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`notice-and-announcements?page=${currentPage}`),
        getPageSEO(`${parentSlug}/notices-announcements`),
    ]);
    const slug = "notices-announcements";

    if (error) notFound();
    const pagination = data?.notice_and_announcements;
    const updatedData = data?.notice_and_announcements?.data;
    const pagePath = `${parentSlug}/notices-announcements`;
    const globalSchema = buildPageGlobalSchema(seoData, pagePath);

    return (
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
            <InnerPageLayoutWrapper slug={slug} pathname={`/${parentSlug}/notices-announcements`} tabs={null} mainClass="happenings_page" showTabs={false}>
                <section className="notice_announcement">
                    <div className="container25">
                        <div className="notice_grid">
                            {updatedData && updatedData?.map((item: any, idx: number) => (
                                <div key={idx} className="notice_list">
                                    {item?.date && (
                                        <h4>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                    )}
                                    {item?.title && (
                                        <p dangerouslySetInnerHTML={{ __html: item.title }} />
                                    )}
                                    {item?.slug && (item?.no_detail !== 'true') && (
                                        <Link href={`${BASE_URL}notices-announcements/${item.slug}`} className="strech_link" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <PaginationWrapper
                        currentPage={pagination?.current_page || 1}
                        totalPages={pagination?.last_page || 1}
                    />
                </section>
            </InnerPageLayoutWrapper>

        </>
    )
}