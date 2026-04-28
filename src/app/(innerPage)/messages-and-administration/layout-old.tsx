// (innerPage)/news-events/layout.tsx
import { getSlug } from "@/src/lib/getSlug";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import { headers } from "next/headers";

export default async function MessagesAdministrationLayout({ children }: { children: React.ReactNode }) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') ?? '';
    const parts = pathname.split('/').filter(Boolean);

    // Only render wrapper if we're on the listing page (1 segment: /news-events)
    // Skip if we're on detail page (2 segments: /news-events/some-slug)
    if (parts.length !== 1) return <>{children}</>;

    const slug = parts[0];
    return <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>{children}</InnerPageLayoutWrapper>;

}