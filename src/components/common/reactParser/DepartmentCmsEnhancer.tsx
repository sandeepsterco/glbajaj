// components/common/reactParser/DepartmentCmsEnhancer.tsx
import { createCmsEnhancer } from "./core/createCmsEnhancer";
import { departmentSyncInits, departmentGatedTasks } from "./cms-config/department";

export default createCmsEnhancer(departmentSyncInits, departmentGatedTasks);