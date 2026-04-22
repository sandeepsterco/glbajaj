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
  const {data, error} = await apiFetch(`cms/${slug}`);

  return (
    <>
      {Object.keys(data.data?.sections).map((key) => {
        return (
          <ReactParser key={key} html={data.data.sections[key]} />
        );
      })}
    </>
  );
}
