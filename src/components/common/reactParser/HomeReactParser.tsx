// import "@/src/styles/home.css";
import { createReactParser } from "./core/createReactParser";
import { homeComponentMap } from "./maps/homeComponentMap";
import HomeCmsEnhancer from "./HomeCmsEnhancer";

export default createReactParser(homeComponentMap, HomeCmsEnhancer);