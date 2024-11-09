import React, { useEffect, useState } from "react";
import {
  Button,
  Pagination,
  Stack,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../Components/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransaction } from "../../../Api/Reducers/AccountReducers/transaction";
import NoData from "../../../Components/NoData";
import  PuffLoader  from 'react-spinners/PuffLoader';

const Transaction = () => {
  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [editCancel, setEditCancel] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [nodata, setNodata] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const transaction = useSelector((state) => state.transaction.data);
  const loading = useSelector((state) => state.transaction.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTransaction());
  }, []);

  useEffect(() => {
    if (transaction?.length === 0) {
      setNodata(true);
    } else {
      setNodata(false);
    }
  }, [transaction]);

  useEffect(() => {
    if (transaction) {
      const filteredResult = transaction?.filter(
        (item) =>
          (item._id &&
            item._id
              .toLowerCase()
              .includes(searchData.toLowerCase()))
              //  ||
          // (item.account_type &&
          //   item.account_type
          //     .toLowerCase()
          //     .includes(searchData.toLowerCase())) ||
          // (item.account_number &&
          //   item.account_number
          //     .toLowerCase()
          //     .includes(searchData.toLowerCase())) ||
          // (item.account_holder &&
          //   item.account_holder
          //     .toLowerCase()
          //     .includes(searchData.toLowerCase()))
      );
      setFilteredData(filteredResult);
      setCurrentPage(1);
    }
  }, [searchData, transaction]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData.slice(startIndex, endIndex));
  }, [currentPage, filteredData]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const theme = createTheme({
    palette: { primary: { main: "#E5E7EB", contrastText: "#00000" } },
  });

  return (
    <div>
      {loading ? (
        <div>
          <div className="h-[80vh] flex justify-center  items-center">
            <PuffLoader color="#2C71B4" size={90} />
          </div>

        </div>
      ) : (
        <>
          {nodata ? (
            <div className="h-[80vh] flex justify-center items-center">
              <div className=" ">
                <NoData />
              <h1 className="text-center font-[600] mb-4">
                No Transaction Yet 
                              </h1>
             
              </div>
            </div>
          ) : (
      <div className="p-4">
        <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]  ">
          Transaction Table
        </h1>
        <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">
          ({filteredData?.length}) records found
        </h1>
        <div className=" mt-8 px-[3%]">
          {/* <Button
              onClick={() => handleCreate()}
              className="!bg-[#232233]  !h-[2rem] !px-4 !rounded-md !text-white !font-[600] !text-[14px] !normal-case"
            >
              + Add Transaction
            </Button> */}
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
                <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700   text-left pl-4">
                  Date
                </th>
                <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700   text-left">
                  Transaction
                  <Tooltip title="Change Order" placement="bottom"></Tooltip>
                </th>
                <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700   text-left">
                  User
                </th>
                <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700   text-left">
                  Account
                </th>
                <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700   text-left">
                  Mode
                </th>
              </tr>
            </thead>
            {paginatedData.map((value, index) => (
              <tbody className="text-gray-600 text-sm font-light w-[100%] border-t-[1px] border-gray-200">
                <tr className={` bg-white  `}>
                  <td className="py-[1%] w-[20%] max-md:text-[.7rem] text-left pl-4">
                    <p className="font-[600] text-gray-600 text-[14px]">
                      14/25/2024
                    </p>
                  </td>

                  <td className=" w-[20%] max-md:text-[.7rem] text-left">
                    <p className="font-[600] text-gray-600 text-[14px]">400$</p>
                  </td>
                  <td className=" w-[20%] max-md:text-[.7rem] text-left">
                    <p className="font-[400] text-gray-500 text-[13px]">
                      Lateef
                    </p>
                  </td>
                  <td className=" w-[20%] max-md:text-[.7rem] text-left">
                    <p className="font-[600] text-gray-600 text-[14px]">
                      Meezan
                    </p>
                    <p className="font-[400] text-gray-500 text-[13px]">
                      Transfer
                    </p>
                  </td>
                  <td className=" w-[20%] max-md:text-[.7rem] text-left">
                    <p className="font-[600] text-gray-600 text-[14px]">BANK</p>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <ThemeProvider theme={theme}>
          <Stack direction="row" justifyContent="center" marginTop={2}>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </ThemeProvider>
      </div>
   )}
   </>
 )}
    </div>
  );
};

export default Transaction;
