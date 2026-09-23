import ReactParser from "@/src/components/common/reactParser/ReactParser";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { getPageSEO } from "@/src/lib/seo";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`program/${slug}`);
}

export default async function ProgramDetail({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {
    const { slug } = await params;

  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`program/${slug}`),
    getPageSEO(`program/${slug}`),
  ]);

  const combinedHtml = Object.values(data?.program_details?.cms ?? {}).join("");

  if (!combinedHtml) return <h1>Loading...</h1>;

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
      <ReactParserDynamic html={combinedHtml} />
      {data?.department && (
        <div className="program_strip">
          <div className="container25">
            <div className="content">
              <p>Learn More About the {data.department.name}</p>
              <Link
                href={`${BASE_URL}department/${data.department.slug}`}
                className="arrow_btn button_strip"
              >
                <img src="/images/home/slide_arrow_right.svg" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
