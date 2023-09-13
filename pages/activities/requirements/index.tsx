import { Breadcrumb } from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import { BREADCRUMB_REQUIREMENT } from "./mock-data";
import { DATA_CARD_STUDENT } from "@/pages/manage-classroom/members/mock-data";
import { CardRequireMember } from "@/components/Molecules";
import { useState } from "react";
import classNames from "classnames";
import { InforMemberModal } from "@/components/Organisms";

function RequirementPage() {
  const [openModalMemberDetail, setOpenModalMemberDetail] =
    useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalMemberDetail,
  });
  return (
    <MainboardTemplate title="Requirements | Thesis manage registration">
      <Breadcrumb dataBreadcrumb={BREADCRUMB_REQUIREMENT} />
      <div>
        <h4 className="uppercase text-green-700 font-medium mt-5 py-2">
          List requirements
        </h4>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {DATA_CARD_STUDENT.map((student) => {
            return (
              <CardRequireMember
                setOpenMemberModal={setOpenModalMemberDetail}
                openMemberModal={openModalMemberDetail}
                key={student.id}
                student={student}
              />
            );
          })}
        </div>
      </div>

      <InforMemberModal
        member={DATA_CARD_STUDENT[1]}
        modalClass={modalClass}
        setOpenMemberModal={setOpenModalMemberDetail}
        openMemberModal={openModalMemberDetail}
      />
    </MainboardTemplate>
  );
}

export default RequirementPage;
