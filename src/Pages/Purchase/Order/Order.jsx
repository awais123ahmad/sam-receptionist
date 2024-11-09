import React, { useEffect, useState } from 'react'
import Loading from '../../../Components/Loading'
import DataNotFound from '../../../Components/DataNotFound'
import ListHead from '../../../Components/ListHead'
import { CircularProgress, Pagination, Stack, ThemeProvider, Tooltip, createTheme } from '@mui/material'
import ImportExportIcon from "@mui/icons-material/ImportExport";
import moment from 'moment'
import { GrEdit } from 'react-icons/gr'
import { MdDeleteOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import DeleteModal from '../../../Components/DeleteModal'
import { fetchCategories } from '../../../Api/Reducers/StockReducers/category'
import AddOrder from './AddOrder'
import { useNavigate } from 'react-router'

const tableItemsPerPage = [5, 10, 30, 50, 100, 'ALL']

const theme = createTheme({
  palette: { primary: { main: "#1F2937", contrastText: "#fff" } },
});

const Order = () => {

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const [status, setStatus] = useState(0)

  const [sortOrder, setSortOrder] = useState("normal");
  const [sortField, setSortField] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();

  const [itemPerPage, setItemPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // <-------------------------Fetching response-------------------------->
  const response = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  useEffect(() => {
    setInitialData(response.categories)
  }, [response.categories])

  useEffect(() => {
    setFilteredData(initialData.filter(category => category.categoryName?.toLowerCase().includes(search.toLowerCase())));
  }, [search, initialData]);

  // <-------------------------Sorting-------------------------->

  const toggleSortOrder = (field) => {
    setSortField(field);
    setSortOrder((prevSortOrder) => (prevSortOrder === "normal" ? "asc" : prevSortOrder === "asc" ? "desc" : "normal"));
  };

  const sortedData = [...filteredData]?.sort((a, b) => {
    if (sortField === "category") {
      return sortOrder === "asc" ? a.categoryName.localeCompare(b.categoryName) : sortOrder === "desc" ? b.categoryName.localeCompare(a.categoryName) : 0;
    } else if (sortField === "date") {
      return sortOrder === "asc" ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  // <-------------------------Pagination-------------------------->
  const itemsPerPage = itemPerPage === 'ALL' ? filteredData.length : itemPerPage;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + parseInt(itemsPerPage);
    setData(sortedData.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, filteredData, sortOrder]);


  // <-------------------------All Handle Functions-------------------------->
  const handleCreate = () => {
    navigate('/purchase/order/add')
  }
  const handleStatus = () => {

  }
  const handleEdit = () => {

  }
  const deleteCategory = (id) => {
    // dispatch(DeleteCategory(id)); Here use Dispatch
    setDeleteOpen(!open);
  };

  const handleDelete = (id) => {
    setDeleteOpen(!deleteOpen);
    setDeleteID(id);
  };


  return (
    <div>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        ID={deleteID}
        deleteFunction={deleteCategory}
      />
      {response.loading ?
        <Loading />
        :
        <>
          {response.noData ?
            <DataNotFound title={"No Order Found"} button={"+ Add Order"} />
            :

            <div className="p-4">
              <ListHead
                title={"Order Table"}
                records={response.categories.length}
                buttonText={"+ Add Order"}
                searchData={search}
                setSearchData={setSearch}
                handleCreate={handleCreate} />

              <div className="mx-[3%]  ">
                <table className="w-[100%] ">
                  <thead className="">
                    <tr className=" text-[#101418] capitalize leading-normal w-[100%] ">
                      <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700 text-left pl-2">Order No.</th>
                      <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700   text-left">
                        Supplier Name
                        <Tooltip title={`Change Order`} placement="bottom">
                          <span onClick={() => toggleSortOrder('category')} className="ml-2 cursor-pointer">
                            <ImportExportIcon sx={{ fontSize: 17 }} />
                          </span>
                        </Tooltip>
                      </th>
                      <th className="py-[1%] w-[17%] text-[.8rem] text-gray-700 text-right">
                        Total Amount
                        <Tooltip title={`Change Order`} placement="bottom">
                          <span onClick={() => toggleSortOrder('date')} className="ml-2 cursor-pointer">
                            <ImportExportIcon sx={{ fontSize: 17 }} />
                          </span>
                        </Tooltip>
                      </th>
                      <th className="py-[1%] w-[17%] text-[.8rem] text-gray-700 text-right">
                        Paid Amount
                        <Tooltip title={`Change Order`} placement="bottom">
                          <span onClick={() => toggleSortOrder('date')} className="ml-2 cursor-pointer">
                            <ImportExportIcon sx={{ fontSize: 17 }} />
                          </span>
                        </Tooltip>
                      </th>
                      <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700 text-center">
                        Date
                      </th>
                      <th className="py-[1%] w-[6%] text-[.8rem] text-gray-700 text-center">Status</th>
                      <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700 text-center">Action</th>
                    </tr>
                  </thead>
                  {data.map((value, index) => (
                    <tbody key={index} className="text-gray-600 text-sm font-light w-[100%] border-t-[1px] border-gray-200">
                      <tr className={` bg-white  `}>
                        <td className="py-[1%] w-[15%] max-md:text-[.7rem] text-left pl-4">
                          <p className="font-[600] text-gray-600 text-[14px]">
                            {index + 1}
                          </p>
                        </td>

                        <td className=" w-[15%] max-md:text-[.7rem] text-left">
                          <p className="font-[600] text-gray-600 text-[14px]">{value.categoryName}</p>
                        </td>
                        <td className=" w-[17%] max-md:text-[.7rem] text-right">
                          <p className="font-[600] text-gray-600 text-[14px]">{value.categoryName}</p>
                        </td>
                        <td className=" w-[17%] max-md:text-[.7rem] text-right">
                          <p className="font-[600] text-gray-600 text-[14px]">{value.categoryName}</p>
                        </td>
                        <td className="py-[2%] px-2 w-[15%] max-md:text-[.7rem] text-center">
                          <span className="font-[400] ">{moment(value.createdAt).format("MMM Do YY")}</span>
                        </td>
                        <td className="py-[2%] px-2 w-[10%] max-md:text-[.7rem] text-center">
                          <Tooltip title="Change Status" placement="top">
                            <div onClick={() => handleStatus(value._id)} className="font-[400] px-2 rounded-md  hover:text-gray-800 flex items-center gap-2 justify-center cursor-pointer">
                              {false ?
                                <CircularProgress color="secondary" size={15} />
                                :
                                <>
                                  <span className={`border-2 ${status === 1 ? 'border-green-600' : 'border-red-600'} rounded-full p-[2px]`}></span>
                                  <span>{status === 1 ? 'Enable' : "Disable"}</span>
                                </>
                              }
                            </div>
                          </Tooltip>
                        </td>
                        <td className="py-[2%] w-[15%] ">
                          <div className="flex item-center justify-center md:gap-3 max-sm:gap-1">
                            <div
                              onClick={() => handleEdit(value?._id)}
                              className="transform hover:text-blue-500 md:bg-blue-600 rounded-full cursor-pointer md:p-2 hover:scale-110"
                            >
                              <GrEdit className="!text-white max-sm:!text-blue-600 max-sm:text-[0.7rem]" />
                            </div>
                            <div
                              onClick={() => handleDelete(value.id)}
                              className="transform  md:bg-red-600 rounded-full cursor-pointer md:p-1 hover:scale-110"
                            >
                              <MdDeleteOutline className="!text-white max-sm:!text-red-600  md:text-[1.3rem] max-sm:text-[0.8rem]" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
                <div className="h-[3rem] w-full px-10 bg-gray-200 flex justify-between items-center" >
                  <ThemeProvider theme={theme}>
                    <Stack direction="row" justifyContent="center">
                      <Pagination
                        count={Math.ceil(filteredData?.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                      />
                    </Stack>
                  </ThemeProvider>
                  <div className="flex items-center gap-5" >
                    <p>1 - {itemPerPage === 'ALL' ? 'ALL' : itemsPerPage}</p>
                    <select className="px-2 !rounded-md  focus:outline-none border-[1px] border-gray-400  cursor-pointer" onChange={(e) => setItemPerPage(e.target.value)} defaultValue={10}>
                      {tableItemsPerPage?.map((val, i) => (
                        <option value={val} key={i} >{val}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}

export default Order
