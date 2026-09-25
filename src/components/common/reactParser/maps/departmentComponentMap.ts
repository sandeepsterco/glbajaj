// components/common/reactParser/maps/departmentComponentMap.ts
import { withLazyComponent, ComponentMap } from "../core/createReactParser";

export const departmentComponentMap: ComponentMap = {
  department_home_faculties: () => withLazyComponent(() => import("../../../parser/DepartmentHomeFaculties")),
  department_home_laboratories: ({ params, data }) => withLazyComponent(() => import("../../../parser/department/home/DepartmentHomeLaboratories"), { params, data }),
  department_home_alumni: ({ params, data }) => withLazyComponent(() => import("../../../parser/department/home/DepartmentHomeAlumni"), { params, data }),
  department_home_courses: ({ params }) => withLazyComponent(() => import("../../../parser/DepartmentHomeCourses"), { params }),
  department_home_happenings: ({ params }) => withLazyComponent(() => import("../../../parser/department/home/DepartmentHomeHappenings"), { params }),
  department_home_activities: () => withLazyComponent(() => import("../../../parser/DepartmentHomeActivities")),
  department_home_clubs: ({ params, data }) => withLazyComponent(() => import("../../../parser/department/home/DepartmentHomeClubs"), { params, data }),
  department_home_ceo: () => withLazyComponent(() => import("../../../parser/DepartmentHomeCEO")),
  department_home_collaborations: ({ params, data }) => withLazyComponent(() => import("../../../parser/department/home/DepartmentHomeMou"), { params, data }),
  department_home_achievement: ({ data }) => withLazyComponent(() => import("../../../parser/DepartmentHomeAchievement"), { data }),
  department_faculty_grid: () => withLazyComponent(() => import("../../../parser/DepartmentFacultyGrid")),
  department_home_placements: ({ data }) => withLazyComponent(() => import("../../../parser/department/home/DepartmentHomePlacements"), { data }),
  department_home_research: ({ params, data }) => withLazyComponent(() => import("../../../parser/department/home/DepartmentHomeResearch"), { params, data }),
  department_notifications: () => withLazyComponent(() => import("../../../parser/DepartmentNotificationBar")),
  coe_labs_grid_section: () => withLazyComponent(() => import("../../../parser/DepartmentLabsGrids")),
};