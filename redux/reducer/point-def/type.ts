import { IPointDefObject } from "@/interface/pointDef";
import Cookies from "js-cookie";

export interface PointDefState {
  points: IPointDefObject[];
  point: IPointDefObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
