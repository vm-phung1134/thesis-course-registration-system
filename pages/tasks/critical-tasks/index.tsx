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
import { useAppDispatch } from "@/redux/store";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { useQuery } from "@tanstack/react-query";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import { IPostObject } from "@/interface/post";
import Image from "next/image";
import { ISubmitObject } from "@/interface/submit";
import { getAllSubmitStud } from "@/redux/reducer/submit/api";
import { INITIATE_EXERCISE, INITIATE_POST } from "@/data";
import { getExerciseWithNearestDeadline } from "@/utils/getDeadline";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { motion } from "framer-motion";
import {
  getAllExerciseInClass,
  getAllPostInClass,
} from "@/redux/reducer/classroom/api";
import { useLanguageContext } from "@/contexts/languageContext";

function CriticalTasks() {
  const { t } = useLanguageContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [exRenew, setExRenew] = useState<IExerciseObject>(INITIATE_EXERCISE);
  const [postRenew, setPostRenew] = useState<IPostObject>(INITIATE_POST);
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
    setOpenModalEx(!openModalEx);
    setExRenew(task);
  };
  // POST
  const [openModalPost, setOpenModalPost] = useState<boolean>(false);
  const modalClassPost = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalPost,
  });
  const handleOpenPostModal = (task: IPostObject) => {
    setOpenModalPost(!openModalPost);
    setPostRenew(task);
  };
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUserContext();
  const { authClassroomState } = useClassroomStateContext();
  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["exercises", authClassroomState],
    queryFn: async () => {
      if (authClassroomState) {
        const action = await dispatch(
          getAllExerciseInClass(authClassroomState)
        );
        return action.payload || [];
      }
    },
    initialData: [],
  });
  const { data: posts } = useQuery<IExerciseObject[]>({
    queryKey: ["posts", authClassroomState],
    queryFn: async () => {
      if (authClassroomState) {
        const action = await dispatch(getAllPostInClass(authClassroomState));
        return action.payload || [];
      }
    },
    initialData: [],
  });

  const { data: submission } = useQuery<ISubmitObject[]>({
    queryKey: ["clasroom-submissions", currentUser],
    queryFn: async () => {
      const action = await dispatch(getAllSubmitStud(currentUser));
      return action.payload || [];
    },
    initialData: [],
  });

  const checkCriticalTask = (
    ex: IExerciseObject[],
    submits: ISubmitObject[]
  ) => {
    return ex?.filter(
      (item) =>
        !submits.some(
          (sub) => sub.exerciseID === item.id && sub.userID === currentUser.id
        )
    );
  };
  useEffect(() => {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Breadcrumb dataBreadcrumb={BREADCRUMB_CRITICAL_TASKS} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                {t.task_item_1}
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
                {exercises.length > 0 &&
                  checkCriticalTask(exercises, submission)?.map((ex, index) => (
                    <ExerciseCard
                      handleOpenTaskModal={handleOpenExModal}
                      key={ex.id}
                      exercise={ex}
                      index={index}
                    />
                  ))}
                {posts.length > 0 &&
                  posts?.map((post, index) => (
                    <PostReportCard
                      handleOpenTaskModal={handleOpenPostModal}
                      key={post.id}
                      post={post}
                    />
                  ))}
                {posts.length === 0 && exercises.length === 0 && (
                  <div className="h-60 flex flex-col justify-center items-center p-5 mt-5">
                    <Image
                      src="https://yi-files.s3.eu-west-1.amazonaws.com/products/794000/794104/1354385-full.jpg"
                      width="200"
                      height="200"
                      className="-hue-rotate-[38deg] saturate-[.85]"
                      alt=""
                    />
                    <p className="text-lg text-gray-400">
                      Ops! We do not have exercise or post for you today
                    </p>
                  </div>
                )}
              </div>
              <div className="w-4/12">
                {exercises.length > 0 &&
                getExerciseWithNearestDeadline(exercises) ? (
                  <CriticalTask
                    submission={submission}
                    exercise={getExerciseWithNearestDeadline(exercises)}
                  />
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
              exercise={exRenew}
              setOpenModalEx={setOpenModalEx}
              openModalEx={openModalEx}
            />
            <PostModal
              modalClass={modalClassPost}
              post={postRenew}
              setOpenModalPost={setOpenModalPost}
              openModalPost={openModalPost}
            />
          </motion.div>
        )}
      </MainboardTemplate>
    </>
  );
}

export default CriticalTasks;
