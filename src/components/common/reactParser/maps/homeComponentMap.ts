import { withLazyComponent, ComponentMap } from "../core/createReactParser";

export const homeComponentMap: ComponentMap = {
  home_placements: ({ homeData }) => withLazyComponent(() => import("../../../parser/homeparser/homePlacement/HomePlacements"), { homeData }),
  "add-on-courses": ({ homeData }) => withLazyComponent(() => import("../../../parser/homeparser/homeCourses/AddOnCourses"), { homeData }),
  research_innovation: ({ homeData }) => withLazyComponent(() => import("../../../parser/ResearchInnovation"), { homeData }),
  home_facilities: () => withLazyComponent(() => import("../../../parser/homeFacilities/HomeFacilities")),
  intern_slider: () => withLazyComponent(() => import("../../../parser/homeparser/internSlider/InternSlider")),
  home_alumni: ({ homeData }) => withLazyComponent(() => import("../../../parser/HomeAlumni"), { homeData }),
  // "course-search": () => withLazyComponent(() => import("../../../parser/CourseSearch")),
  // home_course_tabs: () => withLazyComponent(() => import("../../../parser/HomeCoursesTabs")),
  // home_happenings: ({ homeData }) => withLazyComponent(() => import("../../../parser/HomeHappenings"), { homeData }),
  // home_upcoming_events: () => withLazyComponent(() => import("../../../parser/homeUpcomingEvents/HomeUpcomingEvents")),
  // home_highlights: () => withLazyComponent(() => import("../../../parser/homeHighlights/HomeHighlights")),
  // home_course_right: () => withLazyComponent(() => import("../../../parser/HomeCourseRight")),
  // contact_form: () => withLazyComponent(() => import("../../../parser/ContactForm")),
};