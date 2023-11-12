/* eslint-disable react/display-name */
import { NormalAvatar } from "@/components/Atoms";
import { ICommentObject } from "@/interface/comment";
import { IExerciseObject } from "@/interface/exercise";
import { IPostObject } from "@/interface/post";
import { getAllComments } from "@/redux/reducer/comment/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { FC, memo } from "react";

export interface IContentCommentProps {
  task: IPostObject | IExerciseObject;
  quantity: number;
}

export const ContentComment: FC<IContentCommentProps> = memo(
  ({ task, quantity }) => {
    const dispatch = useAppDispatch();
    const { data: comments } = useQuery<ICommentObject[]>({
      queryKey: ["comments", task.uid],
      queryFn: async () => {
        const action = await dispatch(getAllComments(task.uid));
        return action.payload;
      },
    });
    return (
      <>
        <p className="text-sm text-gray-600 tracking-wider pb-1">
          {comments?.length} Comment in this post
        </p>
        {comments?.map((comment, index) => {
          return (
            index < quantity && (
              <div key={index} className="flex gap-2 py-3 border-t">
                <NormalAvatar
                  setSize="w-10"
                  photoSrc={comment?.user?.photoSrc}
                />
                <div className="text-sm">
                  <div className="flex gap-2 items-end">
                    <p className="capitalize font-medium">
                      {comment?.user?.name}
                    </p>
                    <p className="font-normal text-xs">{`10:00 (edited)`}</p>
                  </div>
                  <p className="text-sm">{comment?.content}</p>
                </div>
              </div>
            )
          );
        })}
      </>
    );
  }
);
