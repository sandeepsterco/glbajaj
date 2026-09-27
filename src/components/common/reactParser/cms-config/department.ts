// components/common/reactParser/cms-config/department.ts
import { SyncInit, GatedTask } from "../core/createCmsEnhancer";
import { sharedSyncInits, sharedGatedTasks } from "./shared";
import { InitBlanketList } from "@/src/lib/cms/initBlanketList";
import { InitProgramBoxAccordion } from "@/src/lib/cms/initProgramBoxAccordion";
import { InitXTabs } from "@/src/lib/cms/initXTabs";

export const departmentSyncInits: SyncInit[] = [
  ...sharedSyncInits,
  InitBlanketList, // must run before department_home_projects1
  InitProgramBoxAccordion,
  (root) => InitXTabs(root, () => InitProgramBoxAccordion(root)),
];

export const departmentGatedTasks: GatedTask[] = [
  ...sharedGatedTasks,
  [".department_home_projects", (root) => import("@/src/lib/cms/initDepartmentHomeProjects").then((m) => m.InitDepartmentHomeProjects(root))],
  [".department_home_projects1", (root) => import("@/src/lib/cms/initDepartmentHomeProjects1").then((m) => m.InitDepartmentHomeProjects1(root))],
  [".hod_profile_slider", (root) => import("@/src/lib/cms/initHodProfileSlider").then((m) => m.InitHodProfileSlider(root))],
  [".workshop_slider_wrapper", (root) => import("@/src/lib/cms/initWorkshopSlider").then((m) => m.InitWorkshopSlider(root))],
  [".cse_lab_slider", (root) => import("@/src/lib/cms/initCseLabSlider").then((m) => m.InitCseLabSlider(root))],
];