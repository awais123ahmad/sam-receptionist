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
import AddExpense from "./AddExpense";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExpense } from "../../../Api/Reducers/AccountReducers/expense";
import  PuffLoader  from 'react-spinners/PuffLoader';
import NoData from "../../../Components/NoData";

const Expense = () => {

  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [editCancel, setEditCancel] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const expense = useSelector((state) => state.expense.data);
  const loading = useSelector((state) => state.expense.loading);
  const nodata = useSelector((state) => state.expense.noData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllExpense());
  }, []);




  useEffect(() => {
    if (expense) {
      const filteredResult = expense?.filter(
        (item) =>
          item._id && item._id.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredData(filteredResult);
      setCurrentPage(1);
    }
  }, [searchData, expense]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData.slice(startIndex, endIndex));
  }, [currentPage, filteredData]);

  const handleCreate = () => {
    if (currentId !== null) {
      setEditCancel(true);
    } else {
      setEditCancel(false);
    }
    setCurrentId(null);
    setOpen((p) => !p);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const theme = createTheme({
    palette: { primary: { main: "#E5E7EB", contrastText: "#00000" } },
  });

  const handleEdit = (id) => {
    setOpen((p) => !p);
    setCurrentId(id);
  };
  return (
    <div>
      <AddExpense
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
        editCancel={editCancel}
        setEditCancel={setEditCancel}
      />
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
                  No Expense Yet
                </h1>
                <center>
                  <Button
                    onClick={() => handleCreate()}
                    className="!bg-[#232233]  !h-[2rem] !px-4 !rounded-md !text-white !font-[600] !text-[14px] !normal-case"
                  >
                  + Add Expense
                  </Button>
                </center>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]  ">
                Expense Table
              </h1>
              <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">
                ({filteredData?.length}) records found
              </h1>
              <div className="flex mt-8 flex-row-reverse justify-between px-[3%]">
                <Button
                  onClick={() => handleCreate()}
                  className="!bg-[#232233]  !h-[2rem] !px-4 !rounded-md !text-white !font-[600] !text-[14px] !normal-case"
                >
                  + Add Expense
                </Button>
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
                        No.
                      </th>
                      <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700   text-left">
                        Expense
                        <Tooltip
                          title="Change Order"
                          placement="bottom"
                        ></Tooltip>
                      </th>
                      <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700   text-center">
                        Amount
                      </th>
                      <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700   text-center">
                        Date
                      </th>
                      <th className="py-[1%] w-[10%] text-[.8rem] text-gray-700   text-center">
                        Mode
                      </th>
                      <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700   text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {paginatedData.map((value, index) => (
                    <tbody
                      key={index}
                      className="text-gray-600 text-sm font-light w-[100%] border-t-[1px] border-gray-200"
                    >
                      <tr className={` bg-white  `}>
                        <td className="py-[1%] w-[20%] max-md:text-[.7rem] text-left pl-4">
                          <p className="font-[600] text-gray-600 text-[14px]">
                            0001
                          </p>
                        </td>

                        <td className=" w-[15%] max-md:text-[.7rem] text-left">
                          <p className="font-[600] text-gray-600 text-[14px]">
                            Plugs
                          </p>
                        </td>
                        <td className="py-[2%] px-2 w-[20%] max-md:text-[.7rem] text-center">
                          <span className="font-[400] ">500$</span>
                        </td>
                        <td className="py-[2%] px-2 w-[20%] max-md:text-[.7rem] text-center">
                          <span className="font-[400] ">14/25/2024</span>
                        </td>
                        <td className="py-[2%] px-2 w-[10%] max-md:text-[.7rem] text-center">
                          <span className="font-[400] ">CASH</span>
                        </td>
                        <td className="py-[2%] w-[15%] ">
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

export default Expense;
