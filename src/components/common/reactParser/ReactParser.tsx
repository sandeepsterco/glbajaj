
import parse, {
  attributesToProps,
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
// import { scrollToHashWhenReady } from "@/src/lib/scrollToHash";
// import { scheduleRefreshAOSSequence } from "@/src/lib/aos";
// import { markRouteContentReady } from "@/src/lib/mainContentReady";
// import 'bootstrap-icons/font/bootstrap-icons.css';

import '@/src/styles/fancybox.css'
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/parser.css";
import DepartmentHomeResearch from "../../parser/DepartmentHomeResearch";
import HomeCourseRight from "../../parser/HomeCourseRight";
import AlumniAchievementList from "../../parser/AlumniAchievementList";
import InternSlider from "../../parser/InternSlider";

function ParserWidgetFallback() {
  return (
    <div
      className="my-[2rem] h-[20rem] w-full animate-pulse rounded bg-[#ede9e7]"
      aria-hidden="true"
    />
  );
}

import HomePlacements from "../../parser/HomePlacements";
import DepartmentHomePlacements from "../../parser/DepartmentHomePlacements";
import ProgramDetailPlacements from "../../parser/ProgramDetailPlacements";
import CareerJobListing from "../../parser/CareerJobListing";
import HomeUpcomingEvents from "../../parser/HomeUpcomingEvents";
import ProgramDetailForm from "../../parser/ProgramDetailForm";
import CourseSearch from "../../parser/CourseSearch";
import HomeCoursesTabs from "../../parser/HomeCoursesTabs";
import AddOnCourses from "../../parser/AddOnCourses";
import ProgramAddOnCourses from "../../parser/ProgramAddOnCourses";
import HomeHappenings from "../../parser/HomeHappenings";
import HomeAlumni from "../../parser/HomeAlumni";
import ContactForm from "../../parser/ContactForm";
import AboutLeadership from "../../parser/AboutLeadership";
import AwardsList from "../../parser/AwardsList";
import ConferenceLists from "../../parser/ConferenceLists";
import DepartmentHomeFaculties from "../../parser/DepartmentHomeFaculties";
import DepartmentHomeLaboratories from "../../parser/DepartmentHomeLaboratories";
import DepartmentHomeAlumni from "../../parser/DepartmentHomeAlumni";
import ProgramDetailAlumni from "../../parser/ProgramDetailAlumni";
import DepartmentHomeCourses from "../../parser/DepartmentHomeCourses";
import ResearchInnovation from "../../parser/ResearchInnovation";
import HomeFacilities from "../../parser/HomeFacilities";
import PoliciesDisclosures from "../../parser/PoliciesDisclosures";
import PlacementRecord from "../../parser/PlacementRecord";
import IntershipRecord from "../../parser/IntershipRecord";
import AchievementList from "../../parser/AchievementList";
import DepartmentHomeHappenings from "../../parser/DepartmentHomeHappenings";
import DepartmentHomeActivities from "../../parser/DepartmentHomeActivities";
import DigitalPathshalaVideoGrid from "../../parser/DigitalPathshalaVideoGrid";
import WhyClubsGrid from "../../parser/WhyClubsGrid";
import AlumniEventsMeetGrid from "../../parser/AlumniEventsMeetGrid";
import AdmissionPrograms from "../../parser/AdmissionPrograms";
import DepartmentNotificationBar from "../../parser/DepartmentNotificationBar";
import DepartmentHomeClubs from "../../parser/DepartmentHomeClubs";
import DepartmentHomeMou from "../../parser/DepartmentHomeMou";
import DepartmentHomeCEO from "../../parser/DepartmentHomeCEO";
import DepartmentHomeAchievement from "../../parser/DepartmentHomeAchievement";
import DepartmentLabsGrids from "../../parser/DepartmentLabsGrids";
import DepartmentFacultyGrid from "../../parser/DepartmentFacultyGrid";
import HashLinkAnchor from "./HashLinkAnchor";
import CmsEnhancer from "@/src/lib/CmsEnhancer";

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.attribs) {

      // ✅ Hide empty block/inline elements (no visible text or child elements)
      const emptyTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
      if (emptyTags.includes(domNode.name)) {
        const hasText = domNode.children.some(
          (child) => child.type === 'text' && (child as any).data?.trim() !== ''
        );
        const hasElement = domNode.children.some(
          (child) => child.type === 'tag'
        );
        if (!hasText && !hasElement) {
          return <></>;  // ✅ renders nothing
        }
      }

      if (domNode.name === "a") {
        const props = attributesToProps(domNode.attribs) as any;
        const href = props.href?.trim();
        const classList = (domNode.attribs?.class || "").split(" ");
      
        // Hide read_more_icon anchors with no valid href
        if ((classList.includes("dynamic_btn") || classList.includes('strech_link')) && (!href || href === "#")) {
          return <></>;
        }
      
        const { href: _href, ...rest } = props;
      
        // In-page hash links: handle manually. next/link's client-side
        // navigation uses history.pushState, which does NOT fire a native
        // 'hashchange' event, so our ReactParser listener never sees these.
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
          if (!s)
            return "";
          if (
            s.startsWith("http") ||
            s.startsWith("/") ||
            s.startsWith("data:")
          )
            return s;
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

      if(domNode.name == 'iframe'){
        const classList = (domNode.attribs?.class || "").split(/\s+/);
        const src = (domNode.attribs?.src || "").trim();
        if (classList.includes("parser_common") && !src) {
          return <></>;
        }
      }

      if (domNode.name === 'div') {

        const hasMeaningfulContent = (node: any): boolean => {
      
          if (node.type === 'text') {
            return node.data?.trim().length > 0;
          }
      
          // Element / tag
          if (node.type === 'tag') {
      
            if (node.attribs?.id) {
              return true;
            }
      
            if (
              ['img', 'video', 'iframe', 'input', 'textarea', 'select'].includes(node.name)
            ) {
              return true;
            }
      
            if (node.children?.length) {
              return node.children.some(hasMeaningfulContent);
            }
      
            return false;
          }
      
          return false;
        };
      
      
        const hasId = !!domNode.attribs?.id;
      
        const hasContent = (domNode.children || []).some(hasMeaningfulContent);
      
      
        // Remove ONLY truly empty div
        if (!hasId && !hasContent) {
          return <></>;
        }
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

      if (domNode.attribs.id === "course-search") return <CourseSearch />;
      if (domNode.attribs.id === "home_course_tabs") return <HomeCoursesTabs />;
      if (domNode.attribs.id === "add-on-courses") return <AddOnCourses />;
      if (domNode.attribs.id === "program-add-on-courses") return <ProgramAddOnCourses />;
      if (domNode.attribs.id === "research_innovation")
        return <ResearchInnovation />;
      if (domNode.attribs.id === "home_facilities") return <HomeFacilities />;
      if (domNode.attribs.id === "home_happenings") return <HomeHappenings />;
      if (domNode.attribs.id === "home_alumni") return <HomeAlumni />;
      if (domNode.attribs.id === "contact_form") return <ContactForm />;
      if (domNode.attribs.id === "about_leadership")
        return <AboutLeadership />;
      if (domNode.attribs.id === "awards_list") return <AwardsList />;
      if (domNode.attribs.id === "achievement_list")
        return <AchievementList />;
      if (domNode.attribs.id === "conference_lists")
        return <ConferenceLists />;
      if (domNode.attribs.id === "department_home_faculties")
        return <DepartmentHomeFaculties />;
      if (domNode.attribs.id === "department_home_laboratories")
        return <DepartmentHomeLaboratories />;
      if (domNode.attribs.id === "department_home_alumni")
        return <DepartmentHomeAlumni />;
      if (domNode.attribs.id === "program_detail_alumni")
        return <ProgramDetailAlumni />;
      if (domNode.attribs.id === "department_home_courses")
        return <DepartmentHomeCourses />;
      if (domNode.attribs.id === "department_home_happenings")
        return <DepartmentHomeHappenings />;
      if (domNode.attribs.id === "policies_disclosures")
        return <PoliciesDisclosures />;
      if (domNode.attribs.id === "placement_record")
        return <PlacementRecord />;
      if (domNode.attribs.id === "intership_record")
        return <IntershipRecord />;
      if (domNode.attribs.id === "department_home_activities")
        return <DepartmentHomeActivities />;
      if (domNode.attribs.id === "digital_pathshala_videos")
        return <DigitalPathshalaVideoGrid />;
      if (domNode.attribs.id === "why_clubs_grid") return <WhyClubsGrid />;
      if (domNode.attribs.id === "alumni_events_meet")
        return <AlumniEventsMeetGrid />;
      if (domNode.attribs.id === "admission_programs")
        return <AdmissionPrograms />;
      if (domNode.attribs.id === "department_notifications")
        return <DepartmentNotificationBar />;
      if (domNode.attribs.id === "department_home_clubs")
        return <DepartmentHomeClubs />;
      if (domNode.attribs.id === "department_home_ceo")
        return <DepartmentHomeCEO />;
      if (domNode.attribs.id === "department_home_collaborations")
        return <DepartmentHomeMou />;
      if (domNode.attribs.id === "department_home_achievement")
        return <DepartmentHomeAchievement />;
      if (domNode.attribs.id === "coe_labs_grid_section")
        return <DepartmentLabsGrids />;
      if (domNode.attribs.id === "department_faculty_grid")
        return <DepartmentFacultyGrid />;
      if (domNode.attribs.id === "program_detail_form")
        return <ProgramDetailForm />;
      if (domNode.attribs.id === "department_home_placements")
        return <DepartmentHomePlacements />;
      if (domNode.attribs.id === "home_placements")
        return <HomePlacements />;
      if (domNode.attribs.id === "career_job_listing")
        return <CareerJobListing />;
      if (domNode.attribs.id === "home_upcoming_events") return <HomeUpcomingEvents />;
      if (domNode.attribs.id === "program_detail_placements") return <ProgramDetailPlacements />;
      if (domNode.attribs.id === "department_home_research") return <DepartmentHomeResearch />;
      if (domNode.attribs.id === "home_course_right") return <HomeCourseRight />;
      if (domNode.attribs.id === "alumni_achievement_list") return <AlumniAchievementList />;
      if (domNode.attribs.id === "intern_slider") return <InternSlider />;
      
      
    }
  },
};

