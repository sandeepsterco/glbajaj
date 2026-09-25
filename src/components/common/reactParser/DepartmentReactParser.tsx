// import "@/src/styles/department.css";
import { createReactParser } from "./core/createReactParser";
import { departmentComponentMap } from "./maps/departmentComponentMap";
import DepartmentCmsEnhancer from "./DepartmentCmsEnhancer";

export default createReactParser(departmentComponentMap, DepartmentCmsEnhancer);