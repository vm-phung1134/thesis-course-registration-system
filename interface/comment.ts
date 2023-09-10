import { IAuthObject } from "./auth";

export interface ICommentObject {
    user: IAuthObject;
    content: string;
    // additionally
}