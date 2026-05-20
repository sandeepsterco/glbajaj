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
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import CompanySlider from "../../parser/CompanySlider";
import CourseSearch from "../../parser/CourseSearch";
import AddOnCourses from "../../parser/AddOnCourses";
import HomeHappenings from "../../parser/HomeHappenings";
import HomeAlumni from "../../parser/HomeAlumni";
import ContactForm from "../../parser/ContactForm";
import AboutLeadership from "../../parser/AboutLeadership";
import AwardsList from "../../parser/AwardsList";
import ConferenceLists from "../../parser/ConferenceLists";
import DepartmentHomeFaculties from "../../parser/DepartmentHomeFaculties";
import DepartmentHomeLaboratories from "../../parser/DepartmentHomeLaboratories";
import DepartmentHomeAlumni from "../../parser/DepartmentHomeAlumni";
import DepartmentHomeCourses from "../../parser/DepartmentHomeCourses";
import ResearchInnovation from "../../parser/ResearchInnovation";
import HomeFacilities from "../../parser/HomeFacilities";
import PoliciesDisclosures from "../../parser/PoliciesDisclosures";

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.attribs) {
      // ── img ──────────────────────────────────────────────────────────────────
      if (domNode.name === "img") {
        const props = attributesToProps(domNode.attribs) as any;
        const resolvedSrc = (() => {
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
        })();

        const parsedWidth =
          props.width && !isNaN(parseInt(props.width as string, 10))
            ? parseInt(props.width as string, 10)
            : undefined;
        const parsedHeight =
          props.height && !isNaN(parseInt(props.height as string, 10))
            ? parseInt(props.height as string, 10)
            : undefined;

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

      // ── a ────────────────────────────────────────────────────────────────────
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

      // ── class → className passthrough ─────────────────────────────────────
      if (domNode.attribs && domNode.attribs.class) {
        domNode.attribs.className = domNode.attribs.class;
      }

      // ── CMS component replacements ────────────────────────────────────────
      if (domNode.attribs.id === "course-search") return <CourseSearch />;
      if (domNode.attribs.id === "add-on-courses") return <AddOnCourses />;
      if (domNode.attribs.id === "research_innovation") return <ResearchInnovation />;
      if (domNode.attribs.id === "home_facilities") return <HomeFacilities />;
      if (domNode.attribs.id === "home_happenings") return <HomeHappenings />;
      if (domNode.attribs.id === "home_alumni") return <HomeAlumni />;
      if (domNode.attribs.id === "contact_form") return <ContactForm />;
      if (domNode.attribs.id === "about_leadership") return <AboutLeadership />;
      if (domNode.attribs.id === "awards_list") return <AwardsList />;
      if (domNode.attribs.id === "conference_lists") return <ConferenceLists />;
      if (domNode.attribs.id === "department_home_faculties") return <DepartmentHomeFaculties />;
      if (domNode.attribs.id === "department_home_laboratories") return <DepartmentHomeLaboratories />;
      if (domNode.attribs.id === "department_home_alumni") return <DepartmentHomeAlumni />;
      if (domNode.attribs.id === "department_home_courses") return <DepartmentHomeCourses />;
      if (domNode.attribs.id === "policies_disclosures") return <PoliciesDisclosures />;
    }
  },
};

export default function ReactParser({ html }: { html: any }) {
  const pathname = usePathname();

  // ── Re-run custom.js init on every route change and every html content swap ──
  // This fixes tabs/accordions/swipers not working after Next.js client-side nav.
  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).__initCustomJS === "function") {
      (window as any).__initCustomJS();
    }
  }, [pathname, html]);

  if (!html) return null;

  const sanitizedHtml = DOMPurify.sanitize(html, {
    ADD_ATTR: ["target"],
    ALLOWED_TAGS: [
      "a", "b", "i", "em", "strong", "span", "div", "p",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "br", "hr", "img",
      "table", "thead", "tbody", "tr", "th", "td",
      "section", "article", "aside", "header", "footer",
      "figure", "figcaption", "blockquote", "pre", "code",
      "sup", "button", "iframe",
    ],
    ALLOWED_ATTR: [
      "class", "id", "src", "alt", "href", "target",
      "width", "height", "style", "rel", "type",
      // Swiper / animation data attributes
      "data-src",
      "data-tab",
      "data-wow-delay", "data-wow-duration", "data-wow-offset", "data-wow-iteration",
      // allow any data-* attribute automatically
    ],
    // Allows all data-* attributes without listing them one by one
    ADD_DATA_URI_TAGS: ["img"],
    ALLOW_DATA_ATTR: true,   // ← key: lets all data-* through without listing each one
    FORCE_BODY: true,
  });

  return <>{parse(sanitizedHtml, options)}</>;
}