import { Avatar } from "@/components/Atoms";
import { CommentForm, ContentComment } from "@/components/Molecules";
import { ClassroomTemplate } from "@/components/Templates";
import classNames from "classnames";
import { FC, useState, useEffect } from "react";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import { ICommentObject } from "@/interface/comment";
import { useQuery } from "@tanstack/react-query";
import { IPostObject } from "@/interface/post";
import { getAllPostInClass, getPost } from "@/redux/reducer/post/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { convertToUnaccentedString } from "@/utils/convertString";
import {
  getAllExerciseInClass,
  getExercise,
} from "@/redux/reducer/exercise/api";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { IExerciseObject } from "@/interface/exercise";

const CriticalTask = () => {
  return (
    <div className="h-fit p-5 border shadow-xl">
      <h2 className="uppercase text-md font-normal mb-2">Critical tasks</h2>
      <p className="text-red-600 text-sm mb-2">Deadline 28, August 2023</p>
      <p className="font-medium text-md uppercase">report progress thesis</p>
      <div className="flex justify-start">
        <button className="btn rounded-none bg-transparent p-0 hover:bg-transparent border-none capitalize font-normal">
          View detail
        </button>
      </div>
    </div>
  );
};

interface ITaskHeaderProps {
  task: IPostObject | IExerciseObject;
  handleOpenTaskModal: (task: any) => void;
}

const TaskHeader: FC<ITaskHeaderProps> = ({ task, handleOpenTaskModal }) => {
  return (
    <div className="border px-5 py-3 text-sm bg-green-700 text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Avatar
            widthStr="w-10 h-10"
            srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <div className="flex flex-col">
            <div
              onClick={() => handleOpenTaskModal(task)}
              className="cursor-pointer ease-in-out duration-300"
            >
              <div className="flex gap-3 items-center">
                <p className="text-xs px-3 py-1 bg-green-900 w-fit">
                  {task?.type === "post" ? "Message" : "Exercise"}
                </p>
                <small>20, August 2023 - 20:30 PM</small>
              </div>
              <span className="font-medium">
                {convertToUnaccentedString(task?.lecturer?.name)}
              </span>{" "}
              has been added a new{" "}
              {task.type === "post" ? "Message" : "Exercise"}
            </div>
          </div>
        </div>
        <button>...</button>
      </div>
    </div>
  );
};

function ManageClassroomTab() {
  const [openModalPost, setOpenModalPost] = useState<boolean>(false);
  const [openModalEx, setOpenModalEx] = useState<boolean>(false);
  const modalClassPost = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalPost,
  });
  const modalClassEx = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalEx,
  });
  const { subscribeState } = useSubscribeStateContext();
  const [arrComment, setArrComment] = useState<ICommentObject[]>([]);
  const dispatch = useAppDispatch();

  const handleOpenPostModal = (task: IPostObject) => {
    setOpenModalPost?.(!openModalPost);
    dispatch(getPost(task));
  };

  const handleOpenExModal = (task: IExerciseObject) => {
    setOpenModalEx?.(!openModalEx);
    dispatch(getExercise(task));
  };

  // HANDLE POST
  const { post } = useAppSelector((state) => state.postReducer);
  const { data: posts } = useQuery<IPostObject[]>({
    queryKey: ["posts", subscribeState.classroom],
    queryFn: async () => {
      const action = await dispatch(
        getAllPostInClass(subscribeState.classroom)
      );
      return action.payload || [];
    },
    initialData: [],
  });

  // HANDLE EXERCISE
  const { exercise } = useAppSelector((state) => state.exerciseReducer);
  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["exercises", subscribeState.classroom],
    queryFn: async () => {
      const action = await dispatch(
        getAllExerciseInClass(subscribeState.classroom)
      );
      return action.payload || [];
    },
    initialData: [],
  });

  return (
    <>
      <ClassroomTemplate title="Manage Class | Thesis course registration system">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            {exercises && posts ? (
              <CriticalTask />
            ) : (
              <div className="h-52 flex justify-center items-center p-5 border shadow-xl">
                <p className="uppercase text-green-700">
                  OPS! Not have any critiacal task for you
                </p>
              </div>
            )}
          </div>
          <div className="col-span-8">
            <div className="h-fit w-full">
              {exercises && posts ? (
                <>
                  <div className="border p-5 shadow-xl">
                    {exercises?.map((exercise) => {
                      return (
                        <div key={exercise.id}>
                          <TaskHeader
                            handleOpenTaskModal={handleOpenExModal}
                            task={exercise}
                          />
                          <div className="p-5 flex flex-col gap-1 border">
                            <ContentComment quantity={1} task={exercise} />
                            <CommentForm task={exercise} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border p-5 shadow-xl">
                    {posts?.map((post) => {
                      return (
                        <div key={post.id}>
                          <TaskHeader
                            handleOpenTaskModal={handleOpenPostModal}
                            task={post}
                          />
                          <div className="p-5 flex flex-col gap-1 border">
                            <ContentComment quantity={1} task={post} />
                            <CommentForm task={post} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="h-20 flex justify-center items-center border p-5 shadow-xl">
                  <p className="uppercase text-green-700">
                    Ops! We do not have post for you
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <PostModal
          modalClass={modalClassPost}
          post={post}
          setOpenModalPost={setOpenModalPost}
          openModalPost={openModalPost}
        />
        <ExerciseModal
          modalClass={modalClassEx}
          exercise={exercise}
          setOpenModalEx={setOpenModalEx}
          openModalEx={openModalEx}
        />
      </ClassroomTemplate>
    </>
  );
}
export default ManageClassroomTab;
