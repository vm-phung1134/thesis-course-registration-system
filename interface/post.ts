import { IAuthObject } from "./auth";
import { ICategoryObject } from "./category";
import { IGeneralLinkAttachment } from "./submit";

export interface IPostObject {
  id?: string;
  title: string;
  classroomID: string;
  category: ICategoryObject;
  author: IAuthObject;
  description: string;
  attachments?: IGeneralLinkAttachment[] | any[];
  createAt?: string;
  updateAt?: string;
}

export interface IPostObjectInput {
  id?: string;
  title: string;
  classroomID: string;
  categoryID: string;
  authorID: string;
  description: string;
  attachments?: IGeneralLinkAttachment[] | any[];
}
