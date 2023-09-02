import { IOptionItem, ImenuClassroomItem } from "@/components/Atoms";

export const DATA_MENU_CLASSROOM: ImenuClassroomItem[] = [
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
    href: "/manage-classroom/",
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
