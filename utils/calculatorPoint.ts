import { IAssessItem } from "@/interface/pointDef";

export const calculatorGPA = (arr: IAssessItem[]) => {
  return (
    arr?.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.point,
      0
    ) / 3
  ).toFixed(1);
};
export const calculatorLetterPoint = (point: number): string => {
  if (point >= 9.0 && point <= 10.0) {
    return "A";
  } else if (point >= 8.0 && point <= 8.9) {
    return "B+";
  } else if (point >= 7.0 && point <= 7.9) {
    return "B";
  } else if (point >= 6.5 && point <= 6.9) {
    return "C+";
  } else if (point >= 5.5 && point <= 6.4) {
    return "C";
  } else if (point >= 5.0 && point <= 5.4) {
    return "D+";
  } else if (point >= 4.0 && point <= 4.9) {
    return "D";
  } else {
    return "F";
  }
};
