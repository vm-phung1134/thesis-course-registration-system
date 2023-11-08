import { ISubmitObject } from "@/interface/submit";
import Cookies from "js-cookie";

export interface SubmitState {
  submits: ISubmitObject[];
  submit: ISubmitObject;
  isLoading: boolean;
  isDeleted: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
