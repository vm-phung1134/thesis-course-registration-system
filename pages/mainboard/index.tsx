import { MainboardTemplate } from "@/components/Templates";
import { DATA_CARD_COURSE } from "../../components/Molecules/CardCourse/mock-data";
import { CardCourse } from "@/components/Molecules";
import { Breadcrumb } from "@/components/Atoms";
import { BREADCRUMB_MAINBOARD } from "./mock-data";

function MainboardPage() {
  return (
    <>
      <MainboardTemplate title="Mainboard Thesis | Thesis course registration system">
        <div className="flex justify-between items-center">
          <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
          <select className="select font-normal select-sm select-bordered rounded-none focus:outline-none max-w-xs">
            <option>Filter topics</option>
            <option>Large Apple</option>
            <option>Large Orange</option>
            <option>Large Tomato</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-5 mt-5">
          {DATA_CARD_COURSE.map((item, index) => {
            return <CardCourse key={item.id} item={item} />;
          })}
        </div>
      </MainboardTemplate>
    </>
  );
}

export default MainboardPage;
