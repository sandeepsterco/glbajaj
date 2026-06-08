import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data, error } = await apiFetch(`cms/${slug}`);

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");

  return <ReactParserDynamic html={combinedHtml} />;
}
