import { SyncInit, GatedTask } from "../core/createCmsEnhancer";
import { sharedSyncInits, sharedGatedTasks } from "./shared";

export const homeSyncInits: SyncInit[] = [...sharedSyncInits];

export const homeGatedTasks: GatedTask[] = [
  ...sharedGatedTasks,
  [".award_ranking", (root) => import('@/src/lib/cms/initAwardRanking').then((m)=>m.InitAwardRanking(root))],
  [".home_recruiters_slider", (root) => import("@/src/lib/cms/initHomeRecruitersSlider").then((m) => m.InitHomeRecruitersSlider(root))],
  [".home_placement_company_slider", (root) => import("@/src/lib/cms/initHomePlacementCompanySlider").then((m) => m.InitHomePlacementCompanySlider(root))],
  [".home_research_incubation", (root) => import("@/src/lib/cms/initHomeResearchIncubation").then((m) => m.InitHomeResearchIncubation(root))],
  [".why_glb_section", (root) => import("@/src/lib/cms/initWhyGlbSection").then((m) => m.InitWhyGlbSection(root))],
  [".home_about_video", (root) => import("@/src/lib/cms/initHomeAboutVideo").then((m) => m.InitHomeAboutVideo(root))],
  ['.home_about_glb_section .thumbnail', (root) => import('@/src/lib/cms/initYTModal').then((m) => m.InitYTModal(root))],
  ['.container25', (root) => import('@/src/lib/cms/adjustMaxContent').then((m) => m.InitMaxContent(root))],

  // [".studentsSwiper", (root) => import("@/src/lib/cms/initStudentsSwiper").then((m) => m.InitStudentsSwiper(root))],
  // [".companySwiper", (root) => import("@/src/lib/cms/initCompanySwiper").then((m) => m.InitCompanySwiper(root))],
  // [".courses_slider_wrapper", (root) => import("@/src/lib/cms/initCoursesSlider").then((m) => m.InitCoursesSlider(root))],
];