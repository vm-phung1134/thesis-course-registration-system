import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { DATA_CARD_COURSE } from "../../components/Molecules/CardCourse/mock-data";
import { CardCourse } from "@/components/Molecules";
import { Breadcrumb, SelectBox, Spinner } from "@/components/Atoms";
import {
  BREADCRUMB_MAINBOARD,
  DATA_FILTER_COURSE,
  DATA_FILTER_TOPICS,
} from "./mock-data";
import { IOptionItem } from "@/interface/filter";
import { ICategoryObject } from "@/interface/category";

function MainboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
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
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainboardTemplate title="Mainboard Thesis | Thesis course registration system">
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
              return <CardCourse key={item.id} item={item} />;
            })}
          </div>
        </MainboardTemplate>
      )}
    </>
  );
}

export default MainboardPage;
