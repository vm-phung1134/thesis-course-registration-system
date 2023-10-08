import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, SnipperRound } from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import { BREADCRUMB_REQUIREMENT } from "./mock-data";
import { CardRequireMember } from "@/components/Molecules";
import { InforMemberModal } from "@/components/Organisms";
import { IMemberObject } from "@/interface/member";
import { getAllRequirementClassroom } from "@/redux/reducer/requirement/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getTopic } from "@/redux/reducer/topic/api";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";

function RequirementPage() {
  const { currentUser } = useCurrentUser();
  const [openModalMemberDetail, setOpenModalMemberDetail] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { topic } = useAppSelector((state) => state.topicReducer);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalMemberDetail,
  });
  // HANDLE CALL API
  const dispatch = useAppDispatch();
  const { data: requirements } = useQuery<IMemberObject[]>({
    queryKey: ["requirements", currentUser],
    queryFn: async () => {
      const action = await dispatch(getAllRequirementClassroom(currentUser));
      return action.payload || [];
    },
    initialData: [],
  });

  const handleGetTopicRequire = (require: IMemberObject) => {
    dispatch(getTopic(require?.member));
  };

  useEffect(() => {
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
            {requirements.length > 0 ? (
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
            ) : (
              <div className="h-[80%] w-full flex flex-col justify-center items-center">
                <Image
                  src="https://yi-files.s3.eu-west-1.amazonaws.com/products/912000/912743/1548296-full.jpg"
                  width="400"
                  height="400"
                  className="-hue-rotate-[38deg] saturate-[.85]"
                  alt=""
                />
                <p className="py-5 text-gray-500 uppercase">
                  Ops! There are currently no requirements
                </p>
                <Link href="/manage-classroom">
                  <Button
                    className="px-10 bg-green-700 text-white hover:bg-green-600"
                    title="Back to classroom"
                  />
                </Link>
              </div>
            )}
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
