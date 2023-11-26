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
  const updatedAt = "2023-11-26T11:10:59Z";
  const date = new Date(updatedAt);
  const formattedDate = date.toLocaleString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return formattedDate;
};
