import { Avatar, Breadcrumb, Button, SnipperRound } from "@/components/Atoms";
import { FilterScheduledForm } from "@/components/Molecules";
import { BREADCRUMB_MAINBOARD } from "@/components/Organisms/MainboardStatus/mock-data";
import { MainboardTemplate } from "@/components/Templates";
import Link from "next/link";
import { useState, useEffect } from "react";

function ScheduleThesisDefensePage() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <MainboardTemplate title="Schedule report | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
          <div>
            <h4 className="uppercase text-green-700 font-medium">
              Thesis defense review schedule
            </h4>
            <div className="flex justify-between mt-5">
              <div className="flex">
                <Button
                  title="Recently date"
                  className="px-5 bg-gray-700 text-white btn-sm"
                />
                <Button title="Ascending order" className="px-5 btn-sm" />
                <Button title="All" className="px-5 btn-sm" />
              </div>
              <div>
                <FilterScheduledForm holderText="Filter schedule time ..." />
              </div>
            </div>
            <div className="mt-8">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-sm font-normal capitalize text-gray-200 bg-green-700">
                    <tr>
                      <th className="px-5 py-2 whitespace-nowrap">
                        <div className="font-normal text-left">Email</div>
                      </th>
                      <th className="px-5 py-2 whitespace-nowrap">
                        <div className="font-normal text-left">
                          Role council
                        </div>
                      </th>
                      <th className="px-5 py-2 whitespace-nowrap">
                        <div className="font-normal text-left">Date</div>
                      </th>
                      <th className="px-5 py-2 whitespace-nowrap">
                        <div className="font-normal text-center">Room</div>
                      </th>
                      <th className="px-5 py-2 whitespace-nowrap">
                        <div className="font-normal text-center">Shift</div>
                      </th>
                      <th className="px-5 py-2 whitespace-nowrap">
                        <div className="font-normal text-center">
                          {`Time ( 24 hours )`}
                        </div>
                      </th>
                      <th className="px-5 py-2 whitespace-nowrap">
                        <div className="font-normal text-end">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <tr className="border-b">
                      <td className="px-5 py-2 whitespace-nowrap">
                        <div className="text-left">lhqbao@ctu.edu.vn</div>
                      </td>
                      <td className="px-5 py-2 whitespace-nowrap">
                        <div className="text-left">GVHD</div>
                      </td>
                      <td className="px-5 py-2 whitespace-nowrap">
                        <div className="text-left">10-12-2023</div>
                      </td>
                      <td className="px-5 py-2 whitespace-nowrap">
                        <div className="text-center">DI/101</div>
                      </td>
                      <td className="px-5 py-2 whitespace-nowrap">
                        <div className="text-center">Morning</div>
                      </td>
                      <td className="px-5 py-2 whitespace-nowrap">
                        <div className="text-center">7:00 - 11:30</div>
                      </td>
                      <td className="px-5 py-2 whitespace-nowrap">
                        <div className="justify-end flex gap-3">
                          <Link href={"/report-schedule/schedule-detail/123"}>
                            <button className="text-sky-700">Join room</button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </MainboardTemplate>
  );
}

export default ScheduleThesisDefensePage;
