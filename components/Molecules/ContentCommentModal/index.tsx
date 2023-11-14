/* eslint-disable react/display-name */
import { NormalAvatar } from "@/components/Atoms";
import { ICommentObject } from "@/interface/comment";
import { IExerciseObject } from "@/interface/exercise";
import { IPostObject } from "@/interface/post";
import { getAllComments } from "@/redux/reducer/comment/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, memo } from "react";

export interface IContentCommentModalProps {
  task: IPostObject | IExerciseObject;
  quantity: number;
}

export const ContentCommentModal: FC<IContentCommentModalProps> = memo(
  ({ task, quantity }) => {
    const dispatch = useAppDispatch();
    const { data: comments } = useQuery<ICommentObject[]>({
      queryKey: ["comments-modal", task.uid],
      queryFn: async () => {
        const action = await dispatch(getAllComments(task.uid));
        return action.payload || [];
      },
      initialData: []
    });
    return (
      <>
        <div className="flex text-sm justify-between">
          <button className="">{`Load more comments (${comments?.length})`}</button>
        </div>
        <div className="overflow-x-scroll min-h-fit max-h-32">
          {comments?.map((comment, index) => {
            return (
              index < quantity && (
                <div key={comment?.id} className="flex gap-2 py-3 border-b">
                  <NormalAvatar
                    setSize="w-8"
                    photoSrc={comment?.user?.photoSrc}
                  />
                  <div className="text-xs">
                    <div className="flex gap-2 items-end">
                      <p className="capitalize font-medium">
                        {comment?.user?.name}
                      </p>
                      <p className="font-normal text-[10px]">{`10:00 (edited)`}</p>
                    </div>
                    <p className="text-xs text-black">{comment?.content}</p>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </>
    );
  }
);
