import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import dynamic from "next/dynamic";
const ReactParser = dynamic(
  () => import("@/src/components/common/reactParser/ReactParser"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  },
);

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
      {response.data?.sections &&
        Object.keys(response.data.sections).map((key) => {
          return <ReactParser key={key} html={response.data.sections[key]} />;
        })}
    </>
  );
}
