import { IAuthObject } from "@/interface/auth";
import { ICategoryObject } from "@/interface/category";
import { IClassroomObject } from "@/interface/classroom";
import { ICommentObject } from "@/interface/comment";
import { IExerciseObject } from "@/interface/exercise";
import { IOptionItem } from "@/interface/filter";
import { IMemberObject } from "@/interface/member";
import { IPostObject } from "@/interface/post";
import { ISubmitObject } from "@/interface/submit";
import { ITopicObject } from "@/interface/topic";

export const INITIATE_AUTH: IAuthObject = {
  name: "",
  photoSrc: "",
  email: "",
  phone: "",
  class: "",
  major: "",
  role: "",
  id: "",
};

export const INITIATE_CATEGORY: ICategoryObject = {
  id: "",
  label: "",
  description: "",
  value: "",
};

export const INITIATE_CLASSROOM: IClassroomObject = {
  id: "",
  classCourse: "",
  lecturer: INITIATE_AUTH,
  quantityStudent: 15,
  status: "UN_LOCK"
};

export const INITIATE_POST: IPostObject = {
  uid: "",
  type: "",
  title: "",
  category: {
    label: "",
    description: "",
    value: "",
  },
  lecturer: INITIATE_AUTH,
  description: "",
  classroom: INITIATE_CLASSROOM,
};

export const INITIATE_EXERCISE: IExerciseObject = {
  title: "",
  uid: "",
  classroom: INITIATE_CLASSROOM,
  category: {
    label: "",
    description: "",
    value: "",
  },
  lecturer: INITIATE_AUTH,
  description: "",
  deadline: "",
  type: "",
};

export const INITIATE_TOPIC: ITopicObject = {
  id: "",
  title: "",
  typeTopic: "",
  memberQuantiy: 0,
  student: INITIATE_AUTH,
  memberEmail: "",
  description: "",
};

export const INITIATE_MEMBER: IMemberObject = {
  classroom: INITIATE_CLASSROOM,
  member: INITIATE_AUTH,
};

export const INITIATE_COMMENT: ICommentObject = {
  user: INITIATE_AUTH,
  content: "",
  postId: "",
};

export const INITIATE_SUBMIT: ISubmitObject = {
  exerciseId: "",
  student: INITIATE_AUTH,
  attachments: [],
  status: "",
  uid: "",
};

export enum STATE_AUTH_CLASSROOM {
  NO_SUB = "NO_SUBSCRIBE",
  WAITING = "WAITING",
  UN_SUB = "UN_SUBSCRIBE",
}

export enum STATE_LECTURER_CLASSROOM {
  UN_LOCK = "UN_LOCK",
}
