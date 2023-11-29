import { IDateTime } from "@/interface/exercise";

export const convertDateTime = (dateTime: IDateTime) => {
  if (!dateTime || typeof dateTime.year === "undefined") {
    return "";
  }

  const { year, month, day, hours, minutes, seconds } = dateTime;
  const currentDate = new Date(year, month - 1, day, hours, minutes, seconds);
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formattedDate;
};

export const convertDateTimeFromString = (dateTime: string) => {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

export const convertDateTimeSecond = (date: string) => {
  const currentDate = new Date(date);
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};
