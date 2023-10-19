import {
  CommentForm,
  ContentComment,
  CriticalTask,
  NewFeedCard,
} from "@/components/Molecules";
import { ClassroomTemplate } from "@/components/Templates";
import classNames from "classnames";
import { useState } from "react";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import { useQuery } from "@tanstack/react-query";
import { IPostObject } from "@/interface/post";
import { getAllPostInClass, getPost } from "@/redux/reducer/post/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getAllExerciseInClass,
  getExercise,
} from "@/redux/reducer/exercise/api";
import { IExerciseObject } from "@/interface/exercise";
import { useClassroomStateContext } from "@/contexts/classroomState";
import Image from "next/image";

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
  const dispatch = useAppDispatch();
  const { authClassroomState } = useClassroomStateContext();
  const handleOpenPostModal = (task: IPostObject) => {
    setOpenModalPost(!openModalPost);
    dispatch(getPost(task));
  };

  const handleOpenExModal = (task: IExerciseObject) => {
    setOpenModalEx(!openModalEx);
    dispatch(getExercise(task));
  };

  // HANDLE POST
  const { post } = useAppSelector((state) => state.postReducer);
  const { data: posts } = useQuery<IPostObject[]>({
    queryKey: ["posts", authClassroomState],
    queryFn: async () => {
      const action = await dispatch(getAllPostInClass(authClassroomState));
      return action.payload || [];
    },
    initialData: [],
  });

  // HANDLE EXERCISE
  const { exercise } = useAppSelector((state) => state.exerciseReducer);
  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["exercises", authClassroomState],
    queryFn: async () => {
      const action = await dispatch(getAllExerciseInClass(authClassroomState));
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
              {exercises.length > 0 || posts.length > 0 ? (
                <>
                  <div className="py-3 shadow-xl mb-5 flex flex-col gap-2">
                    {exercises?.map((exercise) => {
                      return (
                        <div key={exercise.id}>
                          <NewFeedCard
                            handleOpenTaskModal={handleOpenExModal}
                            task={exercise}
                          />
                          <div className="px-5 py-2 flex flex-col gap-1">
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
                          <NewFeedCard
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
                <div className="h-60 flex flex-col justify-center items-center border p-5 shadow-xl">
                  <Image
                    src="https://yi-files.s3.eu-west-1.amazonaws.com/products/794000/794104/1354385-full.jpg"
                    width="200"
                    height="200"
                    className="-hue-rotate-[38deg] saturate-[.85]"
                    alt=""
                  />
                  <p className="uppercase text-sm text-green-700">
                    Ops! We do not have exercise or post for you today
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
