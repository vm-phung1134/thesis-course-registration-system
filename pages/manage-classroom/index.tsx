import {
  CommentForm,
  ContentComment,
  CreatePostForm,
  CriticalTask,
  EditExerciseForm,
  EditPostForm,
  ModalConfirm,
  NewFeedCard,
} from "@/components/Molecules";
import { ClassroomTemplate } from "@/components/Templates";
import classNames from "classnames";
import { SetStateAction, useState } from "react";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import { useQuery } from "@tanstack/react-query";
import { IPostObject } from "@/interface/post";
import { deletePost, getPost } from "@/redux/reducer/post/api";
import { useAppDispatch } from "@/redux/store";
import { deleteExercise, getExercise } from "@/redux/reducer/exercise/api";
import { IExerciseObject } from "@/interface/exercise";
import { useClassroomStateContext } from "@/contexts/classroomState";
import Image from "next/image";
import { Button } from "@/components/Atoms";
import { INITIATE_CLASSROOM, INITIATE_EXERCISE, INITIATE_POST } from "@/data";
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
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";

function ManageClassroomTab() {
  const { currentUser } = useCurrentUserContext();
  const { authClassroomState } = useClassroomStateContext();
  const [openModalPost, setOpenModalPost] = useState<boolean>(false);
  const [openModalEx, setOpenModalEx] = useState<boolean>(false);
  const [exRenew, setExRenew] = useState<IExerciseObject>(INITIATE_EXERCISE);
  const [postRenew, setPostRenew] = useState<IPostObject>(INITIATE_POST);
  const [postEditnew, setPostEditnew] = useState<IPostObject>(INITIATE_POST);
  const [postDelnew, setPostDelnew] = useState<IPostObject>(INITIATE_POST);
  const [exEditnew, setExEditnew] =
    useState<IExerciseObject>(INITIATE_EXERCISE);
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

  const [openEditPostModal, setOpenEditPostModal] = useState<boolean>(false);
  const modalClassEditPost = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openEditPostModal,
  });
  const [openEditExModal, setOpenEditExModal] = useState<boolean>(false);
  const modalClassEditEx = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openEditExModal,
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
  const handleOpenModalEditPost = (post: IPostObject) => {
    setOpenEditPostModal(!openEditPostModal);
    setPostEditnew(post);
  };
  const handleOpenEditEx = (exercise: IExerciseObject) => {
    setOpenEditExModal(!openEditExModal);
    setExEditnew(exercise);
  };

  // HANDLE DELETE POST
  const [openDelPostModal, setOpenDelPostModal] = useState<boolean>(false);
  const modalClassDelPost = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openDelPostModal,
  });
  const handleOpenDelModal = (post: IPostObject) => {
    setOpenDelPostModal(!openDelPostModal);
    setPostDelnew(post);
  };
  const { data: submission } = useQuery<ISubmitObject[]>({
    queryKey: ["submission", currentUser],
    queryFn: async () => {
      const action = await dispatch(getAllSubmitStud(currentUser));
      return action.payload || [];
    },
    initialData: [],
  });
  const deleteMutation = useMutationQueryAPI({
    action: deletePost,
    queryKeyLog: ["classroom-posts"],
    successMsg: "You just delete announcement successfully!",
    errorMsg: "Fail to delete a announcement!",
  });
  const handleDelPost = () => {
    deleteMutation.mutate(postDelnew);
  };
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
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="capitalize font-bold text-green-700">
                                {post?.author?.name}{" "}
                                <span className="normal-case font-normal text-black dark:text-white">
                                  has post an announcement !!!
                                </span>
                              </p>
                              <p className="text-[10px] ">
                                Saturday, 10/14/2023 - 11:59 PM
                              </p>
                            </div>
                            {currentUser?.role === ROLE_ASSIGNMENT.LECTURER && (
                              <div className="dropdown dropdown-end">
                                <div
                                  tabIndex={0}
                                  role="button"
                                  className="p-2 font-bold"
                                >
                                  ...
                                </div>
                                <ul
                                  tabIndex={0}
                                  className="dropdown-content z-[1] menu shadow bg-base-100 w-32 text-xs rounded-none"
                                >
                                  <li
                                    onClick={() =>
                                      handleOpenModalEditPost(post)
                                    }
                                  >
                                    <a className="rounded-none dark:bg-[#1f1f1f] dark:text-white dark:hover:bg-green-600">
                                      Edit
                                    </a>
                                  </li>
                                  <li onClick={() => handleOpenDelModal(post)}>
                                    <a className="rounded-none dark:bg-[#1f1f1f] dark:text-white dark:hover:bg-green-600">
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                          <h5 className="font-medium">{post?.title}</h5>
                          <div className="flex justify-end items-end">
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
                            className="rounded-xl shadow-lg overflow-hidden dark:border"
                          >
                            <NewFeedCard
                              handleOpenTaskModal={handleOpenExModal}
                              task={exercise}
                              handleOpenEditEx={handleOpenEditEx}
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

        {/* UPDATE POST & EXERCISE */}
        <dialog id="modal_update_post" className={modalClassEditPost}>
          <div className="w-5/12 bg-white p-5 h-fit shadow-2xl rounded-xl">
            <EditPostForm
              setToggleForm={setOpenEditPostModal}
              toggleForm={openEditPostModal}
              classroom={authClassroomState || INITIATE_CLASSROOM}
              postObject={postEditnew}
            />
          </div>
        </dialog>
        <dialog id="modal_update_exercise" className={modalClassEditEx}>
          <div className="w-5/12 bg-white p-5 h-fit shadow-2xl rounded-xl">
            <EditExerciseForm
              setToggleForm={setOpenEditExModal}
              toggleForm={openEditExModal}
              classroom={authClassroomState || INITIATE_CLASSROOM}
              exercise={exEditnew}
            />
          </div>
        </dialog>
        <ModalConfirm
          modalClass={modalClassDelPost}
          setOpenModal={setOpenDelPostModal}
          openModal={openDelPostModal}
          action={handleDelPost}
          typeButton="subscribe"
          underMessage="Once you delete this announcement if will be gone forever"
          title="Message!!!"
          message="Are you sure that you want to delete this announcement?"
        />
      </ClassroomTemplate>
    </>
  );
}
export default ManageClassroomTab;
