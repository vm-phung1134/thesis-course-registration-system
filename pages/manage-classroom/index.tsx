import {
  CommentForm,
  ContentComment,
  CriticalTask,
  NewFeedCard,
} from "@/components/Molecules";
import { ClassroomTemplate } from "@/components/Templates";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Button, NormalAvatar } from "@/components/Atoms";
import { INITIATE_EXERCISE, INITIATE_POST } from "@/data";

function ManageClassroomTab() {
  const queryClient = useQueryClient();
  const { exercises } = useAppSelector((state) => state.exerciseReducer);
  const { posts } = useAppSelector((state) => state.postReducer);
  const [openModalPost, setOpenModalPost] = useState<boolean>(false);
  const [openModalEx, setOpenModalEx] = useState<boolean>(false);
  const [exRenew, setExRenew] = useState<IExerciseObject>(INITIATE_EXERCISE);
  const [postRenew, setPostRenew] = useState<IPostObject>(INITIATE_POST);
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
    setPostRenew(task);
  };

  const handleOpenExModal = (task: IExerciseObject) => {
    setOpenModalEx(!openModalEx);
    setExRenew(task);
  };

  // HANDLE POST
  const { data: post_fetch } = useQuery<IPostObject>({
    queryKey: ["post", postRenew],
    queryFn: async () => {
      const action = await dispatch(getPost(postRenew));
      return action.payload || {};
    },
    initialData: postRenew,
  });

  // HANDLE EXERCISE
  const { data: ex_fetch } = useQuery<IExerciseObject>({
    queryKey: ["exercise", exRenew],
    queryFn: async () => {
      const action = await dispatch(getExercise(exRenew));
      return action.payload || {};
    },
    initialData: exRenew,
  });

  const handleCriticalEx = (arr: IExerciseObject[]) => {
    return arr
      .filter((task) => task?.attachments?.length === 0)
      .sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
  };

  useEffect(() => {
    dispatch(getAllExerciseInClass(authClassroomState));
    dispatch(getAllPostInClass(authClassroomState));
  }, [authClassroomState, dispatch]);

  return (
    <>
      <ClassroomTemplate title="Manage Class | Thesis course registration system">
        <div className="grid grid-cols-12 gap-4 min-h-[80vh] max-h-fit">
          <div className="col-span-4">
            <div className="flex flex-col gap-3">
              {handleCriticalEx(exercises).length > 0 ? (
                <CriticalTask exercise={handleCriticalEx(exercises)[0]} />
              ) : (
                <div className="h-52 flex gap-5 flex-col justify-center items-center p-5 border rounded-xl">
                  <Image
                    src="https://cdn-icons-gif.flaticon.com/8121/8121267.gif"
                    width="50"
                    height="50"
                    className="-hue-rotate-[38deg] saturate-[.85]"
                    alt=""
                  />
                  <p className="font-medium text-green-700">
                    OPS! Not have any critical task for you today
                  </p>
                </div>
              )}
              <h4 className="text-sm capitalize font-bold">announcements</h4>
              {posts.length > 0 && (
                <div className="border rounded-xl flex flex-col gap-3">
                  {posts?.map((post, index) => {
                    return (
                      <div key={post.id} className="text-xs">
                        <div className="p-3 flex flex-col gap-2">
                          <div>
                            <p className="capitalize font-bold text-green-700">
                              {post?.lecturer?.name}{" "}
                              <span className="normal-case font-normal text-black">
                                has post an announcement !!!
                              </span>
                            </p>
                            <p className="text-[10px] ">
                              Saturday, 10/14/2023 - 11:59 PM
                            </p>
                          </div>
                          <h5 className="font-medium">{post?.title}</h5>
                          <div className="flex justify-end">
                            <Button
                              otherType="subscribe"
                              handleActions={() => handleOpenPostModal(post)}
                              className="text-green-700 text-xs btn-sm bg-transparent border-none"
                              title="Read announcement"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-8">
            <div className="h-fit w-full">
              {exercises.length > 0 || posts.length > 0 ? (
                <>
                  {exercises.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {exercises?.map((exercise) => {
                        return (
                          <div
                            key={exercise.id}
                            className="rounded-xl shadow-lg"
                          >
                            <NewFeedCard
                              handleOpenTaskModal={handleOpenExModal}
                              task={exercise}
                            />
                            <div className="px-5 py-2 flex flex-col">
                              <ContentComment quantity={1} task={exercise} />
                              <CommentForm task={exercise} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
          post={post_fetch}
          setOpenModalPost={setOpenModalPost}
          openModalPost={openModalPost}
        />
        <ExerciseModal
          modalClass={modalClassEx}
          exercise={ex_fetch}
          setOpenModalEx={setOpenModalEx}
          openModalEx={openModalEx}
        />
      </ClassroomTemplate>
    </>
  );
}
export default ManageClassroomTab;
