import PageHeader from "@/src/components/layout/header/PageHeader";
import ProgramList from "@/src/components/programs/ProgramList";
import { apiFetch } from "@/src/lib/api";
import PageLoader from "@/src/components/ui/pageLoader/PageLoader";
import { Suspense } from "react";
import "@/src/styles/inner.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { getPageSEO } from "@/src/lib/seo";
import { buildProgrammeListSchema } from "@/src/lib/schema/ProgrammeListSchema";
import { BASE_URL } from "@/src/config/config";

export async function generateMetadata() {
  return await getPageSEO(`academics/programs`);
}

export default async function ProgramsUnderGraduatePage({params}:{params:Promise<{parentSlug:string}>}) {
  const {parentSlug} = await params;
  const currentSlug = 'programs'
  const [{ data }, {data:ProgramsData}, seoData] = await Promise.all([
    apiFetch(`cms/programs-offered`),
    apiFetch(`programs`),
    getPageSEO(`academics/programs`),
  ]);

  const programsData = ProgramsData?.programs?.data || [];
  const programmeListSchemaArgs = {
    items: programsData.flatMap((group:any) =>
      (group.programs || []).map((program:any) => ({
        url: `${BASE_URL}${parentSlug}/${currentSlug}/${program.slug}`,
      }))
    ),
    listingUrl: `${BASE_URL}${parentSlug}/${currentSlug}`,
  };

  const programmeListSchema = buildProgrammeListSchema(programmeListSchemaArgs);

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
      {programmeListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(programmeListSchema) }}
        />
      )}
      <main>
        <PageHeader pathname={`${parentSlug}/${currentSlug}`} data={data?.data} slug={currentSlug} />
        <Suspense fallback={<PageLoader variant="home" />}>
          <ProgramList parentSlug={parentSlug} currentSlug={currentSlug} activeType="under-graduate" />
        </Suspense>
      </main>
    </>
  );
}
