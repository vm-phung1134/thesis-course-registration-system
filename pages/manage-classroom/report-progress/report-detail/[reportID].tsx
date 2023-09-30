import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, SnipperRound, Spinner } from "@/components/Atoms";
import { BREADCRUMB_REPORT_DETAIL_PAGE } from "./mock-data";
import {
  ExerciseCard,
  PostReportCard,
  TargetTable,
} from "@/components/Molecules";
import { useQuery } from "@tanstack/react-query";
import { IPostObject } from "@/interface/post";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAllPostInReportStage, getPost } from "@/redux/reducer/post/api";
import { useSearchParams } from "next/navigation";
import {
  getAllExerciseInReportStage,
  getExercise,
} from "@/redux/reducer/exercise/api";
import { IExerciseObject } from "@/interface/exercise";
import { ExerciseModal, PostModal } from "@/components/Organisms";
import classNames from "classnames";
import { useClassroomStateContext } from "@/contexts/authClassroomState";

function ReportStageDetailPage() {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const id = params.get("reportID");
  const { authClassroomState } = useClassroomStateContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { data: posts } = useQuery<IPostObject[]>({
    queryKey: [
      "posts",
      authClassroomState?.classroom?.id || authClassroomState?.id,
      id,
    ],
    queryFn: async () => {
      const action = await dispatch(
        getAllPostInReportStage({
          classroomId:
            authClassroomState?.classroom?.id || authClassroomState?.id,
          categoryId: id,
        })
      );
      return action.payload || [];
    },
    initialData: [],
  });

  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: [
      "exercises",
      authClassroomState?.classroom?.id || authClassroomState?.id,
      id,
    ],
    queryFn: async () => {
      const action = await dispatch(
        getAllExerciseInReportStage({
          classroomId:
            authClassroomState?.classroom?.id || authClassroomState?.id,
          categoryId: id,
        })
      );
      return action.payload || [];
    },
    initialData: [],
  });
  // HANLE OPEN POST/EXERCISE MODAL
  const { post } = useAppSelector((state) => state.postReducer);
  const { exercise } = useAppSelector((state) => state.exerciseReducer);
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
    dispatch(getPost(task));
  };

  const handleOpenExModal = (task: IExerciseObject) => {
    setOpenModalEx?.(!openModalEx);
    dispatch(getExercise(task));
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
                <h4 className="uppercase text-green-700 font-medium py-2">
                  post and expercise for this phase
                </h4>
                {posts?.map((post, index) => (
                  <PostReportCard
                    handleOpenTaskModal={handleOpenPostModal}
                    key={post.id}
                    post={post}
                  />
                ))}
                {exercises?.map((ex, index) => (
                  <ExerciseCard
                    handleOpenTaskModal={handleOpenExModal}
                    key={ex.id}
                    exercise={ex}
                  />
                ))}
              </div>
              <div className="col-span-4">
                <TargetTable namePhase="Requirement gathering">
                  <svg
                    className="w-10 h-10 text-green-700 sm:w-20 sm:h-20"
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
      </MainboardTemplate>
    </>
  );
}
export default ReportStageDetailPage;
