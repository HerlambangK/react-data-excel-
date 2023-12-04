"use client";
import { useEffect, useState } from "react";
const Home: React.FC = () => {
  // const [webList, setWebList] = useState<Array<{ name: string; url: string }>>(
  //   []
  // );
  const [webList, setWebList] = useState<Array<{ name: string; url: string }>>(
    []
  );

  // async function getExcelData() {
  //   try {
  //     const response = await fetch("/api/getExcelData");
  //     console.log("response", response);
  //     const data = await response.json();
  //     console.log("data", data.data);

  //     console.log("array", data && typeof data === "object");
  //     // if (data && typeof data === "object") {
  //     //   const extractedData = Object.values(data).map((item: any) => {
  //     //     console.log("item", item); // Log the item to check its structure
  //     //     return {
  //     //       name: item && item["Nama"] !== undefined ? item["Nama"] : "",
  //     //       url:
  //     //         item && item["Nama Website"] !== undefined
  //     //           ? item["Nama Website"]
  //     //           : "",
  //     //     };
  //     //   });
  //     //   console.log("extractedData", extractedData);

  //     //   setWebList(extractedData);
  //     // } else {
  //     //   console.error(
  //     //     "Invalid data format. Expected an object with numeric keys."
  //     //   );
  //     // }

  //     setWebList(data.data);
  //   } catch (error) {
  //     console.error("Error fetching Excel data:", error);
  //     // Handle the error as needed
  //   }
  // }

  // useEffect(() => {
  //   getExcelData();
  // }, []);

  async function getExcelData() {
    try {
      const response = await fetch("/api/getExcelData");
      const data = await response.json();
      console.log("object");
      setWebList(data.data);
    } catch (error) {
      console.error("Error fetching Excel data:", error);
      // Handle the error as needed
    }
  }

  useEffect(() => {
    getExcelData();
  }, []);
  return (
    <div>
      <button onClick={getExcelData}>Refresh Data</button>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>URL</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {webList.map((web, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <a href={web.url} target="_blank" rel="noopener noreferrer">
                  {web.url}
                </a>
              </td>
              <td>{web.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
