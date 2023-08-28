import { IAuthObject } from "./auth";
import { ICategoryObject } from "./category";

export interface IPostObject {
  id: string;
  category: ICategoryObject;
  lecturer: IAuthObject;
  description: string;
}
