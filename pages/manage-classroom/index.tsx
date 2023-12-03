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
import { getPost } from "@/redux/reducer/post/api";
import { useAppDispatch } from "@/redux/store";
import { getExercise } from "@/redux/reducer/exercise/api";
import { IExerciseObject } from "@/interface/exercise";
import { useClassroomStateContext } from "@/contexts/classroomState";
import Image from "next/image";
import { Button } from "@/components/Atoms";
import { INITIATE_EXERCISE, INITIATE_POST } from "@/data";
import { motion } from "framer-motion";
import { ISubmitObject } from "@/interface/submit";
import { getAllSubmitStud } from "@/redux/reducer/submit/api";
import { getExerciseWithNearestDeadline } from "@/utils/getDeadline";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import {
  getAllExerciseInClass,
  getAllPostInClass,
} from "@/redux/reducer/classroom/api";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";

function ManageClassroomTab() {
  const { currentUser } = useCurrentUserContext();
  const { authClassroomState } = useClassroomStateContext();
  const [openModalPost, setOpenModalPost] = useState<boolean>(false);
  const [openModalEx, setOpenModalEx] = useState<boolean>(false);
  const [exRenew, setExRenew] = useState<IExerciseObject>(INITIATE_EXERCISE);
  const [postRenew, setPostRenew] = useState<IPostObject>(INITIATE_POST);
  const { data: posts } = useQuery<IPostObject[]>({
    queryKey: ["classroom-posts", authClassroomState],
    queryFn: async () => {
      if (authClassroomState) {
        const action = await dispatch(getAllPostInClass(authClassroomState));
        return action.payload || [];
      }
      return [];
    },
    initialData: [],
  });
  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["classroom-exercises", authClassroomState],
    queryFn: async () => {
      if (authClassroomState) {
        const action = await dispatch(
          getAllExerciseInClass(authClassroomState)
        );
        return action.payload || [];
      }
      return [];
    },
    initialData: [],
  });
  const modalClassPost = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalPost,
  });
  const modalClassEx = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalEx,
  });
  const dispatch = useAppDispatch();
  const handleOpenPostModal = (task: IPostObject) => {
    setOpenModalPost(!openModalPost);
    setPostRenew(task);
  };

  const handleOpenExModal = (task: IExerciseObject) => {
    setOpenModalEx(!openModalEx);
    setExRenew(task);
  };
  const { data: submission } = useQuery<ISubmitObject[]>({
    queryKey: ["submission", currentUser],
    queryFn: async () => {
      const action = await dispatch(getAllSubmitStud(currentUser));
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <>
      <ClassroomTemplate title="Manage Class | Thesis course registration system">
        <div className="grid grid-cols-12 gap-4 min-h-[80vh] max-h-fit">
          <div className="col-span-4">
            <div className="flex flex-col gap-3">
              {exercises.length > 0 &&
              getExerciseWithNearestDeadline(exercises) ? (
                <CriticalTask
                  submission={submission}
                  exercise={getExerciseWithNearestDeadline(exercises)}
                />
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
                <div className="flex flex-col gap-3">
                  {posts?.map((post, index) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.5 }}
                        key={post.id}
                        className="text-xs border rounded-xl p-3 "
                      >
                        <div className=" flex flex-col gap-2">
                          <div>
                            <p className="capitalize font-bold text-green-700">
                              {post?.author?.name}{" "}
                              <span className="normal-case font-normal text-black">
                                has post an announcement !!!
                              </span>
                            </p>
                            <p className="text-[10px] ">
                              Saturday, 10/14/2023 - 11:59 PM
                            </p>
                          </div>
                          <h5 className="font-medium">{post?.title}</h5>
                          <div className="flex justify-between items-end">
                            <div className="">
                              {currentUser?.role ===
                                ROLE_ASSIGNMENT.LECTURER && (
                                <div className="flex gap-1">
                                  <button className="flex gap-2 px-2 py-1 text-xs items-center">
                                    <svg
                                      className="w-4 h-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                      />
                                    </svg>
                                    <p>Edit</p>
                                  </button>
                                </div>
                              )}
                            </div>
                            <Button
                              otherType="subscribe"
                              handleActions={() => handleOpenPostModal(post)}
                              className="text-green-700 text-xs btn-sm bg-transparent border-none"
                              title="Read announcement"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-8">
            <div className="h-fit w-full">
              {exercises.length > 0 ? (
                <>
                  {exercises.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {exercises?.map((exercise, index) => {
                        return (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: index * 0.5 }}
                            key={exercise.id}
                            className="rounded-xl shadow-lg"
                          >
                            <NewFeedCard
                              handleOpenTaskModal={handleOpenExModal}
                              task={exercise}
                            />
                            <div className="px-5 py-2 flex flex-col">
                              <ContentComment
                                quantity={1}
                                taskId={exercise?.id || ""}
                              />
                              <CommentForm task={exercise} />
                            </div>
                          </motion.div>
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
          post={postRenew}
          setOpenModalPost={setOpenModalPost}
          openModalPost={openModalPost}
        />
        <ExerciseModal
          modalClass={modalClassEx}
          exercise={exRenew}
          setOpenModalEx={setOpenModalEx}
          openModalEx={openModalEx}
        />
      </ClassroomTemplate>
    </>
  );
}
export default ManageClassroomTab;
