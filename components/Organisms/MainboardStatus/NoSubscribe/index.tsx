import {
  Breadcrumb,
  Button,
  SelectBox,
  SnipperRound,
} from "@/components/Atoms";
import { Pagination } from "@/components/Molecules";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { FC, useState, useEffect } from "react";
import {
  BREADCRUMB_MAINBOARD,
  DATA_FILTER_COURSE,
  DATA_FILTER_TOPICS,
} from "../mock-data";
import { ClassroomCard } from "../..";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { IClassroomObject } from "@/interface/classroom";
import { getAllClassrooms } from "@/redux/reducer/classroom/api";
import Image from "next/image";
import Link from "next/link";

export interface INoSubscribeViewProps {}

export const NoSubscribeView: FC<INoSubscribeViewProps> = () => {
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
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { data, isLoading } = useQuery<IClassroomObject[]>({
    queryKey: ["classrooms"],
    queryFn: async () => {
      const action = await dispatch(getAllClassrooms());
      return action.payload || [];
    },
    initialData: [],
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(10);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);
  return (
    <>
      {loading && data ? (
        <SnipperRound />
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
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
          </div>
          {data.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-5 mt-5">
                {data?.map((item, index) => {
                  return <ClassroomCard key={item.id} item={item} />;
                })}
              </div>
              <div className="flex justify-center mt-10">
                <Pagination
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                  totalPages={totalPages}
                  currentPage={currentPage}
                />
              </div>
            </>
          ) : (
            <div className="h-[80%] w-full flex flex-col justify-center items-center">
              <Image
                src="https://yi-files.s3.eu-west-1.amazonaws.com/products/794000/794104/1354385-full.jpg"
                width="400"
                height="400"
                className="-hue-rotate-[38deg] saturate-[.85]"
                alt=""
              />
              <p className="py-5 text-gray-500 uppercase">
                Ops! There are currently no classrooms
              </p>
              <Link href="/manage-classroom">
                <Button
                  className="px-10 bg-green-700 text-white hover:bg-green-600"
                  title="Comming soon"
                />
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};
