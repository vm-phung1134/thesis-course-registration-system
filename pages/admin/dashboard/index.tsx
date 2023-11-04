import {
  Button,
  IconButton,
  NormalAvatar,
  SnipperRound,
} from "@/components/Atoms";
import { FilterScheduledForm } from "@/components/Molecules";
import { AdminTemplate } from "@/components/Templates";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { useTableSearch } from "@/hooks/useTableSearch";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { IThesisDef } from "@/interface/schedule";
import { getScheduleDef } from "@/redux/reducer/schedule-def/api";
import Image from "next/image";
import { IAuthObject } from "@/interface/auth";
import { getAllLecturers } from "@/redux/reducer/auth/api";
import { IRoomDefObject } from "@/interface/room";
import { getAllRoomDefs } from "@/redux/reducer/room-def/api";
import { IStudentDefObject } from "@/interface/studef";
import { getAllStudentDefs } from "@/redux/reducer/student-def/api";
import { IClassroomObject } from "@/interface/classroom";
import { getAllClassrooms } from "@/redux/reducer/classroom/api";
import { getAllCouncilDefs } from "@/redux/reducer/council-def/api";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";

function DashBoardPage(this: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useCurrentUser();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);
  const data2 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const dispatch = useAppDispatch();
  const { data: scheduled } = useQuery<IThesisDef | null>({
    queryKey: ["scheduled"],
    queryFn: async () => {
      const action = await dispatch(getScheduleDef());
      return action.payload || {};
    },
    initialData: null,
  });
  const {
    filteredData: schedule_filteredData,
    handleSearch: schedule_handleSearch,
  } = useTableSearch(scheduled?.thesis as any);

  const { data: accounts } = useQuery<IAuthObject[]>({
    queryKey: ["accounts"],
    queryFn: async () => {
      const action = await dispatch(getAllLecturers());
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: lecturers } = useQuery<IAuthObject[]>({
    queryKey: ["lecturers"],
    queryFn: async () => {
      const action = await dispatch(getAllLecturers());
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: rooms } = useQuery<IRoomDefObject[]>({
    queryKey: ["room-defs"],
    queryFn: async () => {
      const action = await dispatch(getAllRoomDefs());
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: studefs } = useQuery<IStudentDefObject[]>({
    queryKey: ["studefs"],
    queryFn: async () => {
      const action = await dispatch(getAllStudentDefs());
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: classrooms } = useQuery<IClassroomObject[]>({
    queryKey: ["classrooms"],
    queryFn: async () => {
      const action = await dispatch(getAllClassrooms());
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: councils } = useQuery<IAuthObject[]>({
    queryKey: ["council-defs"],
    queryFn: async () => {
      const action = await dispatch(getAllCouncilDefs());
      return action.payload || [];
    },
    initialData: [],
  });
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  return (
    <AdminTemplate title="Dashboard | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div>
            <p className="text-sm mt-5">{formattedDate}</p>
            <h3 className="font-medium">
              Good Morning!{" "}
              <span className="text-lg pl-2 font-bold">
                {currentUser?.name}
              </span>
            </h3>
          </div>
          <div className="my-3 py-2 flex gap-2 items-center">
            <h4 className="text-xl capitalize text-green-700 font-medium ">
              overview <span className="text-green-700"></span>
            </h4>
            <div className="flex-grow h-[0.5px] bg-green-700"></div>
          </div>
          {/* -------------CLASSROOM MANAGEMENT------------ */}
          <div className="flex justify-between items-center my-1">
            <h4 className="font-medium my-3">Classroom management</h4>
            <Link href={"/admin/classroom-management"}>
              <IconButton
                className="text-sky-600 rounded-none bg-transparent border-none"
                title="Classroom management page"
                srcIcon={
                  "https://cdn-icons-png.flaticon.com/128/556/556690.png"
                }
                classNameIcon={"w-5"}
              />
            </Link>
          </div>
          <div className="flex gap-3 mb-5">
            <div className="flex flex-col bg-slate-50 shadow-md rounded-xl p-4 w-fit">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium text-green-700 capitalize text-sm">
                  Total instructor
                </h4>
                <p className="font-bold text-xl">
                  {accounts?.length}{" "}
                  <span className="text-xs font-medium">/ Lecturer</span>
                </p>
              </div>
              <p className="text-xs font-thin">
                Quantiy of lecturer as instructor in this course
              </p>
            </div>
            <div className="flex flex-col bg-slate-50 shadow-md rounded-xl p-4 w-fit">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium text-green-700 capitalize text-sm">
                  Total account
                </h4>
                <p className="font-bold text-xl">
                  {accounts?.length}{" "}
                  <span className="text-xs font-medium">/ account</span>
                </p>
              </div>
              <p className="text-xs font-thin">
                Quantiy of accounts have been create in this course
              </p>
            </div>
            <div className="flex flex-col bg-slate-50 shadow-md rounded-xl p-4 w-fit">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium text-green-700 capitalize text-sm">
                  Total classroom
                </h4>
                <p className="font-bold text-xl">
                  {classrooms?.length}{" "}
                  <span className="text-xs font-medium ">/ classroom</span>
                </p>
              </div>
              <p className="text-xs font-thin">
                Quantiy of classrooms have been establish in this course
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 my-5">
            <div className="w-full">
              <BarChart
                width={600}
                height={300}
                className="w-full"
                data={data2}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
              </BarChart>
            </div>
            <div>
              <h5 className="font-medium text-sm">
                New account has been created in system
              </h5>
              {accounts?.map(
                (account, index) =>
                  index < 5 && (
                    <div
                      key={account?.id}
                      className="text-[13px] flex justify-between p-3 w-[33rem]"
                    >
                      <div className="flex gap-3 items-center w-60">
                        <NormalAvatar
                          photoSrc={account?.photoSrc}
                          setSize={"w-10"}
                        />
                        <div>
                          <p className="font-bold capitalize">
                            {account?.name}
                          </p>
                          <p>{account?.email}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Role</p>
                        <p>{account?.role ? "Instructor" : "Partaker"}</p>
                      </div>
                      <div>
                        <p className="font-medium">Create At</p>
                        <p>Thurday, 11/4/2023</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
          {/* -------------THESIS COMMITTEE------------ */}
          <div className="flex justify-between items-center my-1">
            <h4 className="font-medium mb-3">Thesis committee</h4>
            <Link href={"/admin/thesis-committee"}>
              <IconButton
                className="text-sky-600 rounded-none bg-transparent border-none"
                title="Thesis committee page"
                srcIcon={
                  "https://cdn-icons-png.flaticon.com/128/556/556690.png"
                }
                classNameIcon={"w-5"}
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1 p-5 bg-slate-50 rounded-xl">
              <LineChart
                width={550}
                height={300}
                data={data2}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
            <div className="flex flex-wrap gap-3 h-fit w-full">
              <div className="flex flex-col bg-slate-100 rounded-xl p-4 w-72 shadow-lg">
                <div className="flex justify-between">
                  <h4 className="font-medium text-green-700 capitalize text-sm">
                    Total lecturer in council
                  </h4>
                  <button className="text-xs font-medium text-green-700">
                    <Image
                      src={
                        "https://cdn-icons-png.flaticon.com/128/1358/1358023.png"
                      }
                      height={15}
                      width={15}
                      alt=""
                    />
                  </button>
                </div>
                <p className="text-xs font-thin">
                  Quantiy lecturer as instructor in thesis committee
                </p>
                <p className="font-bold text-xl text-red-600">
                  {councils?.length}{" "}
                  <span className="text-xs font-medium">/ Member</span>
                </p>
              </div>
              <div className="flex flex-col bg-slate-100 rounded-xl p-4 w-72 shadow-lg">
                <div className="flex justify-between">
                  <h4 className="font-medium text-green-700 capitalize text-sm">
                    Total room in council
                  </h4>
                  <button className="text-xs font-medium text-green-700">
                    <Image
                      src={
                        "https://cdn-icons-png.flaticon.com/128/1358/1358023.png"
                      }
                      height={15}
                      width={15}
                      alt=""
                    />
                  </button>
                </div>
                <p className="text-xs font-thin">
                  Quantiy room thesis defense has been establish
                </p>
                <p className="font-bold text-xl text-red-600">
                  {rooms?.length}{" "}
                  <span className="text-xs font-medium">/ Room</span>
                </p>
              </div>
              <div className="flex flex-col bg-slate-100 rounded-xl p-4 w-72 shadow-lg">
                <div className="flex justify-between">
                  <h4 className="font-medium text-green-700 capitalize text-sm">
                    Total student attended
                  </h4>
                  <button className="text-xs font-medium text-green-700">
                    <Image
                      src={
                        "https://cdn-icons-png.flaticon.com/128/1358/1358023.png"
                      }
                      height={15}
                      width={15}
                      alt=""
                    />
                  </button>
                </div>
                <p className="text-xs font-thin">
                  Quantiy student valid attend thesis defense
                </p>
                <p className="font-bold text-xl text-red-600">
                  {studefs?.length}{" "}
                  <span className="text-xs font-medium">/ Student</span>
                </p>
              </div>
            </div>
          </div>
          {/* TABLE */}
          <div className="col-span-2">
            <div className="mb-3 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Progress scheduled</h4>
                <p className="text-sm text-slate-500">
                  Total {schedule_filteredData.length} schedules
                </p>
              </div>
              <Link href={"/admin/schedule-time-defense"}>
                <IconButton
                  className="text-sky-600 rounded-none bg-transparent border-none"
                  title="Arrange schedule time thesis defense"
                  srcIcon={
                    "https://cdn-icons-png.flaticon.com/128/556/556690.png"
                  }
                  classNameIcon={"w-5"}
                />
              </Link>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <Button
                  title="Recently date"
                  className="px-5 btn-sm bg-gray-800 text-white rounded-none"
                />
                <Button
                  title="Ascending order"
                  className="px-5 btn-sm rounded-none"
                />
                <Button title="All" className="px-5 btn-sm rounded-none" />
              </div>
              <div>
                <FilterScheduledForm
                  handleSearch={schedule_handleSearch}
                  holderText="Filter schedule time ..."
                />
              </div>
            </div>
            <div className="mt-3 min-h-[50vh] w-full">
              <div className="overflow-x-auto border shadow-xl">
                <table className="table-auto w-full">
                  <thead className="text-sm font-medium capitalize text-gray-200 bg-green-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pl-3 text-sm text-start font-medium tracking-wider text-gray-200  dark:text-green-400"
                      >
                        No.
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-left">
                          Name council
                        </div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-left">Room</div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-left">Date</div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-center">
                          Q. member council
                        </div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-center">
                          Q. student defense
                        </div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-center">Create at</div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-end">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <AnimatePresence>
                      {(schedule_filteredData || []).map(
                        (scheduled: any, index: number) =>
                          index < 5 && (
                            <React.Fragment key={index}>
                              <motion.tr
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <td className="px-5 py-2 whitespace-nowrap">
                                  <div className="text-left">
                                    {(index += 1)}
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="text-left">
                                    Council {`${(index += 1)}`}
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="text-left">
                                    {scheduled.schedule.room.name}
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="text-left">
                                    {
                                      scheduled.schedule.timeSlots[0].timeSlot
                                        .date
                                    }
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="text-center">
                                    {scheduled.council.length}
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="text-center">
                                    {
                                      scheduled.schedule.timeSlots.filter(
                                        (item: any) =>
                                          item.student.infor.id !== ""
                                      ).length
                                    }
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="text-center">
                                    Thurday, 27-12-2023
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="justify-end flex gap-3">
                                    <Link
                                      href={`/admin/schedule-time-defense/${scheduled.id}`}
                                    >
                                      <button className="text-blue-500">
                                        View
                                      </button>
                                    </Link>
                                  </div>
                                </td>
                              </motion.tr>
                            </React.Fragment>
                          )
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminTemplate>
  );
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default DashBoardPage;
