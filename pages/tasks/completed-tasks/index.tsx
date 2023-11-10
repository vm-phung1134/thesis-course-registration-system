import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import {
  Breadcrumb,
  SelectBox,
  SelectInForm,
  SnipperRound,
} from "@/components/Atoms";
import { BREADCRUMB_COMPLETED_TASKS } from "./mock-data";
import { DATA_STATE_REPORT } from "@/pages/manage-classroom/report-progress/mock-data";
import { IOptionItem } from "@/interface/filter";
import { ICategoryObject } from "@/interface/category";
import { DATA_FILTER_TASKS } from "../critical-tasks/mock-data";
import {
  CriticalTask,
  ExerciseCard,
  PostReportCard,
} from "@/components/Molecules";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IExerciseObject } from "@/interface/exercise";
import { useQuery } from "@tanstack/react-query";
import { useClassroomStateContext } from "@/contexts/classroomState";
import {
  getAllExerciseInClass,
  getExercise,
} from "@/redux/reducer/exercise/api";
import classNames from "classnames";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import { getAllPostInClass, getPost } from "@/redux/reducer/post/api";
import { IPointDefObject } from "@/interface/pointDef";
import { IPostObject } from "@/interface/post";
import Image from "next/image";

function CriticalTasks() {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStage, setSelectedStage] = useState<ICategoryObject>({
    id: "",
    label: "Select stage",
    value: "",
    description: "",
  });
  const [selectedFilter, setSelectedFilter] = useState<
    IOptionItem | ICategoryObject
  >({
    label: "Filter tasks",
    value: "",
  });
  // EXERCISE
  const [openModalEx, setOpenModalEx] = useState<boolean>(false);
  const modalClassEx = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalEx,
  });
  const handleOpenExModal = (task: IExerciseObject) => {
    setOpenModalEx?.(!openModalEx);
    dispatch(getExercise(task));
  };
  // POST
  const [openModalPost, setOpenModalPost] = useState<boolean>(false);
  const modalClassPost = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalPost,
  });
  const handleOpenPostModal = (task: IPostObject) => {
    setOpenModalPost?.(!openModalPost);
    dispatch(getPost(task));
  };
  const dispatch = useAppDispatch();
  const { exercise } = useAppSelector((state) => state.exerciseReducer);
  const { post } = useAppSelector((state) => state.postReducer);
  const { authClassroomState } = useClassroomStateContext();
  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["exercises", authClassroomState],
    queryFn: async () => {
      const action = await dispatch(getAllExerciseInClass(authClassroomState));
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: posts } = useQuery<IExerciseObject[]>({
    queryKey: ["posts", authClassroomState],
    queryFn: async () => {
      const action = await dispatch(getAllPostInClass(authClassroomState));
      return action.payload || [];
    },
    initialData: [],
  });

  const handleCompletedEx = (arr: IExerciseObject[]) => {
    return arr
      .filter((task) => task?.attachments?.length || 0 > 0)
      .sort(
        (a, b) =>
          new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      );
  };
  const handleCompletedPost = (arr: IPostObject[]) => {
    return arr.filter((task) => task?.attachments?.length || 0 > 0);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      <MainboardTemplate title="Task completed | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_COMPLETED_TASKS} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Completed <span className="text-orange-500"> Tasks</span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <div className="flex gap-5">
              <div className="py-3 w-8/12">
                <div className="flex items-center gap-5">
                  <div className="flex-grow">
                    <SelectInForm
                      options={DATA_STATE_REPORT}
                      selectedStage={selectedStage}
                      setSelectedStage={setSelectedStage}
                    />
                  </div>
                  <div className="flex-grow mt-2">
                    <SelectBox
                      setPadding="lg"
                      setSelected={setSelectedFilter}
                      selected={selectedFilter}
                      options={DATA_FILTER_TASKS}
                    />
                  </div>
                </div>
                {handleCompletedEx(exercises)?.map((ex, index) => (
                  <ExerciseCard
                    handleOpenTaskModal={handleOpenExModal}
                    key={ex.id}
                    exercise={ex}
                  />
                ))}
                {handleCompletedPost(posts)?.map((post, index) => (
                  <PostReportCard
                    handleOpenTaskModal={handleOpenPostModal}
                    key={post.id}
                    post={post}
                  />
                ))}
                {(handleCompletedPost(posts).length === 0 && (handleCompletedPost(exercises).length ===0) && (
                  <div className="h-60 flex flex-col justify-center items-center p-5 mt-5">
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
                ))}
              </div>
              <div className="w-4/12">
                {handleCompletedEx(exercises).length > 0 ? (
                  <CriticalTask exercise={handleCompletedEx(exercises)[0]} />
                ) : (
                  <>
                    <div className="h-60 flex gap-5 flex-col justify-center shadow-xl items-center p-5 border rounded-xl">
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
                  </>
                )}
              </div>
            </div>
            <ExerciseModal
              modalClass={modalClassEx}
              exercise={exercise}
              setOpenModalEx={setOpenModalEx}
              openModalEx={openModalEx}
            />
            <PostModal
              modalClass={modalClassPost}
              post={post}
              setOpenModalPost={setOpenModalPost}
              openModalPost={openModalPost}
            />
          </>
        )}
      </MainboardTemplate>
    </>
  );
}

export default CriticalTasks;
