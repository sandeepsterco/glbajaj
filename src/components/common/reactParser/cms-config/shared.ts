// components/common/reactParser/cms-config/shared.ts
import { SyncInit, GatedTask } from "../core/createCmsEnhancer";
import { InitMaxContent } from "../cms/adjustMaxContent";
import { InitAccordion } from "../cms/initAccordion";
import { InitTabContent } from "../cms/initTabContent";
import { InitTabControl } from "../cms/initTabControl";
import { InitToggleReadMore } from "../cms/initToggleReadMore";
import { InitYTModal } from "../cms/initYTModal";
import { InitDropMenus } from "../cms/initDropMenus";
import { InitViewMore } from "../cms/initViewMore";

export const sharedSyncInits: SyncInit[] = [
  InitMaxContent,
  InitAccordion,
  InitTabContent,
  InitTabControl,
  InitToggleReadMore,
  InitYTModal,
  InitDropMenus,
  InitViewMore,
];

export const sharedGatedTasks: GatedTask[] = [
  [".default_image_slider, .default_image_slider2", (root) => import("../cms/initDefaultImageSlider").then((m) => m.InitDefaultImageSlider(root))],
  [".multi_column_slider", (root) => import("../cms/initMultiColumnSlider").then((m) => m.InitMultiColumnSlider(root))],
  [".acredation_swiper", (root) => import("../cms/initAcredationSwiper").then((m) => m.InitAcredationSwiper(root))],
  [".media_grid_Bx", (root) => import("../cms/initGridPopup").then((m) => m.InitGridPopup(root))],
];