import { Avatar } from "@/components/Atoms";
import { CommentForm, ContentComment } from "@/components/Molecules";
import { ClassroomTemplate } from "@/components/Templates";
import classNames from "classnames";
import { FC, useState } from "react";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import { ICommentObject } from "@/interface/comment";
import { useQuery } from "@tanstack/react-query";
import { IPostObject } from "@/interface/post";
import { getAllPosts, getPost } from "@/redux/reducer/post/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { convertToUnaccentedString } from "@/utils/convertString";

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
  task: IPostObject;
  handleOpenTaskModal: (taskPost: IPostObject) => void;
}

const TaskHeader: FC<ITaskHeaderProps> = ({ task, handleOpenTaskModal }) => {
  return (
    <div className="border p-5 bg-green-700 text-white">
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
                  {task?.type === "post" ? "Message" : "Postcercice"}
                </p>
                <small>20, August 2023 - 20:30 PM</small>
              </div>
              <span className="font-medium">
                {convertToUnaccentedString(task?.lecturer?.name)}
              </span>{" "}
              has been added a new exercise
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
  const [arrComment, setArrComment] = useState<ICommentObject[]>([]);
  const { data } = useQuery<IPostObject[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const action = await dispatch(getAllPosts());
      return action.payload || [];
    },
    initialData: [],
  });
  // HANDLE POST
  const { post } = useAppSelector((state) => state.postReducer);
  console.log(post.attachment);
  const dispatch = useAppDispatch();
  const handleOpenTaskModal = (task: IPostObject) => {
    setOpenModalPost?.(!openModalPost);
    dispatch(getPost(task));
  };
  return (
    <>
      <ClassroomTemplate title="Manage Class | Thesis course registration system">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <CriticalTask />
            {/* WAITING TIME */}
            {/* <div className="h-52 flex justify-center items-center p-5 border shadow-xl">
              <p className="uppercase text-green-700">OPS! Not have any critiacal task for you</p>
            </div> */}
          </div>
          <div className="col-span-8">
            <div className="h-fit w-full">
              <div className="border p-5 shadow-xl">
                {data?.map((post) => {
                  return (
                    <div key={post.id}>
                      <TaskHeader
                        handleOpenTaskModal={handleOpenTaskModal}
                        task={post}
                      />
                      <div className="p-5 flex flex-col gap-1 border">
                        <p className="text-[15px]">2 Comment for class</p>
                        <ContentComment arrComment={arrComment} />
                        <CommentForm
                          arrComment={arrComment}
                          setArrComment={setArrComment}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* WAITING TIME */}
              {/* <div className="h-20 flex justify-center items-center border p-5 shadow-xl">
                <p className="uppercase text-green-700">Ops! We do not have post for you</p>
              </div> */}
            </div>
          </div>
        </div>
        <PostModal
          modalClass={modalClassPost}
          post={post}
          setOpenModalPost={setOpenModalPost}
          openModalPost={openModalPost}
        />
        {/* <ExerciseModal
          modalClass={modalClassEx}
          post={exercise}
          setOpenModalEx={setOpenModalEx}
          openModalEx={openModalEx}
        /> */}
      </ClassroomTemplate>
    </>
  );
}
export default ManageClassroomTab;
