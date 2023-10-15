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
  council: IAuthObject[];
  schedule: IScheduleDef;
}

export interface IThesisDef {
  id?: string;
  thesis: ICouncilDef[];
}
