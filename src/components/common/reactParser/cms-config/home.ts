// components/common/reactParser/cms-config/home.ts
import { SyncInit, GatedTask } from "../core/createCmsEnhancer";
import { sharedSyncInits, sharedGatedTasks } from "./shared";
import { InitWhyGlbSection } from "../cms/initWhyGlbSection";

export const homeSyncInits: SyncInit[] = [...sharedSyncInits, InitWhyGlbSection];

export const homeGatedTasks: GatedTask[] = [
  ...sharedGatedTasks,
  [".studentsSwiper", (root) => import("../cms/initStudentsSwiper").then((m) => m.InitStudentsSwiper(root))],
  [".companySwiper", (root) => import("../cms/initCompanySwiper").then((m) => m.InitCompanySwiper(root))],
  [".home_research_incubation", (root) => import("../cms/initHomeResearchIncubation").then((m) => m.InitHomeResearchIncubation(root))],
  [".home_about_video", (root) => import("../cms/initHomeAboutVideo").then((m) => m.InitHomeAboutVideo(root))],
  [".home_recruiters_slider", (root) => import("../cms/initHomeRecruitersSlider").then((m) => m.InitHomeRecruitersSlider(root))],
  [".home_placement_company_slider", (root) => import("../cms/initHomePlacementCompanySlider").then((m) => m.InitHomePlacementCompanySlider(root))],
  [".courses_slider_wrapper", (root) => import("../cms/initCoursesSlider").then((m) => m.InitCoursesSlider(root))],
];