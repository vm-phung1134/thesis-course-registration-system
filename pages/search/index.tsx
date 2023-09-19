import { Breadcrumb } from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import { BREADCRUMB_SEARCH_PAGE } from "./mock-data";
import { DATA_CARD_COURSE } from "@/components/Molecules/ClassroomContentCard/mock-data";
import { CardClassroom } from "@/components/Molecules";

function SearchPage() {
  return (
    <MainboardTemplate title="Search | Thesis course registration system">
      <Breadcrumb dataBreadcrumb={BREADCRUMB_SEARCH_PAGE} />
      <div className="my-5">
        <h4 className="uppercase text-green-700">
          The result match your search key work:{" "}
          <span className="capitalize text-red-700 ml-3">Lam nhut khang</span>
        </h4>
        <div className="mt-3 uppercase w-1/2 text-sm font-medium flex items-center gap-3">
          <p>Classroom</p>
          <div className="flex-grow h-[1px] bg-gray-300"></div>
        </div>
        <div className="flex flex-wrap gap-5 mt-5">
          {DATA_CARD_COURSE.map((item, index) => {
            return <CardClassroom key={item.id} item={item} />;
          })}
        </div>
        <div className="mt-3 uppercase text-sm font-medium flex items-center gap-3 w-1/2">
          <p>Post and Exercise</p>
          <div className="flex-grow h-[1px] bg-gray-300"></div>
        </div>
      </div>
    </MainboardTemplate>
  );
}

export default SearchPage;
