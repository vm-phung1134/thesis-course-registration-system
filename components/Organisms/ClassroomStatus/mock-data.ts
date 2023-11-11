import { ImenuClassroomItem } from "@/components/Atoms";
import { IOptionItem } from "@/interface/filter";

export const DATA_MENU_CLASSROOM_STUDENT: ImenuClassroomItem[] = [
  {
    id: "1",
    href: "/manage-classroom",
    title: "newfeeds",
  },
  {
    id: "2",
    href: "/manage-classroom/report-progress",
    title: "report grogress",
  },
  {
    id: "3",
    href: "/manage-classroom/members",
    title: "members",
  },
  {
    id: "4",
    href: "/manage-classroom/point",
    title: "point",
  },
];

export const DATA_MENU_CLASSROOM_LECTURER: ImenuClassroomItem[] = [
  {
    id: "1",
    href: "/manage-classroom",
    title: "newfeeds",
  },
  {
    id: "2",
    href: "/manage-classroom/report-progress",
    title: "report grogress",
  },
  {
    id: "3",
    href: "/manage-classroom/members",
    title: "members",
  },
  {
    id: "4",
    href: "/manage-classroom/enrol-defense",
    title: "Enrol defense",
  },
  {
    id: "5",
    href: "/manage-classroom/point/evaluation",
    title: "point",
  },
];

export const DATA_LIST_OPTIONS: IOptionItem[] = [
  {
    label: "Create Exercise",
    value: "create_exercise",
  },
  {
    label: "Create post",
    value: "create_post",
  },
];
