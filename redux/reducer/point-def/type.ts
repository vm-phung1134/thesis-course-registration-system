import { IAssessItem, IPointDefObject } from "@/interface/pointDef";
import Cookies from "js-cookie";

export interface IAssessLecturerItem {
  studentId: string;
  lecturerId: string;
}

export interface PointDefState {
  points: IPointDefObject[];
  point: IPointDefObject;
  pointLec: IAssessItem;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
