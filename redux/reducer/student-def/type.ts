import { IStudentDefObject } from "@/interface/studef";
import Cookies from "js-cookie";

export interface StudentDefState {
  studefs: IStudentDefObject[];
  studef: IStudentDefObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
