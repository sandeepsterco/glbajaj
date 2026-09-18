import ReactParser from "./ReactParser";

export default function ReactParserDynamic({ html, homeData }: { html: string, homeData:any }) {

  return (
    <div data-react-parser-dynamic="" style={{ display: "contents" }}>
      <ReactParser html={html} homeData={homeData} />
    </div>
  );
}