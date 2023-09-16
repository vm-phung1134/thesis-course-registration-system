import { IMemberObject } from "@/interface/member";
import Cookies from "js-cookie";

export interface RequirementState {
  requirements: IMemberObject[];
  isLoading: boolean;
  requirement: IMemberObject;
  error: string | null;
}

export const token = Cookies.get("token");
