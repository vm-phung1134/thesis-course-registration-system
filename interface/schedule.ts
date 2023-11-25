import { IAuthObject } from "./auth";
import { IRoomDefObject } from "./room";
import { IStudentDefObject } from "./studef";

export interface ITimeSlotItem {
  id: string;
  date: string;
  time: string;
  shift: string;
}

export interface ITimeSlotForStudent {
  timeSlot: ITimeSlotItem;
  student: IStudentDefObject;
}

export interface IScheduleDefForStudent {
  room: IRoomDefObject;
  timeSlots: ITimeSlotItem[];
}

export interface IScheduleDef {
  room: IRoomDefObject;
  timeSlots: ITimeSlotForStudent[];
}

export interface ICouncilDef {
  id?: string;
  council: IAuthObject[];
  schedule: IScheduleDef;
}

export interface IThesisDef {
  message(
    message: any,
    arg1: {
      position: import("react-toastify").ToastPosition;
      autoClose: number;
    }
  ): unknown;
  id?: string;
  thesis: ICouncilDef[];
}
