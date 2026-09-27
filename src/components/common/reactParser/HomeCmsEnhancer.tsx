"use client"
import { createCmsEnhancer } from "./core/createCmsEnhancer";
import { homeSyncInits, homeGatedTasks } from "./cms-config/home";

export default createCmsEnhancer(homeSyncInits, homeGatedTasks);