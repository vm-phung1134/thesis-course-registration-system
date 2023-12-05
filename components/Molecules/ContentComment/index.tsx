/* eslint-disable react/display-name */
import { NormalAvatar } from "@/components/Atoms";
import { ICommentObject } from "@/interface/comment";
import { getAllComments } from "@/redux/reducer/comment/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { FC, memo } from "react";

export interface IContentCommentProps {
  taskId: string;
  quantity: number;
}

export const ContentComment: FC<IContentCommentProps> = memo(
  ({ taskId, quantity }) => {
    const dispatch = useAppDispatch();
    const { data: comments } = useQuery<ICommentObject[]>({
      queryKey: ["task-comments", taskId],
      queryFn: async () => {
        const action = await dispatch(getAllComments(taskId));
        return action.payload || [];
      },
      initialData: [],
    });
    return (
      <>
        <p className="text-sm text-gray-600 tracking-wider pb-1">
          {comments?.length} Comments in this report progress
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
