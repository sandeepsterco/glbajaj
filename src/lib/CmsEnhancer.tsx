"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { InitMaxContent } from "./cms/adjustMaxContent";
import { InitWhyGlbSection } from "./cms/initWhyGlbSection";
import { InitAccordion } from "./cms/initAccordion";
import { InitBlanketList } from "./cms/initBlanketList";
import { InitTabContent } from "./cms/initTabContent";
import { InitTabControl } from "./cms/initTabControl";
import { InitToggleReadMore } from "./cms/initToggleReadMore";
import { InitYTModal } from "./cms/initYTModal";
import { InitStercoTabs } from "./cms/initStercoTabs";
import { InitProgramBoxAccordion } from "./cms/initProgramBoxAccordion";
import { InitXTabs } from "./cms/initXTabs";
import { InitPolicyAccordion } from "./cms/initPolicyAccordion";
import { InitDropMenus } from "./cms/initDropMenus";
import { InitViewMore } from "./cms/initViewMore";

import { InitAwardRanking } from "./cms/initAwardRanking";
import { InitStudentsSwiper } from "./cms/initStudentsSwiper";
import { InitCompanySwiper } from "./cms/initCompanySwiper";
import { InitHomeResearchIncubation } from "./cms/initHomeResearchIncubation";
import { InitHomeAboutVideo } from "./cms/initHomeAboutVideo";
import { InitHomeRecruitersSlider } from "./cms/initHomeRecruitersSlider";
import { InitHomePlacementCompanySlider } from "./cms/initHomePlacementCompanySlider";
import { InitCoursesSlider } from "./cms/initCoursesSlider";
import { InitLeadershipSlider } from "./cms/initLeadershipSlider";
import { InitAcredationSwiper } from "./cms/initAcredationSwiper";
import { InitDepartmentHomeProjects } from "./cms/initDepartmentHomeProjects";
import { InitDepartmentHomeProjects1 } from "./cms/initDepartmentHomeProjects1";
import { InitMultiColumnSlider } from "./cms/initMultiColumnSlider";
import { InitHodProfileSlider } from "./cms/initHodProfileSlider";
import { InitWorkshopSlider } from "./cms/initWorkshopSlider";
import { InitSportFacilities } from "./cms/initSportFacilities";
import { InitNccRankCeremony } from "./cms/initNccRankCeremony";
import { InitAktuSwiper } from "./cms/initAktuSwiper";
import { InitCseLabSlider } from "./cms/initCseLabSlider";
import { InitAlumniAchievementSlider } from "./cms/initAlumniAchievementSlider";
import { InitDefaultImageSlider } from "./cms/initDefaultImageSlider";
import { InitGridPopup } from "./cms/initGridPopup";
import { InitGalleryDetailsPopup } from "./cms/initGalleryDetailsPopup";

function waitForLayout() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export default function CmsEnhancer({ containerId }: { containerId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const cleanupFns: (() => void)[] = [];

    async function init() {
      await waitForLayout();
      if (cancelled) return;

      const root = document.getElementById(containerId);
      if (!root) return;

      // ── Synchronous, no-dependency modules ────────────────────────────
      cleanupFns.push(InitMaxContent(root));
      cleanupFns.push(InitWhyGlbSection(root));
      cleanupFns.push(InitAccordion(root));
      cleanupFns.push(InitBlanketList(root)); // must run before department_home_projects1
      cleanupFns.push(InitTabContent(root));
      cleanupFns.push(InitTabControl(root));
      cleanupFns.push(InitToggleReadMore(root));
      cleanupFns.push(InitYTModal(root));
      cleanupFns.push(InitStercoTabs(root));
      cleanupFns.push(InitProgramBoxAccordion(root));
      cleanupFns.push(InitXTabs(root, () => InitProgramBoxAccordion(root)));
      cleanupFns.push(InitPolicyAccordion(root));
      cleanupFns.push(InitDropMenus(root));
      cleanupFns.push(InitViewMore(root));

      if (cancelled) return;

      // ── Swiper / Fancybox modules — gated on selector presence ────────
      const tasks: [string, () => Promise<() => void>][] = [
        [".award_ranking", () => InitAwardRanking(root)],
        [".studentsSwiper", () => InitStudentsSwiper(root)],
        [".companySwiper", () => InitCompanySwiper(root)],
        [".home_research_incubation", () => InitHomeResearchIncubation(root)],
        [".home_about_video", () => InitHomeAboutVideo(root)],
        [".home_recruiters_slider", () => InitHomeRecruitersSlider(root)],
        [".home_placement_company_slider", () => InitHomePlacementCompanySlider(root)],
        [".courses_slider_wrapper", () => InitCoursesSlider(root)],
        [".leadership_slider", () => InitLeadershipSlider(root)],
        [".acredation_swiper", () => InitAcredationSwiper(root)],
        [".department_home_projects", () => InitDepartmentHomeProjects(root)],
        [".department_home_projects1", () => InitDepartmentHomeProjects1(root)],
        [".multi_column_slider", () => InitMultiColumnSlider(root)],
        [".hod_profile_slider", () => InitHodProfileSlider(root)],
        [".workshop_slider_wrapper", () => InitWorkshopSlider(root)],
        [".sport_facilities", () => InitSportFacilities(root)],
        [".ncc_rank_ceremony", () => InitNccRankCeremony(root)],
        [".AKTU_Swiper", () => InitAktuSwiper(root)],
        [".cse_lab_slider", () => InitCseLabSlider(root)],
        [".alumni_achievement_slider", () => InitAlumniAchievementSlider(root)],
        [".default_image_slider, .default_image_slider2", () => InitDefaultImageSlider(root)],
        [".media_grid_Bx", () => InitGridPopup(root)],
        [".gallery_details1", () => InitGalleryDetailsPopup(root)],
      ];

      for (const [selector, run] of tasks) {
        if (cancelled) return;
        if (!root.querySelector(selector)) continue;
        try {
            const cleanup = await run();
            if (cancelled) {
                cleanup();
                return;
            }
            cleanupFns.push(cleanup);
        } catch (err) {
            console.error(`CmsEnhancer: failed to init "${selector}"`, err);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, [containerId, pathname]);

  return null;
}