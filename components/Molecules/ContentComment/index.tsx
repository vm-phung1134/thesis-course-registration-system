import { Avatar } from "@/components/Atoms";
import { ICommentObject } from "@/interface/comment";
import { FC } from "react";

export interface IContentCommentProps {
  arrComment: ICommentObject[];
}

export const ContentComment: FC<IContentCommentProps> = ({
  arrComment = [],
}) => {
  return (
    <>
      {arrComment.map((comment, index) => {
        return (
          <div key={index} className="flex gap-3 py-2">
            <Avatar
              widthStr="w-10 h-10"
              srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="text-[15px]">
              <p className="font-medium">
                {comment?.user?.name}{" "}
                <small className="font-normal">10:00</small>
              </p>
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
