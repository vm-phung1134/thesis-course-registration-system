import { ICourseObject } from "@/interface/course";
import Cookies from "js-cookie";

export interface ClassroomState {
  classrooms: ICourseObject[];
  classroom: ICourseObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
