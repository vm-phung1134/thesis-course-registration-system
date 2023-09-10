import { IAuthObject } from "@/interface/auth";
import { IExerciseObject } from "@/interface/exercise";
import { IPostObject } from "@/interface/post";

export const INITIATE_AUTH: IAuthObject = {
  name: "",
  photoSrc: "",
  email: "",
  phone: "",
  class: "",
  major: "",
  role: "",
};

export const INITIATE_POST: IPostObject = {
  title: "",
  category: {
    label: "",
    description: "",
    value: "",
  },
  lecturer: {
    name: "",
    photoSrc: "",
    email: "",
    phone: "",
    class: "",
    major: "",
    role: "",
  },
  description: "",
};

export const INITIATE_EXERCISE: IExerciseObject = {
  title: "",
  category: {
    label: "",
    description: "",
    value: "",
  },
  lecturer: {
    name: "",
    photoSrc: "",
    email: "",
    phone: "",
    class: "",
    major: "",
    role: "",
  },
  description: "",
  deadline: new Date(""),
  score: 0,
};
