import ReactParserDynamic from "../components/common/reactParser/ReactParserDynamic";

export default async function HomeContent({data}:{data:any}) {
  if (!data?.modular && !data?.cms) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <h1 className="text-[5rem] font-bold">Something wrong...</h1>
      </div>
    );
  }

  const combinedHtml = data?.cms
    ? Object.values(data.cms).join("")
    : "";

  return (
    <>
      <ReactParserDynamic html={combinedHtml} />
    </>
  );
}