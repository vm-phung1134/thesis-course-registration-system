import { IAuthObject } from "@/interface/auth";
import { ICategoryObject } from "@/interface/category";
import { IClassroomObject } from "@/interface/classroom";
import { ICommentObject } from "@/interface/comment";
import { IExerciseObject } from "@/interface/exercise";
import { IMemberObject } from "@/interface/member";
import { IAssessItem, IPointDefObject } from "@/interface/pointDef";
import { IPostObject } from "@/interface/post";
import { IRoomDefObject } from "@/interface/room";
import { IStudentDefObject } from "@/interface/studef";
import { ISubmitObject } from "@/interface/submit";
import { ITopicObject } from "@/interface/topic";
import { IUploadReportObject } from "@/interface/upload";

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
  status: "UN_LOCK",
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
  registerDefense: false,
  id: "",
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

export const INITIATE_STUDENT_DEF: IStudentDefObject = {
  id: "",
  infor: INITIATE_AUTH,
  instructor: INITIATE_AUTH,
};

export const INITIATE_ROOM_DEF: IRoomDefObject = {
  id: "",
  name: "",
  type: "",
  school: "",
};

export const INITIATE_COUNCIL_DEF: IAuthObject = {
  name: "",
  photoSrc: "",
  email: "",
  phone: "",
  class: "",
  major: "",
  role: "",
  id: "",
};

export const INITIATE_UPLOAD_REPORT: IUploadReportObject = {
  uid: "",
  student: INITIATE_AUTH,
  status: "",
};

export const INITIATE_POINT_DEF: IPointDefObject = {
  id: "",
  student: INITIATE_AUTH,
  assesses: [],
};

export const INITIATE_ASSESS: Omit<IAssessItem, "id"> = {
  lecturer: INITIATE_AUTH,
  point: 0,
  comment: "",
};

export enum STATE_AUTH_CLASSROOM {
  NO_SUB = "NO_SUBSCRIBE",
  WAITING = "WAITING",
  UN_SUB = "UN_SUBSCRIBE",
}

export enum STATE_LECTURER_CLASSROOM {
  UN_LOCK = "UN_LOCK",
  LOCK = "LOCK",
}
