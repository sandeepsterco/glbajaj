"use client";

import parse, {
  attributesToProps,
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import CompanySlider from "../../parser/CompanySlider";
import CourseSearch from "../../parser/CourseSearch";
import AddOnCourses from "../../parser/AddOnCourses";
import HomeHappenings from "../../parser/HomeHappenings";

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.attribs) {
      if (domNode.name === "img") {
        const props = attributesToProps(domNode.attribs) as any;
        return (
          <Image
            {...props}
            src={(() => {
              const s = props.src || "";
              if (!s)
                return "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
              if (
                s.startsWith("http") ||
                s.startsWith("/") ||
                s.startsWith("data:")
              )
                return s;
              return "/" + s;
            })()}
            alt={props.alt || ""}
            width={
              props.width && !isNaN(parseInt(props.width as string, 10))
                ? parseInt(props.width as string, 10)
                : 800
            }
            height={
              props.height && !isNaN(parseInt(props.height as string, 10))
                ? parseInt(props.height as string, 10)
                : 600
            }
            style={{ ...(props.style || {}) }}
          />
        );
      }

      
      if (domNode.name === "a") {
        const props = attributesToProps(domNode.attribs) as any;
        const href = props.href || "#";
        const { href: _href, ...rest } = props;
        return (
          <Link href={href} {...rest}>
            {domToReact(domNode.children as any, options)}
          </Link>
        );
      }

      if(domNode.attribs && domNode.attribs.class){
        domNode.attribs.className = domNode.attribs.class;
      }

      //handle cms component
      if (domNode.attribs.id === "test-module") {
        return <CourseSearch />;
      }

      if (domNode.attribs.id === "test-module") {
        return <CompanySlider />;
      }

      if (domNode.attribs.id === "test-module") {
        return <AddOnCourses />;
      }

      if (domNode.attribs.id === "home_happenings") {
        return <HomeHappenings />;
      }
    }
  },
};

export default function ReactParser({ html }: { html: any }) {
  if (!html) return null;

  const sanitizedHtml = DOMPurify.sanitize(html);

  return <>{parse(sanitizedHtml, options)}</>;
}
