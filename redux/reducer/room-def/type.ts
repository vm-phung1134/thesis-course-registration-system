import { IRoomDefObject } from "@/interface/room";
import Cookies from "js-cookie";

export interface RoomDefState {
  rooms: IRoomDefObject[];
  room: IRoomDefObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");