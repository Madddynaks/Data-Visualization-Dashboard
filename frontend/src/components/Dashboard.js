import React, { useEffect, useState } from "react";
import { fetchData } from "../api";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import Heatmap from "../charts/Heatmap";
import DataTable from "../Tables/Table";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };
    getData();
  }, []);

  return (
    <div className="flex gap-10 p-20">
      <div className="w-1/2">
        <div className="grid grid-cols-2 gap-10">
          <div className="bg-[#7367F0] text-white rounded-xl  cursor-pointer shadow-2xl shadow-gray-900 p-5">
            {/* <h1 className="text-center text-3xl font-bold">Bar Chart</h1> */}
            <div className="flex justify-center items-center">
              {data.length > 0 && <BarChart data={data} />}
            </div>
          </div>
          <div className="bg-blue-50 text-black rounded-xl  cursor-pointer shadow-2xl shadow-gray-300 p-5">
            {/* <h1 className="text-center text-3xl font-bold">Line Chart</h1> */}
            <div className="flex justify-center items-center">
              {data.length > 0 && <LineChart data={data} />}
            </div>
          </div>
          <div className="bg-blue-50 text-black rounded-xl  cursor-pointer shadow-2xl shadow-gray-300 p-5">
            {/* <h1 className="text-center text-3xl font-bold">Heat Map</h1> */}
            <div className="flex justify-center items-center">
              {data.length > 0 && <Heatmap data={data} />}
            </div>
          </div>
          <div className="bg-[#7367F0] text-white rounded-xl  cursor-pointer shadow-2xl shadow-gray-900 p-5">
            {/* <h1 className="text-center text-3xl font-bold">Pie Chart</h1> */}
            <div className="flex justify-center items-center">
              {data.length > 0 && <PieChart data={data} />}
            </div>
          </div>
          
        </div>
      </div>
      <div className="w-1/2  rounded-xl">
        {data.length > 0 && <DataTable data={data} />}
      </div>
    </div>
  );
};

export default Dashboard;
