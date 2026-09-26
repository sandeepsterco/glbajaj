import { Suspense, lazy, useMemo } from "react";
import parse, {
  attributesToProps,
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

import HashLinkAnchor from "./HashLinkAnchor";
import CmsEnhancer from "@/src/lib/CmsEnhancer";

// import "@/src/styles/fancybox.css";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/parser.css";

const withLazyComponent = (
  loader: () => Promise<{ default: React.ComponentType<any> }>,
  props?: Record<string, any>
) => {
  const Component = lazy(loader);

  return (
    <Suspense fallback={<ParserWidgetFallback />}>
      <Component {...props} />
    </Suspense>
  );
};


const EMPTY_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p"]);
const MEDIA_TAGS = new Set(["img", "video", "iframe", "input", "textarea", "select"]);

const DOMPURIFY_ADD_ATTR = [
  "target",
  // "data-aos",
  // "data-aos-delay",
  // "data-aos-duration",
  // "data-aos-offset",
  // "data-aos-easing",
  // "data-aos-once",
  // "data-aos-mirror",
  // "data-aos-anchor",
  // "data-aos-anchor-placement",
];

const DOMPURIFY_ALLOWED_TAGS = [
  "a", "b", "i", "em", "strong", "span", "div", "p",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "br", "hr",
  "img", "table", "thead", "tbody", "tr", "th", "td",
  "section", "article", "aside", "header", "footer",
  "figure", "figcaption", "blockquote", "pre", "code",
  "sup", "sub", "button", "iframe", "nav", "main",
  "picture", "source", "video", "audio",
  "svg", "path", "circle", "rect", "line", "polyline", "polygon", "g", "use",
  "label", "form", "input", "textarea", "select", "option",
  "dl", "dt", "dd", "small", "mark", "details", "summary",
];

const DOMPURIFY_ALLOWED_ATTR = [
  "class", "id", "src", "alt", "href", "target",
  "width", "height", "style", "rel", "type",
  "data-src", "data-tab",
  "data-wow-delay", "data-wow-duration", "data-wow-offset", "data-wow-iteration",
  "data-aos", "data-aos-delay", "data-aos-duration", "data-aos-offset",
  "data-aos-easing", "data-aos-once", "data-aos-mirror",
  "data-aos-anchor", "data-aos-anchor-placement",
];

function ParserWidgetFallback() {
  return (
    <div
      className="my-[2rem] h-[20rem] w-full animate-pulse rounded bg-[#ede9e7]"
      aria-hidden="true"
    />
  );
}

function hasMeaningfulContent(node: any): boolean {
  if (node.type === "text") {
    return node.data?.trim().length > 0;
  }

  if (node.type === "tag") {
    if (node.attribs?.id) return true;
    if (MEDIA_TAGS.has(node.name)) return true;
    if (node.children?.length) {
      return node.children.some(hasMeaningfulContent);
    }
    return false;
  }

  return false;
}

function hashString(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

const getParserOptions = (homeData: any, params?:any, searchParams?:any, data?:any): HTMLReactParserOptions => {
  
  const idComponentMap: Record<string, () => React.ReactElement> = {
    "course-search": () => withLazyComponent(() => import("../../parser/CourseSearch")),
    home_course_tabs: () => withLazyComponent(() => import("../../parser/HomeCoursesTabs")),
    "add-on-courses": () => withLazyComponent(() => import("../../parser/AddOnCourses"), { homeData }),
    "program-add-on-courses": () => withLazyComponent(() => import("../../parser/ProgramAddOnCourses")),
    research_innovation: () => withLazyComponent(() => import("../../parser/ResearchInnovation"), { homeData }),
    home_facilities: () => withLazyComponent(() => import("../../parser/homeFacilities/HomeFacilities")),
    home_happenings: () => withLazyComponent(() => import("../../parser/HomeHappenings"), { homeData }),
    home_alumni: () => withLazyComponent(() => import("../../parser/HomeAlumni"), { homeData }),
    contact_form: () => withLazyComponent(() => import("../../parser/ContactForm")),
    about_leadership: () => withLazyComponent(() => import("../../parser/about/AboutLeadership")),
    awards_list: () => withLazyComponent(() => import("../../parser/awardList/AwardsList"), { params, searchParams }),
    achievement_list: () => withLazyComponent(() => import("../../parser/achievementList/AchievementList"), { searchParams }),
    conference_lists: () => withLazyComponent(() => import("../../parser/conferenceLists/ConferenceLists"), { params, searchParams }),
    department_home_faculties: () => withLazyComponent(() => import("../../parser/DepartmentHomeFaculties")),
    department_home_laboratories: () => withLazyComponent(() => import("../../parser/department/home/DepartmentHomeLaboratories"), { params, data }),
    department_home_alumni: () => withLazyComponent(() => import("../../parser/department/home/DepartmentHomeAlumni"), { params, data }),
    program_detail_alumni: () => withLazyComponent(() => import("../../parser/ProgramDetailAlumni")),
    department_home_courses: () => withLazyComponent(() => import("../../parser/DepartmentHomeCourses"), { params }),
    department_home_happenings: () => withLazyComponent(() => import("../../parser/department/home/DepartmentHomeHappenings"), { params }),
    policies_disclosures: () => withLazyComponent(() => import("../../parser/PoliciesDisclosures")),
    placement_record: () => withLazyComponent(() => import("../../parser/PlacementRecord")),
    intership_record: () => withLazyComponent(() => import("../../parser/IntershipRecord"), { params }),
    department_home_activities: () => withLazyComponent(() => import("../../parser/DepartmentHomeActivities")),
    digital_pathshala_videos: () => withLazyComponent(() => import("../../parser/DigitalPathshalaVideoGrid")),
    why_clubs_grid: () => withLazyComponent(() => import("../../parser/WhyClubsGrid"), { params, searchParams }),
    alumni_events_meet: () => withLazyComponent(() => import("../../parser/AlumniEventsMeetGrid")),
    admission_programs: () => withLazyComponent(() => import("../../parser/admissions/AdmissionPrograms")),
    department_notifications: () => withLazyComponent(() => import("../../parser/DepartmentNotificationBar")),
    department_home_clubs: () => withLazyComponent(() => import("../../parser/department/home/DepartmentHomeClubs"), { params, data }),
    department_home_ceo: () => withLazyComponent(() => import("../../parser/DepartmentHomeCEO")),
    department_home_collaborations: () => withLazyComponent(() => import("../../parser/department/home/DepartmentHomeMou"), { params, data }),
    department_home_achievement: () => withLazyComponent(() => import("../../parser/DepartmentHomeAchievement"), { data }),
    coe_labs_grid_section: () => withLazyComponent(() => import("../../parser/DepartmentLabsGrids")),
    department_faculty_grid: () => withLazyComponent(() => import("../../parser/DepartmentFacultyGrid")),
    program_detail_form: () => withLazyComponent(() => import("../../parser/programDetailForm/ProgramDetailForm")),
    department_home_placements: () => withLazyComponent(() => import("../../parser/department/home/DepartmentHomePlacements"), { data }),
    home_placements: () => withLazyComponent(() => import("../../parser/HomePlacements"), { homeData }),
    career_job_listing: () => withLazyComponent(() => import("../../parser/CareerJobListing")),
    home_upcoming_events: () => withLazyComponent(() => import("../../parser/homeUpcomingEvents/HomeUpcomingEvents")),
    home_highlights: () => withLazyComponent(() => import("../../parser/homeHighlights/HomeHighlights")),
    program_detail_placements: () => withLazyComponent(() => import("../../parser/ProgramDetailPlacements")),
    department_home_research: () => withLazyComponent(() => import("../../parser/department/home/DepartmentHomeResearch"), { params, data }),
    home_course_right: () => withLazyComponent(() => import("../../parser/HomeCourseRight")),
    alumni_achievement_list: () => withLazyComponent(() => import("../../parser/AlumniAchievementList")),
    intern_slider: () => withLazyComponent(() => import("../../parser/internSlider/InternSlider")),
  };

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (!(domNode instanceof Element && domNode.attribs)) return;

      if (EMPTY_TAGS.has(domNode.name)) {
        const hasText = domNode.children.some(
          (child) => child.type === "text" && (child as any).data?.trim() !== ""
        );
        const hasElement = domNode.children.some((child) => child.type === "tag");
        if (!hasText && !hasElement) return <></>;
      }

      if (domNode.name === "a") {
        const props = attributesToProps(domNode.attribs) as any;
        const href = props.href?.trim();
        const classList = (domNode.attribs?.class || "").split(" ");

        if (
          (classList.includes("dynamic_btn") || classList.includes("strech_link")) &&
          (!href || href === "#")
        ) {
          return <></>;
        }

        const { href: _href, ...rest } = props;

        if (href && href.startsWith("#")) {
          return (
            <HashLinkAnchor {...rest} href={href}>
              {domToReact(domNode.children as any, options)}
            </HashLinkAnchor>
          );
        }

        return (
          <Link href={href || "#"} prefetch={false} {...rest}>
            {domToReact(domNode.children as any, options)}
          </Link>
        );
      }

      if (domNode.name === "img") {
        const props = attributesToProps(domNode.attribs) as any;
        const resolvedSrc = (() => {
          const s = props.src || "";
          if (!s) return "";
          if (s.startsWith("http") || s.startsWith("/") || s.startsWith("data:")) return s;
          return "/" + s;
        })();

        if (!resolvedSrc) return <></>;

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
              loading="lazy"
              decoding="async"
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
            loading="lazy"
            style={{ ...(props.style || {}) }}
          />
        );
      }

      if (domNode.name === "iframe") {
        const classList = (domNode.attribs?.class || "").split(/\s+/);
        const src = (domNode.attribs?.src || "").trim();
        if (classList.includes("parser_common") && !src) return <></>;
      }

      if (domNode.name === "div") {
        const hasId = !!domNode.attribs?.id;
        const hasContent = (domNode.children || []).some(hasMeaningfulContent);

        // Remove ONLY truly empty div
        if (!hasId && !hasContent) return <></>;
      }

      // Clean AOS runtime classes so SSR/CSR markup stays stable
      if (domNode.attribs?.class) {
        const cleanedClass = domNode.attribs.class
          .replace(/\baos-init\b/g, "")
          .replace(/\baos-animate\b/g, "")
          .replace(/\s+/g, " ")
          .trim();
        if (cleanedClass) {
          domNode.attribs.class = cleanedClass;
        } else {
          delete domNode.attribs.class;
        }
      }

      // Single O(1) lookup replaces the ~40-branch if/else chain
      if (domNode.attribs.id) {
        const factory = idComponentMap[domNode.attribs.id];
        if (factory) return factory();
      }
    },
  };

  return options;
};

// ---------------------------------------------------------------------------
// ReactParser
// ---------------------------------------------------------------------------

export default function ReactParser({ html, homeData, params, searchParams, data }: { html: any; homeData?: any; params?:any; searchParams?:any; data?:any }) {
  const sanitizedHtml = useMemo(
    () =>
      DOMPurify.sanitize(html, {
        ADD_ATTR: DOMPURIFY_ADD_ATTR,
        ALLOWED_TAGS: DOMPURIFY_ALLOWED_TAGS,
        ALLOWED_ATTR: DOMPURIFY_ALLOWED_ATTR,
        ADD_DATA_URI_TAGS: ["img"],
        ALLOW_DATA_ATTR: true,
      }),
    [html]
  );

  const containerId = useMemo(() => `cms-block-${hashString(sanitizedHtml)}`, [sanitizedHtml]);

  const options = useMemo(
    () => getParserOptions(homeData, params, searchParams, data ),
    [homeData, params, searchParams, data]
  );

  const parsedContent = useMemo(() => parse(sanitizedHtml, options), [sanitizedHtml, options]);

  return (
    <div id={containerId}>
      {parsedContent}
      <CmsEnhancer containerId={containerId} />
    </div>
  );
}