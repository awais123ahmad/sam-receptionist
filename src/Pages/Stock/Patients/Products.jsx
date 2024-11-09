import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../Components/PaginationComponent";
import { fetchProducts } from "../../../Api/Reducers/StockReducers/product";
import { useDispatch, useSelector } from "react-redux";

const data = [
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
  { id: 1, name: "john doe", email: "johndoe@gmail.com", role: "user" },
];

const Products = () => {
  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [editCancel, setEditCancel] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [nodata, setNodata] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // const products = useSelector((state) => state.products.data);
  // const loading = useSelector((state) => state.products.loading);


  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);

  // useEffect(() => {
  //   if (products?.length === 0) {
  //     setNodata(true);
  //   } else {
  //     setNodata(false);
  //   }
  // }, [products]);

  // useEffect(() => {
  //   if (products) {
  //     const filteredResult = products?.filter(
  //       (item) =>
  //         (item.account_name &&
  //           item.account_name
  //             .toLowerCase()
  //             .includes(searchData.toLowerCase()))
  //     );
  //     setFilteredData(filteredResult);
  //     setCurrentPage(1);
  //   }
  // }, [searchData, products]);

  // useEffect(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   setPaginatedData(filteredData.slice(startIndex, endIndex));
  // }, [currentPage, filteredData]);

  // const handleCreate = () => {
  //   if (currentId !== null) {
  //     setEditCancel(true);
  //   } else {
  //     setEditCancel(false);
  //   }
  //   setCurrentId(null);
  //   setOpen((p) => !p);
  // };

  // const handlePageChange = (event, newPage) => {
  //   setCurrentPage(newPage);
  // };

  // const theme = createTheme({
  //   palette: { primary: { main: "#E5E7EB", contrastText: "#00000" } },
  // });

  // const handleEdit = (id) => {
  //   setOpen((p) => !p);
  //   setCurrentId(id);
  // };
  return (
    <div>
      <div className="p-4">
        <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]  ">Patients Table</h1>
        <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">
          {/* ({filteredData?.length}) records found */}
          20 records found
        </h1>
        <div className="flex mt-8 flex-row-reverse justify-between px-[3%]">
          <Link to='AddEdit'>
            <button

              className="!bg-[#232233] !h-[2rem] !px-4 !rounded-md !text-white !font-[600] !text-[14px] !normal-case" 
            >
              + Enter Patient
            </button>
          </Link>
          <div className="w-[40%]">
            <input
              type="search"
              placeholder="Search Here..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              id=""
              className="block w-[90%] pl-10  text-gray-900  p-2  rounded-md  border-gray-800  bg-white focus:outline-none"
            />
            <SearchIcon className="mt-[-4rem] text-gray-700 ml-2" />
          </div>
        </div>
        <div className="mx-[3%]  ">
          <table className="w-[100%] ">
            <thead className="">
              <tr className=" text-[#101418] capitalize leading-normal w-[100%] ">
                <th className="py-[1%] w-[35%] text-[.8rem] text-gray-700   text-left pl-4">
                  Patient Name
                  <Tooltip title="Change Order" placement="bottom">
                    {/* <span
                                  onClick={() => toggleSortOrder()}
                                  className="ml-2 cursor-pointer"
                                >
                                  <ImportExportIcon sx={{ fontSize: 17 }} />
                                </span> */}
                  </Tooltip>
                </th>
                <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700   text-left">
                  Contact Number
                </th>
                <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700   text-center">
                  Gender
                </th>
                <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700   text-center">
                  Address
                </th>
                <th className="py-[1%] w-[10%] text-[.8rem] text-gray-700   text-center">
                  Action
                </th>
              </tr>
            </thead>
            {paginatedData.map((value, index) => (
              <tbody className="text-gray-600 text-sm font-light w-[100%] border-t-[1px] border-gray-200">
                <tr className={` bg-white  `}>
                  <td className="py-[1%] w-[35%] max-md:text-[.7rem] text-left pl-4">
                      <p className="font-[600] text-gray-600 text-[14px]">
                        Bakra
                      </p>
                      <p className="font-[400] text-gray-500 text-[13px]">
                        bakra@gmail.com
                      </p>
                  </td>

                  <td className=" w-[20%] max-md:text-[.7rem] text-left">
                    <p className="font-[600] text-gray-600 text-[14px]">role</p>
                    <p className="font-[400] text-gray-500 text-[13px]">
                      Software
                    </p>
                  </td>
                  <td className="py-[2%] px-2 w-[15%] max-md:text-[.7rem] text-center">
                  <span className="font-[400] ">4400</span>
                    {/* <Tooltip title="Change Status" placement="top">
                      <div className="font-[400] px-2 rounded-md  hover:text-gray-800 flex items-center gap-2 justify-center">
                        <span className="border-2 border-green-600 rounded-full p-[2px] "></span>
                        <span>Active</span>
                      </div>
                    </Tooltip> */}
                  </td>
                  <td className="py-[2%] px-2 w-[20%] max-md:text-[.7rem] text-center">
                    <span className="font-[400] ">14/25/2024</span>
                  </td>

                  <td className="py-[2%] w-[10%] ">
                    {/* <FiEdit3
                                    onClick={() => handleEdit(value._id)}
                                    className="text-[1.2rem] text-blue-700 cursor-pointer"
                                  /> */}
                    <p
                      //   onClick={() => handleEdit(value?._id)}
                      className="text-center text-[13px] font-[500] text-gray-600"
                    >
                      Edit
                    </p>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <PaginationComponent
          data={data}
          searchData={searchData}
          setPaginatedData={setPaginatedData}
          setFilteredData={setFilteredData}
          filteredData={filteredData}
        />
      </div>
    </div>
  );
};

export default Products;
