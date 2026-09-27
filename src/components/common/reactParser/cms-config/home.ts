import { SyncInit, GatedTask } from "../core/createCmsEnhancer";
import { sharedSyncInits, sharedGatedTasks } from "./shared";
import { InitWhyGlbSection } from "@/src/lib/cms/initWhyGlbSection";

export const homeSyncInits: SyncInit[] = [...sharedSyncInits, InitWhyGlbSection];

export const homeGatedTasks: GatedTask[] = [
  // ...sharedGatedTasks,
  [".award_ranking", (root) => import('@/src/lib/cms/initAwardRanking').then((m)=>m.InitAwardRanking(root))],
  // [".studentsSwiper", (root) => import("@/src/lib/cms/initStudentsSwiper").then((m) => m.InitStudentsSwiper(root))],
  // [".companySwiper", (root) => import("@/src/lib/cms/initCompanySwiper").then((m) => m.InitCompanySwiper(root))],
  // [".home_research_incubation", (root) => import("@/src/lib/cms/initHomeResearchIncubation").then((m) => m.InitHomeResearchIncubation(root))],
  // [".home_about_video", (root) => import("@/src/lib/cms/initHomeAboutVideo").then((m) => m.InitHomeAboutVideo(root))],
  // [".home_recruiters_slider", (root) => import("@/src/lib/cms/initHomeRecruitersSlider").then((m) => m.InitHomeRecruitersSlider(root))],
  // [".home_placement_company_slider", (root) => import("@/src/lib/cms/initHomePlacementCompanySlider").then((m) => m.InitHomePlacementCompanySlider(root))],
  // [".courses_slider_wrapper", (root) => import("@/src/lib/cms/initCoursesSlider").then((m) => m.InitCoursesSlider(root))],
];