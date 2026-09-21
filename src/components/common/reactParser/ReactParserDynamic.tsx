import ReactParser from "./ReactParser";

export default function ReactParserDynamic({ html, homeData, params, searchParams}: { html: string, homeData?:any; params?:any; searchParams?:any }) {

  return (
    <div data-react-parser-dynamic="" style={{ display: "contents" }}>
      <ReactParser html={html} homeData={homeData} params={params} searchParams={searchParams} />
    </div>
  );
}