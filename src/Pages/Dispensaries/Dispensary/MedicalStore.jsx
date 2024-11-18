// import React, { useEffect, useState } from "react";
// import { Tooltip } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { Link } from "react-router-dom";
// import PaginationComponent from "../../../Components/PaginationComponent";
// import toast from 'react-hot-toast';
// import recordService from "../../../Services/recordService";

// const MedicalStore = () => {
//   const [searchData, setSearchData] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [paginatedData, setPaginatedData] = useState([]);
//   const itemsPerPage = 10;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const getMedicalRecords = async () => {
//       try {
//         setLoading(true);
//         const response = await recordService.fetchAll();
//         console.log(response); // Log the response to confirm the structure
//         setRecords(response.medicalRecords); // Access the patients array within response
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         toast.error('Error fetching Patients');
//       }
//     };
//     getMedicalRecords();
//   }, []);
  

//   useEffect(() => {
//     const filteredResult = records?.filter(
//       (item) =>
//         item?.treatment?.toLowerCase().includes(searchData.toLowerCase())
//     ) || [];
//     setFilteredData(filteredResult);
//     setCurrentPage(1);
//   }, [searchData, records]);

//   useEffect(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     setPaginatedData(filteredData?.slice(startIndex, endIndex) || []);
//   }, [currentPage, filteredData]);

//   return (
//     <div>
//       <div className="p-4">
//         <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]">Medical Records Table</h1>
//         <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">{filteredData?.length || 0} records found</h1>
        
//         <div className="flex mt-8 flex-row-reverse justify-between px-[3%]">
//           {/* <Link to='AddEdit'> */}
//             <button className="bg-[#232233] h-[2rem] px-4 rounded-md text-white font-[600] text-[14px]">
//               + Add Medicine
//             </button>
//           {/* </Link> */}
//           <div className="w-[40%]">
//             <input
//               type="search"
//               placeholder="Search Here..."
//               value={searchData}
//               onChange={(e) => setSearchData(e.target.value)}
//               className="block w-[90%] pl-10 text-gray-900 p-2 rounded-md border-gray-800 bg-white focus:outline-none"
//             />
//             <SearchIcon className="mt-[-4rem] text-gray-700 ml-2" />
//           </div>
//         </div>

//         <div className="mx-[3%]">
//           <table className="w-[100%]">
//             <thead>
//               <tr className="text-[#101418] capitalize leading-normal">
//               <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700 text-left pl-4">Patient Id</th>
//                 <th className="py-[1%] w-[25%] text-[.8rem] text-gray-700 text-left pl-4">Record Date</th>
//                 <th className="py-[1%] w-[25%] text-[.8rem] text-gray-700 text-left">Treatment</th>
//                 <th className="py-[1%] w-[25%] text-[.8rem] text-gray-700 text-left">Prescribed Medications</th>
//                 <th className="py-[1%] w-[10%] text-[.8rem] text-gray-700 text-left">Action</th>
            
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData?.map((patient) => (
//                 <tr key={patient?.patient_id} className="bg-white text-gray-600 text-sm font-light border-t-[1px] border-gray-200">
//                   <td className="py-[1%] w-[15%] text-left pl-4">
//                     <p className="font-[600] text-gray-600 text-[14px]">{patient?.patient_id}</p>
//                   </td>
//                   <td className="w-[25%] text-left">
//                     <p className="font-[600] text-gray-600 text-[14px]">{patient?.record_date}</p>
//                   </td>
//                   <td className="py-[2%] px-2 w-[25%] text-left">
//                     <span className="font-[400]">{patient?.treatment}</span>
//                   </td>
//                   <td className="py-[2%] px-2 w-[25%] text-left">
//                     <span className="font-[400]">{patient?.prescribed_medications}</span>
//                   </td>
//                   <td className="py-[2%] w-[10%] text-left">
//                     <p className="text-[13px] font-[500] text-gray-600">Edit</p>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <PaginationComponent
//           data={filteredData}
//           setPaginatedData={setPaginatedData}
//           itemsPerPage={itemsPerPage}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default MedicalStore;

import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../Components/PaginationComponent";
import toast from 'react-hot-toast';
import recordService from "../../../Services/recordService";

const MedicalStore = () => {
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMedicalRecords = async () => {
      try {
        setLoading(true);
        const response = await recordService.fetchAll();
        console.log(response); // Log the response to confirm the structure
        setRecords(response.medicalRecords); // Access the patients array within response
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Error fetching Patients');
      }
    };
    getMedicalRecords();
  }, []);
  

  useEffect(() => {
    const filteredResult = records?.filter(
      (item) =>
        item?.treatment?.toLowerCase().includes(searchData.toLowerCase())
    ) || [];
    setFilteredData(filteredResult);
    setCurrentPage(1);
  }, [searchData, records]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData?.slice(startIndex, endIndex) || []);
  }, [currentPage, filteredData]);

  return (
    <div>
      <div className="p-4">
        <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]">Medical Records Table</h1>
        <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">{filteredData?.length || 0} records found</h1>
        
        <div className="flex mt-8 flex-row-reverse justify-between px-[3%]">
          <Link to='AddEditMedical'>
            <button className="bg-[#232233] h-[2rem] px-4 rounded-md text-white font-[600] text-[14px]">
              + Add Medicine
            </button>
          </Link>
          <div className="w-[40%]">
            <input
              type="search"
              placeholder="Search Here..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="block w-[90%] pl-10 text-gray-900 p-2 rounded-md border-gray-800 bg-white focus:outline-none"
            />
            <SearchIcon className="mt-[-4rem] text-gray-700 ml-2" />
          </div>
        </div>

        <div className="mx-[3%]">
          <table className="w-[100%]">
            <thead>
              <tr className="text-[#101418] capitalize leading-normal">
              <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700 text-left pl-4">Patient Id</th>
                <th className="py-[1%] w-[25%] text-[.8rem] text-gray-700 text-left pl-4">Record Date</th>
                <th className="py-[1%] w-[25%] text-[.8rem] text-gray-700 text-left">Treatment</th>
                <th className="py-[1%] w-[25%] text-[.8rem] text-gray-700 text-left">Prescribed Medications</th>
                <th className="py-[1%] w-[10%] text-[.8rem] text-gray-700 text-left">Action</th>
            
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((patient) => (
                <tr key={patient?.patient_id} className="bg-white text-gray-600 text-sm font-light border-t-[1px] border-gray-200">
                  <td className="py-[1%] w-[15%] text-left pl-4">
                    <p className="font-[600] text-gray-600 text-[14px]">{patient?.patient_id}</p>
                  </td>
                  <td className="w-[25%] text-left">
                    <p className="font-[600] text-gray-600 text-[14px]">{patient?.record_date}</p>
                  </td>
                  <td className="py-[2%] px-2 w-[25%] text-left">
                    <span className="font-[400]">{patient?.treatment}</span>
                  </td>
                  <td className="py-[2%] px-2 w-[25%] text-left">
                    <span className="font-[400]">{patient?.prescribed_medications}</span>
                  </td>
                  <td className="py-[2%] w-[10%] text-left">
                    <p className="text-[13px] font-[500] text-gray-600">Edit</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationComponent
          data={filteredData}
          setPaginatedData={setPaginatedData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MedicalStore;

