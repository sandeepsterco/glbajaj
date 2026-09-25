import { withLazyComponent, ComponentMap } from "../core/createReactParser";

export const homeComponentMap: ComponentMap = {
  "course-search": () => withLazyComponent(() => import("../../../parser/CourseSearch")),
  home_course_tabs: () => withLazyComponent(() => import("../../../parser/HomeCoursesTabs")),
  "add-on-courses": ({ homeData }) => withLazyComponent(() => import("../../../parser/AddOnCourses"), { homeData }),
  research_innovation: ({ homeData }) => withLazyComponent(() => import("../../../parser/ResearchInnovation"), { homeData }),
  home_facilities: () => withLazyComponent(() => import("../../../parser/homeFacilities/HomeFacilities")),
  home_happenings: ({ homeData }) => withLazyComponent(() => import("../../../parser/HomeHappenings"), { homeData }),
  home_alumni: ({ homeData }) => withLazyComponent(() => import("../../../parser/HomeAlumni"), { homeData }),
  home_placements: ({ homeData }) => withLazyComponent(() => import("../../../parser/HomePlacements"), { homeData }),
  home_upcoming_events: () => withLazyComponent(() => import("../../../parser/homeUpcomingEvents/HomeUpcomingEvents")),
  home_highlights: () => withLazyComponent(() => import("../../../parser/homeHighlights/HomeHighlights")),
  home_course_right: () => withLazyComponent(() => import("../../../parser/HomeCourseRight")),
  contact_form: () => withLazyComponent(() => import("../../../parser/ContactForm")),
  intern_slider: () => withLazyComponent(() => import("../../../parser/internSlider/InternSlider")),
};