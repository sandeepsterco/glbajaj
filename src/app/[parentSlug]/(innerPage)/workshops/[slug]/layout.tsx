import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import { apiFetch } from "@/src/lib/api";
import { buildEventDetailSchema } from "@/src/lib/schema/eventDetailSchema";

export default async function NewsEventsLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ parentSlug: string; slug: string }>;
  }) {
    
    const { parentSlug, slug } = await params;

    if (!parentSlug) return <>{children}</>;

    const {data, error} = await apiFetch(`workshops/${slug}`);
    const currentPageTitle = data?.workshops_details?.data?.heading;
    const pageData = data?.workshops_details?.data;

    const eventDetailSchema = {
      staticSegments:[
        {
          name:'Happenings',
          slug:parentSlug,
        },
        {
          name:'Workshops',
          slug:'workshops',
        },
        {
          name:currentPageTitle,
          slug:slug,
        },
        
      ],
      eventName:currentPageTitle,
      visibleEventDescription:pageData.description || '',
    };

    const eventSchema = buildEventDetailSchema(eventDetailSchema);

    return (
      <>
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}
        <InnerPageLayoutWrapper slug={'workshops'} pathname={`/${parentSlug}/workshops/${slug}`} tabs={null} mainClass="happenings_page" showTabs={true} currentPageTitle={currentPageTitle}>{children}</InnerPageLayoutWrapper>
      </>
    );
}