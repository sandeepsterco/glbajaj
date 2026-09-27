import { createReactParser } from "./core/createReactParser";
import { homeComponentMap } from "./maps/homeComponentMap";
import HomeCmsEnhancer from "./HomeCmsEnhancer";
import "@/src/styles/private/home.css";

export default createReactParser(homeComponentMap, HomeCmsEnhancer);