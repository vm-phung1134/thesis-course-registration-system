import unidecode from "unidecode";

export const convertToUnaccentedString = (str: string) => {
  const unaccentedStr = unidecode(str || "");
  return unaccentedStr;
};
