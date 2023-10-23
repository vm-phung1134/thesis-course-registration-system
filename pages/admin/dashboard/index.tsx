import { Button, SnipperRound } from "@/components/Atoms";
import { FilterScheduledForm } from "@/components/Molecules";
import { AdminTemplate } from "@/components/Templates";
import { SetStateAction, useEffect, useState } from "react";
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

function DashBoardPage(this: any) {
  const [loading, setLoading] = useState<boolean>(true);
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
//   const [activeIndex, setActiveIndex] = useState(0);

//   const onPieEnter = (_: any, index: SetStateAction<number>) => {
//     setActiveIndex(index);
//   };
  return (
    <AdminTemplate title="Dashboard | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div>
            <p className="text-sm mt-5">Sunday, March 04, 2023</p>
            <h3 className="font-medium">Good Evening! Zion</h3>
          </div>
          <div className="my-3 py-2 flex gap-2 items-center">
            <h4 className="text-xl capitalize text-green-700 font-medium ">
              overview <span className="text-green-700"></span>
            </h4>
            <div className="flex-grow h-[0.5px] bg-green-700"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col bg-slate-100 rounded-xl p-5 w-72 shadow-lg">
              <div className="flex justify-between mb-3">
                <button className="bg-green-600 text-white rounded-full w-fit">
                  <svg
                    className="w-7 h-7"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </button>
                <button className="text-sm font-medium text-green-700">
                  View Detail
                </button>
              </div>
              <h4 className="font-medium text-orange-600">Total Council</h4>
              <p className="text-xs font-thin">
                Quantiy concil has been establish
              </p>
              <p className="font-bold text-3xl">
                15 <span className="text-sm font-normal">/ Councils</span>
              </p>
            </div>
            <div className="flex flex-col bg-slate-100 rounded-xl p-5 w-72 shadow-lg">
              <div className="flex justify-between mb-3">
                <button className="bg-green-600 text-white rounded-full w-fit">
                  <svg
                    className="w-7 h-7"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </button>
                <button className="text-sm font-medium text-green-700">
                  View Detail
                </button>
              </div>
              <h4 className="font-medium text-orange-600">Total Lecturers</h4>
              <p className="text-xs font-thin">
                Quantiy Lecturers has been establish
              </p>
              <p className="font-bold text-3xl">
                15<span className="text-sm font-normal"> / Lecturers</span>
              </p>
            </div>
            <div className="flex flex-col bg-slate-100 rounded-xl p-5 w-fit shadow-lg">
              <div className="flex justify-between mb-3">
                <button className="bg-green-600 text-white rounded-full w-fit">
                  <svg
                    className="w-7 h-7"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </button>
                <button className="text-sm font-medium text-green-700">
                  View Detail
                </button>
              </div>
              <h4 className="font-medium text-orange-600 capitalize">
                Total student attended defense
              </h4>
              <p className="text-xs font-thin">
                Quantiy concil has been establish
              </p>
              <p className="font-bold text-3xl">
                536 <span className="text-sm font-normal">/ Students</span>
              </p>
            </div>
            <div className="flex flex-col bg-slate-100 rounded-xl p-5 w-fit shadow-lg">
              <div className="flex justify-between mb-3">
                <button className="bg-green-600 text-white rounded-full w-fit">
                  <svg
                    className="w-7 h-7"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </button>
                <button className="text-sm font-medium text-green-700">
                  View Detail
                </button>
              </div>
              <h4 className="font-medium text-orange-600 capitalize">
                Total room attended defense
              </h4>
              <p className="text-xs font-thin">
                Quantiy rooms has been establish
              </p>
              <p className="font-bold text-3xl">
                2 <span className="text-sm font-normal">/ Rooms</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-10 gap-10">
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
            <div className="col-span-1 w-full">
                <BarChart
                  width={550}
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
          </div>

          {/* TABLE */}
          <div className="col-span-2">
            <h4 className="font-medium my-3">Schedule defense</h4>
            <div className="flex justify-between items-start gap-3 mb-2">
              <div className="flex">
                <Button
                  title="Recently date"
                  className="px-5 btn-sm bg-gray-800 text-white rounded-none hover:bg-gray-700"
                />
                <Button
                  title="Ascending order"
                  className="px-5 btn-sm rounded-none"
                />
                <Button title="All" className="px-5 btn-sm rounded-none" />
              </div>
              <FilterScheduledForm holderText="Seach thesis schedule ..." />
            </div>
            <div className="w-full mx-auto rounded-2xl shadow-lg">
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-2xl">
                      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                        <thead className="bg-green-700 dark:bg-gray-700">
                          <tr>
                            <th
                              scope="col"
                              className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                            >
                              Council
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                            >
                              Room
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                            >
                              Q. Member Council
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                            >
                              Q. Student
                            </th>
                            <th scope="col" className="p-4">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          <tr className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700">
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              Council 1
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              Thusday, 16/12/2023
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              DI/101
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              3
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              12
                            </td>
                            <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                              <a
                                href="#"
                                className="text-blue-600 dark:text-blue-500"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
