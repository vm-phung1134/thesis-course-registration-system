import { IAuthObject } from "./auth";

export interface IUnavaiableItem {
  id: string;
  date: string;
  reason: string;
}

export interface IUnavailableDate {
  id?: string;
  lecturer: IAuthObject;
  schedules: IUnavaiableItem[];
}
