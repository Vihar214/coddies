import React, { useState, useEffect } from "react";

const C_index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/cdata");
    const jsonData = await response.json();
    setData(jsonData);
    console.log(jsonData);
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="mx-auto mt-6 text-3xl font-bold text-blue-800">C</h1>
      </div>
      <ul>
        {data.map((item) => (
          <li
            key={item.P_Id}
            className="mx-auto m-6 flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-6xl bg-gray-100 hover:bg-gray-200"
          >
            <h5 className="w-10 ml-2 mb-2 text-2xl font-bold text-center tracking-tight text-gray-600">
              {item.P_Id}
            </h5>
            <div className="w-10/12 flex flex-col justify-between p-4 leading-normal">
              <p className="mb-3 font-normal text-gray-500">
                {item.P_Defination}
              </p>
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <p className="mb-3 font-normal text-gray-500">{item.P_Type}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default C_index;
