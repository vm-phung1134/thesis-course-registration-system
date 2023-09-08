import { IBreadcrumbItem } from "@/components/Atoms";
import { IOptionItem } from "@/interface/filter";

export const BREADCRUMB_CRITICAL_TASKS: IBreadcrumbItem[] = [
  {
    id: "1",
    href: "/",
    title: "TCR System",
  },
  {
    id: "2",
    href: "/",
    title: "Assigned tasks",
  },
  {
    id: "3",
    href: "/tasks-/critical-tasks",
    title: "Critical tasks",
  },
];

export const DATA_FILTER_TASKS: IOptionItem[] = [
  {
    value: "a-z",
    label: "Name A - Z",
  },
  {
    value: "z-a",
    label: "Name Z - A",
  },
  {
    value: "recent day",
    label: "Recent day",
  },
];
