import { IThesisDef } from "@/interface/schedule";
import Cookies from "js-cookie";

export interface ScheduledDefState {
  thesis: IThesisDef;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