// ---------------------------------------------------------------------------
// ReactParser
// ---------------------------------------------------------------------------

function hashString(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

export default function ReactParser({ html }: { html: any }) {
  // const pathname = usePathname();
  
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ADD_ATTR: [
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
    ],
    ALLOWED_TAGS: [
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
    ],
    ALLOWED_ATTR: [
      "class", "id", "src", "alt", "href", "target",
      "width", "height", "style", "rel", "type",
      "data-src", "data-tab",
      "data-wow-delay", "data-wow-duration", "data-wow-offset", "data-wow-iteration",
      "data-aos", "data-aos-delay", "data-aos-duration", "data-aos-offset",
      "data-aos-easing", "data-aos-once", "data-aos-mirror",
      "data-aos-anchor", "data-aos-anchor-placement",
    ],
    ADD_DATA_URI_TAGS: ["img"],
    ALLOW_DATA_ATTR: true,
  });
  
  const containerId = `cms-block-${hashString(sanitizedHtml)}`;

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   markRouteContentReady();

  //   const cancelAosRefresh = scheduleRefreshAOSSequence();

  //   const schedule = (window as Window & { __scheduleInitCustomJS?: () => void }).__scheduleInitCustomJS;
  //   const init = (window as Window & { __initCustomJS?: () => void }).__initCustomJS;

  //   if (typeof schedule === "function") {
  //     schedule();
  //   } else if (typeof init === "function") {
  //     init();
  //   }

  //   let cancelHashScroll = () => {};

  //   const runHashScroll = () => {
  //     cancelHashScroll();
  //     cancelHashScroll = scrollToHashWhenReady(undefined, { behavior: "smooth" });
  //   };

  //   // Delay so parsed HTML and nested dynamic widgets can mount first.
  //   const hashScrollTimer = window.setTimeout(runHashScroll, 150);

  //   const onHashChange = () => runHashScroll();
  //   window.addEventListener("hashchange", onHashChange);

  //   return () => {
  //     cancelAosRefresh();
  //     window.clearTimeout(hashScrollTimer);
  //     window.removeEventListener("hashchange", onHashChange);
  //     cancelHashScroll();
  //   };
  // }, [pathname, html]);

  // if (!html) {
  //   if (typeof window !== "undefined") {
  //     markRouteContentReady();
  //   }
  //   return null;
  // }


  return (
    <div id={containerId}>
      {parse(sanitizedHtml, options)}
      <CmsEnhancer containerId={containerId} />
    </div>
  );
}