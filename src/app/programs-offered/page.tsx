export const dynamic = "force-dynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import ProgramList from "@/src/components/programs/ProgramList";
import { apiFetch } from "@/src/lib/api";
import PageLoader from "@/src/components/ui/pageLoader/PageLoader";
import { Suspense } from "react";
import "@/src/styles/inner.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { getPageSEO } from "@/src/lib/seo";

export async function generateMetadata() {
  return await getPageSEO(`programs-offered`);
}

export default async function ProgramsOffered() {
  const [{ data }, seoData] = await Promise.all([
    apiFetch(`cms/programs-offered`),
    getPageSEO(`programs-offered`),
  ]);

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
      <main>
        <PageHeader data={data?.data} slug="programs-offered" />
        <Suspense fallback={<PageLoader variant="home" />}>
          <ProgramList />
        </Suspense>
      </main>
    </>
  );
}
