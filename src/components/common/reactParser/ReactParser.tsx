import { useMemo } from "react";
import parse, {
  attributesToProps,
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import dynamic from "next/dynamic";

import HashLinkAnchor from "./HashLinkAnchor";
import CmsEnhancer from "@/src/lib/CmsEnhancer";

const DepartmentHomeResearch = dynamic(() => import("../../parser/department/home/DepartmentHomeResearch"));
const HomeCourseRight = dynamic(() => import("../../parser/HomeCourseRight"));
const AlumniAchievementList = dynamic(() => import("../../parser/AlumniAchievementList"));
const InternSlider = dynamic(() => import("../../parser/internSlider/InternSlider"));
const HomePlacements = dynamic(() => import("../../parser/HomePlacements"));
const DepartmentHomePlacements = dynamic(() => import("../../parser/department/home/DepartmentHomePlacements"));
const ProgramDetailPlacements = dynamic(() => import("../../parser/ProgramDetailPlacements"));
const CareerJobListing = dynamic(() => import("../../parser/CareerJobListing"));
const HomeUpcomingEvents = dynamic(() => import("../../parser/homeUpcomingEvents/HomeUpcomingEvents"));
const ProgramDetailForm = dynamic(() => import("../../parser/programDetailForm/ProgramDetailForm"));
const CourseSearch = dynamic(() => import("../../parser/CourseSearch"));
const HomeCoursesTabs = dynamic(() => import("../../parser/HomeCoursesTabs"));
const AddOnCourses = dynamic(() => import("../../parser/AddOnCourses"));
const ProgramAddOnCourses = dynamic(() => import("../../parser/ProgramAddOnCourses"));
const HomeHappenings = dynamic(() => import("../../parser/HomeHappenings"));
const HomeAlumni = dynamic(() => import("../../parser/HomeAlumni"));
const ContactForm = dynamic(() => import("../../parser/ContactForm"));
const AboutLeadership = dynamic(() => import("../../parser/about/AboutLeadership"));
const AwardsList = dynamic(() => import("../../parser/awardList/AwardsList"));
const ConferenceLists = dynamic(() => import("../../parser/conferenceLists/ConferenceLists"));
const DepartmentHomeFaculties = dynamic(() => import("../../parser/DepartmentHomeFaculties"));
const DepartmentHomeLaboratories = dynamic(() => import("../../parser/department/home/DepartmentHomeLaboratories"));
const DepartmentHomeAlumni = dynamic(() => import("../../parser/department/home/DepartmentHomeAlumni"));
const ProgramDetailAlumni = dynamic(() => import("../../parser/ProgramDetailAlumni"));
const DepartmentHomeCourses = dynamic(() => import("../../parser/DepartmentHomeCourses"));
const ResearchInnovation = dynamic(() => import("../../parser/ResearchInnovation"));
const HomeFacilities = dynamic(() => import("../../parser/homeFacilities/HomeFacilities"));
const PoliciesDisclosures = dynamic(() => import("../../parser/PoliciesDisclosures"));
const PlacementRecord = dynamic(() => import("../../parser/PlacementRecord"));
const IntershipRecord = dynamic(() => import("../../parser/IntershipRecord"));
const AchievementList = dynamic(() => import("../../parser/achievementList/AchievementList"));
const DepartmentHomeHappenings = dynamic(() => import("../../parser/department/home/DepartmentHomeHappenings"));
const DepartmentHomeActivities = dynamic(() => import("../../parser/DepartmentHomeActivities"));
const DigitalPathshalaVideoGrid = dynamic(() => import("../../parser/DigitalPathshalaVideoGrid"));
const WhyClubsGrid = dynamic(() => import("../../parser/WhyClubsGrid"));
const AlumniEventsMeetGrid = dynamic(() => import("../../parser/AlumniEventsMeetGrid"));
const AdmissionPrograms = dynamic(() => import("../../parser/AdmissionPrograms"));
const DepartmentNotificationBar = dynamic(() => import("../../parser/DepartmentNotificationBar"));
const DepartmentHomeClubs = dynamic(() => import("../../parser/department/home/DepartmentHomeClubs"));
const DepartmentHomeMou = dynamic(() => import("../../parser/department/home/DepartmentHomeMou"));
const DepartmentHomeCEO = dynamic(() => import("../../parser/DepartmentHomeCEO"));
const DepartmentHomeAchievement = dynamic(() => import("../../parser/DepartmentHomeAchievement"));
const DepartmentLabsGrids = dynamic(() => import("../../parser/DepartmentLabsGrids"));
const DepartmentFacultyGrid = dynamic(() => import("../../parser/DepartmentFacultyGrid"));

import "@/src/styles/fancybox.css";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/parser.css";
import HomeHighlights from "../../parser/homeHighlights/HomeHighlights";


const EMPTY_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p"]);
const MEDIA_TAGS = new Set(["img", "video", "iframe", "input", "textarea", "select"]);

const DOMPURIFY_ADD_ATTR = [
  "target",
  "data-aos",
  "data-aos-delay",
  "data-aos-duration",
  "data-aos-offset",
  "data-aos-easing",
  "data-aos-once",
  "data-aos-mirror",
  "data-aos-anchor",
  "data-aos-anchor-placement",
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
    "course-search": () => <CourseSearch />,
    home_course_tabs: () => <HomeCoursesTabs />,
    "add-on-courses": () => <AddOnCourses homeData={homeData} />,
    "program-add-on-courses": () => <ProgramAddOnCourses />,
    research_innovation: () => <ResearchInnovation homeData={homeData} />,
    home_facilities: () => <HomeFacilities />,
    home_happenings: () => <HomeHappenings homeData={homeData} />,
    home_alumni: () => <HomeAlumni homeData={homeData} />,
    contact_form: () => <ContactForm />,
    about_leadership: () => <AboutLeadership />,
    awards_list: () => <AwardsList params={params} searchParams={searchParams} />,
    achievement_list: () => <AchievementList searchParams={searchParams} />,
    conference_lists: () => <ConferenceLists params={params} searchParams={searchParams} />,
    department_home_faculties: () => <DepartmentHomeFaculties />,
    department_home_laboratories: () => <DepartmentHomeLaboratories params={params} data={data} />,
    department_home_alumni: () => <DepartmentHomeAlumni params={params} data={data} />,
    program_detail_alumni: () => <ProgramDetailAlumni />,
    department_home_courses: () => <DepartmentHomeCourses params={params} />,
    department_home_happenings: () => <DepartmentHomeHappenings params={params} />,
    policies_disclosures: () => <PoliciesDisclosures />,
    placement_record: () => <PlacementRecord />,
    intership_record: () => <IntershipRecord params={params} />,
    department_home_activities: () => <DepartmentHomeActivities />,
    digital_pathshala_videos: () => <DigitalPathshalaVideoGrid />,
    why_clubs_grid: () => <WhyClubsGrid params={params} searchParams={searchParams} />,
    alumni_events_meet: () => <AlumniEventsMeetGrid />,
    admission_programs: () => <AdmissionPrograms />,
    department_notifications: () => <DepartmentNotificationBar />,
    department_home_clubs: () => <DepartmentHomeClubs params={params} data={data} />,
    department_home_ceo: () => <DepartmentHomeCEO />,
    department_home_collaborations: () => <DepartmentHomeMou params={params} data={data} />,
    department_home_achievement: () => <DepartmentHomeAchievement data={data} />,
    coe_labs_grid_section: () => <DepartmentLabsGrids />,
    department_faculty_grid: () => <DepartmentFacultyGrid />,
    program_detail_form: () => <ProgramDetailForm />,
    department_home_placements: () => <DepartmentHomePlacements data={data} />,
    home_placements: () => <HomePlacements homeData={homeData} />,
    career_job_listing: () => <CareerJobListing />,
    home_upcoming_events: () => <HomeUpcomingEvents />,
    home_highlights: () => <HomeHighlights />,
    program_detail_placements: () => <ProgramDetailPlacements />,
    department_home_research: () => <DepartmentHomeResearch params={params} data={data} />,
    home_course_right: () => <HomeCourseRight />,
    alumni_achievement_list: () => <AlumniAchievementList />,
    intern_slider: () => <InternSlider />,
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
          <Link href={href || "#"} {...rest}>
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