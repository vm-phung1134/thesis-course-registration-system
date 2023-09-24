import { ICategoryObject } from "@/interface/category";
import Cookies from "js-cookie";

export interface ReportStageState {
  reportStages: ICategoryObject[];
  reportStage: ICategoryObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
