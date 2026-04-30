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
import HomeAlumni from "../../parser/HomeAlumni";
import ContactForm from "../../parser/ContactForm";
import AboutLeadership from "../../parser/AboutLeadership";
import AwardsList from "../../parser/AwardsList";
import ConferenceLists from "../../parser/ConferenceLists";

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.attribs) {
      if (domNode.name === "img") {
        const props = attributesToProps(domNode.attribs) as any;
        const resolvedSrc = (() => {
          const s = props.src || "";
          if (!s)
            return "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
          if (s.startsWith("http") || s.startsWith("/") || s.startsWith("data:"))
            return s;
          return "/" + s;
        })();

        const parsedWidth =
          props.width && !isNaN(parseInt(props.width as string, 10))
            ? parseInt(props.width as string, 10)
            : undefined;
        const parsedHeight =
          props.height && !isNaN(parseInt(props.height as string, 10))
            ? parseInt(props.height as string, 10)
            : undefined;

        // `next/image` requires explicit dimensions unless using `fill`.
        // For CMS HTML where width/height may be missing, fall back to a plain <img>.
        if (!parsedWidth || !parsedHeight) {
          const { src: _src, width: _w, height: _h, ...rest } = props;
          return (
            <img
              {...rest}
              src={resolvedSrc}
              alt={props.alt || ""}
              style={{ ...(props.style || {}) }}
            />
          );
        }
        return (
          <Image
            {...props}
            src={resolvedSrc}
            alt={props.alt || ""}
            width={parsedWidth}
            height={parsedHeight}
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
      if (domNode.attribs.id === "course-search") {
        return <CourseSearch />;
      }

      // if (domNode.attribs.id === "test-module") {
      //   return <CompanySlider />;
      // }

      if (domNode.attribs.id === "add-on-courses") {
        return <AddOnCourses />;
      }

      if (domNode.attribs.id === "home_happenings") {
        return <HomeHappenings />;
      }

      if (domNode.attribs.id === "home_alumni") {
        return <HomeAlumni />;
      }

      if (domNode.attribs.id === "contact_form") {
        return <ContactForm />;
      }

      if (domNode.attribs.id === "about_leadership") {
        return <AboutLeadership />;
      }

      if (domNode.attribs.id === "awards_list") {
        return <AwardsList />;
      }

      if (domNode.attribs.id === "conference_lists") {
        return <ConferenceLists />;
      }
    }
  },
};

export default function ReactParser({ html }: { html: any }) {
  if (!html) return null;

  const sanitizedHtml = DOMPurify.sanitize(html);

  return <>{parse(sanitizedHtml, options)}</>;
}
