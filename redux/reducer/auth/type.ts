import { IAuthObject } from "@/interface/auth";
import Cookies from "js-cookie";

export interface AuthState {
  auths: IAuthObject[];
  auth: IAuthObject;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  stateAuth: string;
}

export const token = Cookies.get("token");
const userJson = Cookies.get("user");
export const user: IAuthObject = userJson ? JSON.parse(userJson) : null;
