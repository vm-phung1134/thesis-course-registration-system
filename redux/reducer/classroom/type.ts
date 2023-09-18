import { IClassroomObject } from "@/interface/classroom";
import Cookies from "js-cookie";

export interface ClassroomState {
  classrooms: IClassroomObject[];
  classroom: IClassroomObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
