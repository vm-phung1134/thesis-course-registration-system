import { IAuthObject } from "@/interface/auth";
import { IClassroomObject } from "@/interface/classroom";
import { ICommentObject } from "@/interface/comment";
import { IExerciseObject } from "@/interface/exercise";
import { IMemberObject } from "@/interface/member";
import { IPostObject } from "@/interface/post";
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

export const INITIATE_POST: IPostObject = {
  title: "",
  category: {
    label: "",
    description: "",
    value: "",
  },
  lecturer: INITIATE_AUTH,
  description: "",
};

export const INITIATE_EXERCISE: IExerciseObject = {
  title: "",
  category: {
    label: "",
    description: "",
    value: "",
  },
  lecturer: INITIATE_AUTH,
  description: "",
  deadline: new Date(""),
  score: 0,
};

export const INITIATE_COURSE: IClassroomObject = {
  id: "",
  title: "",
  lecturer: INITIATE_AUTH,
  codeCourse: "",
  quantity: 0,
};

export const INITIATE_TOPIC: ITopicObject = {
  title: "",
  typeTopic: "",
  memberQuantiy: 0,
  student: INITIATE_AUTH,
  memberEmail: "",
  description: "",
};

export const INITIATE_MEMBER: IMemberObject = {
  classroom: INITIATE_COURSE,
  member: INITIATE_AUTH,
};

export const INITIATE_COMMENT: ICommentObject = {
  user: INITIATE_AUTH,
  content: "",
  postId: "",
};
