import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import {
  Breadcrumb,
  SelectBox,
  SelectInForm,
  SnipperRound,
} from "@/components/Atoms";
import { BREADCRUMB_CRITICAL_TASKS, DATA_FILTER_TASKS } from "./mock-data";
import { ICategoryObject } from "@/interface/category";
import { DATA_STATE_REPORT } from "@/pages/manage-classroom/report-progress/mock-data";
import { IOptionItem } from "@/interface/filter";
import {
  CriticalTask,
  ExerciseCard,
  PostReportCard,
} from "@/components/Molecules";
import classNames from "classnames";
import { IExerciseObject } from "@/interface/exercise";
import {
  getAllExerciseInClass,
  getExercise,
} from "@/redux/reducer/exercise/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { useQuery } from "@tanstack/react-query";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import { IPostObject } from "@/interface/post";
import { getAllPostInClass, getPost } from "@/redux/reducer/post/api";
import Image from "next/image";

function CriticalTasks() {
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleCriticalEx = (arr: IExerciseObject[]) => {
    return arr
      .filter((task) => task?.attachments?.length === 0)
      .sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
  };
  const handleCriticalPost = (arr: IPostObject[]) => {
    return arr.filter((task) => task?.attachments?.length === 0);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      <MainboardTemplate title="Critical tasks | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_CRITICAL_TASKS} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Critical <span className="text-orange-500"> Tasks</span>
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
                {handleCriticalEx(exercises).length > 0 &&
                  handleCriticalEx(exercises)?.map((ex, index) => (
                    <ExerciseCard
                      handleOpenTaskModal={handleOpenExModal}
                      key={ex.id}
                      exercise={ex}
                    />
                  ))}
                {handleCriticalPost(posts).length > 0 &&
                  handleCriticalPost(posts)?.map((post, index) => (
                    <PostReportCard
                      handleOpenTaskModal={handleOpenPostModal}
                      key={post.id}
                      post={post}
                    />
                  ))}
                {handleCriticalPost(posts).length === 0 && (
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
                )}
              </div>
              <div className="w-4/12">
                {handleCriticalEx(exercises).length > 0 ? (
                  <CriticalTask exercise={handleCriticalEx(exercises)[0]} />
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
            <ExerciseModal
              modalClass={modalClassEx}
              exercise={exercise}
              setOpenModalEx={setOpenModalEx}
              openModalEx={openModalEx}
            />
          </>
        )}
      </MainboardTemplate>
    </>
  );
}

export default CriticalTasks;
