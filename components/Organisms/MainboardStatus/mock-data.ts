import { IBreadcrumbItem } from "@/components/Atoms";
import { IOptionItem } from "@/interface/filter";

export const BREADCRUMB_MAINBOARD: IBreadcrumbItem[] = [
  {
    id: "1",
    href: "/",
    title: "TCR System",
  },
  {
    id: "2",
    href: "/mainboard",
    title: "Mainboard",
  },
];

export const DATA_FILTER_COURSE: IOptionItem[] = [
  {
    value: "name-a-z",
    label: "Sort Name A - Z",
  },
  {
    value: "name-z-a",
    label: "Sort Name Z - A",
  },
  {
    value: "available",
    label: "Available",
  },
];

export const DATA_FILTER_TOPICS: IOptionItem[] = [
  {
    value: "web",
    label: "Website Application",
  },
  {
    value: "mobile",
    label: "Mobile Application",
  },
  {
    value: "machine-learning",
    label: "Machine Learning",
  },
  {
    value: "block-chain",
    label: "Block chain",
  },
];
