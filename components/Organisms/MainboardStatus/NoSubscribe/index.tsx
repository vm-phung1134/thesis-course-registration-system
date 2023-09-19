import { Breadcrumb, SelectBox } from "@/components/Atoms";
import { Pagination } from "@/components/Molecules";
import { DATA_CARD_COURSE } from "@/components/Molecules/ClassroomContentCard/mock-data";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { FC, useState } from "react";
import {
  BREADCRUMB_MAINBOARD,
  DATA_FILTER_COURSE,
  DATA_FILTER_TOPICS,
} from "../mock-data";
import { ClassroomCard } from "../..";

export interface INoSubscribeViewProps {}

export const NoSubscribeView: FC<INoSubscribeViewProps> = ({}) => {
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(10);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <>
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
      <div className="flex flex-wrap gap-5 mt-5">
        {DATA_CARD_COURSE.map((item, index) => {
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
  );
};
