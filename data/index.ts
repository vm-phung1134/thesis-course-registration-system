import { IAuthObject } from "@/interface/auth";
import { ICategoryObject } from "@/interface/category";
import { IClassroomObject, IClassroomObjectInput } from "@/interface/classroom";
import { ICommentObject, ICommentObjectInput } from "@/interface/comment";
import { IExerciseObject, IExerciseObjectInput } from "@/interface/exercise";
import { IMemberObject } from "@/interface/member";
import { IAssessItem, IPointDefObject } from "@/interface/pointDef";
import { IPostObject } from "@/interface/post";
import {
  IPrivateComment,
  IPrivateCommentItem,
} from "@/interface/privateComment";
import { IRoomDefObject } from "@/interface/room";
import { IStudentDefObject } from "@/interface/studef";
import { ISubmitObject } from "@/interface/submit";
import { ITopicObject } from "@/interface/topic";
import { IUnavaiableItem, IUnavailableDate } from "@/interface/unavailableDate";
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
export const INITIATE_DATETIME = {
  year: 0,
  month: 0,
  day: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  nanos: 0,
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

export const INITIATE_CLASSROOM_INPUT: IClassroomObjectInput = {
  id: "",
  classCourse: "",
  lecturerID: INITIATE_AUTH.id,
  quantityStudent: 15,
  status: "UN_LOCK",
};

export const INITIATE_POST: IPostObject = {
  title: "",
  category: {
    label: "",
    description: "",
    value: "",
  },
  author: INITIATE_AUTH,
  description: "",
  classroomID: "",
};

export const INITIATE_EXERCISE: IExerciseObject = {
  title: "",
  classroomID: "",
  category: {
    label: "",
    description: "",
    value: "",
  },
  author: INITIATE_AUTH,
  description: "",
  deadline: INITIATE_DATETIME,
};

export const INITIATE_EXERCISE_INPUT: IExerciseObjectInput = {
  title: "",
  classroomID: "",
  categoryID: "",
  authorID: "",
  description: "",
  deadline: "",
};

export const INITIATE_TOPIC: ITopicObject = {
  title: "",
  typeTopic: "",
  memberQuantity: 0,
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

export const INITIATE_COMMENT: ICommentObjectInput = {
  userID: "",
  content: "",
  exerciseID: "",
};

export const INITIATE_PRIVATE_COMMENT: IPrivateComment = {
  userId: "",
  comments: [],
  lecturerId: "",
};

export const INITIATE_PRIVATE_COMMENT_ITEM: IPrivateCommentItem = {
  user: INITIATE_AUTH,
  id: "",
  content: "",
};

export const INITIATE_COMMENT_INPUT: ICommentObject = {
  user: INITIATE_AUTH,
  content: "",
  exercise: INITIATE_EXERCISE,
};

export const INITIATE_SUBMIT: ISubmitObject = {
  exerciseID: "",
  userID: "",
  attachments: [],
  status: "",
};

export const INITIATE_UNAVAIABLE_SCHEDULE_ITEM: IUnavaiableItem = {
  id: "",
  date: "",
  reason: "",
};

export const INITIATE_UNAVAIABLE_SCHEDULE: IUnavailableDate = {
  lecturer: INITIATE_AUTH,
  schedules: [],
};

export const INITIATE_STUDENT_DEF: IStudentDefObject = {
  id: "",
  infor: INITIATE_AUTH,
  instructor: INITIATE_AUTH,
};

export const INITIATE_ROOM_DEF: Omit<IRoomDefObject, "id"> = {
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
  NO_SUB = "NOT SUBSCRIBED YET",
  WAITING = "WAITING",
  UN_SUB = "SUBSCRIBED",
}

export enum STATE_LECTURER_CLASSROOM {
  UN_LOCK = "UN_LOCK",
  LOCK = "LOCK",
}

export enum TYPE_ACTION_NOTIFICATION {
  SHARE_POST = "share-port",
  COMMENT_POST = "comment-post",
  LIKE_POST = "like-post",
  WELLCOME = "wellcome",
  FOLLOWING = "following",
  ADD_POST = "add-post",
}

export const roleInCouncil = ["Chairman", "secretary", "Commissioner"];
