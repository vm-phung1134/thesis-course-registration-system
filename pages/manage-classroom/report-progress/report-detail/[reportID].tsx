import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, SnipperRound } from "@/components/Atoms";
import { BREADCRUMB_REPORT_DETAIL_PAGE } from "./mock-data";
import {
  ExerciseCard,
  PostReportCard,
  TargetTable,
} from "@/components/Molecules";
import { useQuery } from "@tanstack/react-query";
import { IPostObject } from "@/interface/post";
import { useAppDispatch } from "@/redux/store";
import { getAllPostInReportStage } from "@/redux/reducer/post/api";
import { useSearchParams } from "next/navigation";
import { getAllExerciseInReportStage } from "@/redux/reducer/exercise/api";
import { IExerciseObject } from "@/interface/exercise";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import classNames from "classnames";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { getReportStage } from "@/redux/reducer/report-stage/api";
import { ICategoryObject } from "@/interface/category";
import { INITIATE_CATEGORY, INITIATE_EXERCISE, INITIATE_POST } from "@/data";

function ReportStageDetailPage() {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const id = params.get("reportID");
  const { authClassroomState } = useClassroomStateContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { data: posts } = useQuery<IPostObject[]>({
    queryKey: ["classroom-posts", authClassroomState, id],
    queryFn: async () => {
      const action = await dispatch(
        getAllPostInReportStage({
          classroomId: authClassroomState?.id || "",
          categoryId: id || "",
        })
      );
      return action.payload || [];
    },
    initialData: [],
  });

  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["classroom-exercises", authClassroomState?.id, id],
    queryFn: async () => {
      const action = await dispatch(
        getAllExerciseInReportStage({
          classroomId: authClassroomState?.id || "",
          categoryId: id || "",
        })
      );
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: category } = useQuery<ICategoryObject>({
    queryKey: ["get-one-category"],
    queryFn: async () => {
      const action = await dispatch(getReportStage(id || ""));
      return action.payload || {};
    },
    initialData: INITIATE_CATEGORY,
  });
  // HANLE OPEN POST/EXERCISE MODAL
  const [exRenew, setExRenew] = useState<IExerciseObject>(INITIATE_EXERCISE);
  const [exPost, setExPost] = useState<IPostObject>(INITIATE_POST);
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
  const handleOpenPostModal = (task: IPostObject) => {
    setOpenModalPost?.(!openModalPost);
    setExPost(task);
  };

  const handleOpenExModal = (task: IExerciseObject) => {
    setOpenModalEx?.(!openModalEx);
    setExRenew(task);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      <MainboardTemplate title="Mainboard Thesis | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_REPORT_DETAIL_PAGE} />
            <div className="grid grid-cols-12 gap-5 mt-5">
              <div className="col-span-8">
                <div className="my-3 py-2 flex gap-2 items-center">
                  <h4 className="text-xl capitalize text-green-700 font-medium ">
                    post and expercise for
                    <span className="text-orange-600"> {category?.label}</span>
                  </h4>
                  <div className="flex-grow h-[0.5px] bg-green-700"></div>
                </div>
                {posts?.map((post, index) => (
                  <PostReportCard
                    handleOpenTaskModal={handleOpenPostModal}
                    key={post.id}
                    post={post}
                  />
                ))}
                {exercises?.map((ex, index) => (
                  <ExerciseCard
                    index={index}
                    handleOpenTaskModal={handleOpenExModal}
                    key={ex.id}
                    exercise={ex}
                  />
                ))}
              </div>
              <div className="col-span-4">
                <TargetTable namePhase={category?.label}>
                  <svg
                    className="w-8 h-8 text-green-700"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </TargetTable>
              </div>
            </div>
          </>
        )}
        <PostModal
          modalClass={modalClassPost}
          post={exPost}
          setOpenModalPost={setOpenModalPost}
          openModalPost={openModalPost}
        />
        <ExerciseModal
          modalClass={modalClassEx}
          exercise={exRenew}
          setOpenModalEx={setOpenModalEx}
          openModalEx={openModalEx}
        />
      </MainboardTemplate>
    </>
  );
}
export default ReportStageDetailPage;
