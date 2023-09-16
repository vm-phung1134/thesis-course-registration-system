import { ITopicObject } from "@/interface/topic";
import Cookies from "js-cookie";

export interface TopicState {
  topics: ITopicObject[];
  isLoading: boolean;
  topic: ITopicObject;
  error: string | null;
}

export const token = Cookies.get("token");
