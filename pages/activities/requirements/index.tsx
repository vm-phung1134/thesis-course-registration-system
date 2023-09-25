import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, SnipperRound } from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import { BREADCRUMB_REQUIREMENT } from "./mock-data";
import { CardRequireMember } from "@/components/Molecules";
import { InforMemberModal } from "@/components/Organisms";
import { IMemberObject } from "@/interface/member";
import { getAllRequirementClassroom } from "@/redux/reducer/requirement/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getTopic } from "@/redux/reducer/topic/api";
import classNames from "classnames";
import { useSubscribeStateContext } from "@/contexts/subscribeState";

function RequirementPage() {
  const [openModalMemberDetail, setOpenModalMemberDetail] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { topic } = useAppSelector((state) => state.topicReducer);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalMemberDetail,
  });
  const dispatch = useAppDispatch();
  const { subscribeState } = useSubscribeStateContext();
  const { data: requirements } = useQuery<IMemberObject[]>({
    queryKey: ["requirements"],
    queryFn: async () => {
      const action = await dispatch(
        getAllRequirementClassroom(subscribeState.classroom)
      );
      return action.payload || [];
    },
    initialData: [],
  });

  const handleGetTopicRequire = (require: IMemberObject) => {
    dispatch(getTopic(require?.member));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);
  return (
    <MainboardTemplate title="Requirements | Thesis manage registration">
      {loading && requirements ? (
        <SnipperRound />
      ) : (
        <div>
          <Breadcrumb dataBreadcrumb={BREADCRUMB_REQUIREMENT} />
          <div>
            <h4 className="uppercase text-green-700 font-medium mt-5 py-2">
              List requirements
            </h4>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {requirements?.map((listRequirement) => {
                return (
                  <CardRequireMember
                    handleGetTopicRequire={handleGetTopicRequire}
                    setOpenMemberModal={setOpenModalMemberDetail}
                    openMemberModal={openModalMemberDetail}
                    key={listRequirement.id}
                    require={listRequirement}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      <InforMemberModal
        topic={topic}
        modalClass={modalClass}
        setOpenMemberModal={setOpenModalMemberDetail}
        openMemberModal={openModalMemberDetail}
      />
    </MainboardTemplate>
  );
}

export default RequirementPage;
