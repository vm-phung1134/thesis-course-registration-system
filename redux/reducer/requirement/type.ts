import { IMemberObject } from "@/interface/member";
import Cookies from "js-cookie";

export interface RequirementState {
  requirements: IMemberObject[];
  isLoading: boolean;
  requirement: IMemberObject;
  error: {message: string} | any;
}

export const token = Cookies.get("token");
