// components/common/reactParser/cms-config/shared.ts
import { SyncInit, GatedTask } from "../core/createCmsEnhancer";
import { InitMaxContent } from "@/src/lib/cms/adjustMaxContent";
import { InitAccordion } from "@/src/lib/cms/initAccordion";
import { InitTabContent } from "@/src/lib/cms/initTabContent";
import { InitTabControl } from "@/src/lib/cms/initTabControl";
import { InitToggleReadMore } from "@/src/lib/cms/initToggleReadMore";
import { InitYTModal } from "@/src/lib/cms/initYTModal";
import { InitDropMenus } from "@/src/lib/cms/initDropMenus";
import { InitViewMore } from "@/src/lib/cms/initViewMore";

export const sharedSyncInits: SyncInit[] = [
  // InitMaxContent,
  // InitAccordion,
  // InitTabContent,
  // InitTabControl,
  // InitToggleReadMore,
  // InitYTModal,
  // InitDropMenus,
  // InitViewMore,
];

export const sharedGatedTasks: GatedTask[] = [
  ['.xtabs_sec', (root) => import('@/src/lib/cms/initXTabs').then((m) => m.InitXTabs(root))],
  [".default_image_slider, .default_image_slider2", (root) => import("@/src/lib/cms/initDefaultImageSlider").then((m) => m.InitDefaultImageSlider(root))],
  // [".multi_column_slider", (root) => import("@/src/lib/cms/initMultiColumnSlider").then((m) => m.InitMultiColumnSlider(root))],
  // [".acredation_swiper", (root) => import("@/src/lib/cms/initAcredationSwiper").then((m) => m.InitAcredationSwiper(root))],
  // [".media_grid_Bx", (root) => import("@/src/lib/cms/initGridPopup").then((m) => m.InitGridPopup(root))],
];