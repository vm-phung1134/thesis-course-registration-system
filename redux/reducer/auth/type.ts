import { IAuthObject } from "@/interface/auth";
import { IMemberObject } from "@/interface/member";
import Cookies from "js-cookie";

export interface AuthState {
  auths: IAuthObject[];
  auth: IAuthObject;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  stateAuth: IMemberObject;
}

export const token = Cookies.get("token");
