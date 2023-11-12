import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  SelectBox,
  SnipperRound,
} from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import { BREADCRUMB_REQUIREMENT } from "./mock-data";
import { CardRequireMember, FilterScheduledForm } from "@/components/Molecules";
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
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import {
  DATA_FILTER_COURSE,
  DATA_FILTER_TOPICS,
} from "@/components/Organisms/MainboardStatus/mock-data";
import { useTableSearch } from "@/hooks/useTableSearch";

function RequirementPage() {
  const { currentUser } = useCurrentUser();
  const [filterCourse, setFilterCourse] = useState<
    IOptionItem | ICategoryObject
  >({
    label: "Filter course",
    value: "",
  });
  const [filterTopic, setFilterTopic] = useState<IOptionItem | ICategoryObject>(
    {
      label: "Filter Topic",
      value: "",
    }
  );
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

  const {
    filteredData: require_filteredData,
    handleSearch: require_handleSearch,
  } = useTableSearch(requirements);

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
      {loading ? (
        <SnipperRound />
      ) : (
        <div>
          <Breadcrumb dataBreadcrumb={BREADCRUMB_REQUIREMENT} />
          <div>
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Queue for <span className="text-orange-600"> requests</span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="mt-3 flex gap-3 w-1/3">
                <div className="flex-grow">
                  <SelectBox
                    setSelected={setFilterCourse}
                    selected={filterCourse}
                    options={DATA_FILTER_COURSE}
                    setPadding="lg"
                  />
                </div>
                <div className="flex-grow">
                  <SelectBox
                    setSelected={setFilterTopic}
                    selected={filterTopic}
                    options={DATA_FILTER_TOPICS}
                    setPadding="lg"
                  />
                </div>
              </div>
              <FilterScheduledForm
                handleSearch={require_handleSearch}
                holderText="Search requirement ..."
              />
            </div>
            {require_filteredData?.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {requirements?.map((listRequirement, index) => {
                  return (
                    <CardRequireMember
                      index={index}
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
