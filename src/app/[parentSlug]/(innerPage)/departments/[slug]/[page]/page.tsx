import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { apiFetch } from "@/src/lib/api";

export default async function DepartmentInnerPage({
    params,
  }: {
    params: Promise<{ slug: string; page: string }>;
  }){
    const { slug, page } = await params;
    const { data, error } = await apiFetch(`department/${slug}/${page}`);

    const combinedHtml = data?.data?.cms
    ? Object.values(data?.data?.cms).join("")
    : "";

    return <ReactParserDynamic html={combinedHtml} />;
    
}