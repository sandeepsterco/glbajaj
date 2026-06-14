import ReactParser from './ReactParser';

export default function ReactParserDynamic({ html }: { html: string }) {
  return <ReactParser html={html} />;
}
