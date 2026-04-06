import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParser from "@/src/components/common/reactParser/ReactParser";

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await apiFetch(`modular/${slug}`);

  if (response.error) {
    return <NotFound />;
  }

  if (!response.data || response.data.status !== true) {
    return <ComingSoon />;
  }

  return (
    <>
      {response.data?.sections && Object.keys(response.data.sections).map((key) => {
        return <ReactParser key={key} html={response.data.sections[key]} />;
      })}
    </>
  );
}
