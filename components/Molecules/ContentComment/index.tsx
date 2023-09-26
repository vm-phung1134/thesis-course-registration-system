import { Avatar } from "@/components/Atoms";
import { ICommentObject } from "@/interface/comment";
import { IExerciseObject } from "@/interface/exercise";
import { IPostObject } from "@/interface/post";
import { getAllComments } from "@/redux/reducer/comment/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

export interface IContentCommentProps {
  task: IPostObject | IExerciseObject;
  quantity: number;
}

export const ContentComment: FC<IContentCommentProps> = ({
  task,
  quantity,
}) => {
  const dispatch = useAppDispatch();
  const { data } = useQuery<ICommentObject[]>({
    queryKey: ["comments", task],
    queryFn: async () => {
      const action = await dispatch(getAllComments(task));
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <>
      <p className="text-sm">{data.length} Comment for class</p>
      {data?.map((comment, index) => {
        return (
          (index < quantity) && (
            <div key={index} className="flex gap-3 py-2">
              <Avatar
                widthStr="w-10 h-10"
                srcImg={
                  comment?.user?.photoSrc ||
                  "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
              />
              <div className="text-[15px]">
                <p className="font-medium">
                  {comment?.user?.name}{" "}
                  <small className="font-normal">10:00</small>
                </p>
                <p className="text-sm">{comment?.content}</p>
              </div>
            </div>
          )
        );
      })}
    </>
  );
};
