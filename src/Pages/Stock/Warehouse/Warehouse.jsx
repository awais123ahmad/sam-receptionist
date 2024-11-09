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
import { fetchWarehouses } from '../../../Api/Reducers/StockReducers/warehouse'
import AddWarehouse from './AddWarehouse'

const tableItemsPerPage = [5, 10, 30, 50, 100, 'ALL']

const theme = createTheme({
  palette: { primary: { main: "#1F2937", contrastText: "#fff" } },
});

const Warehouse = () => {

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

  // <-------------------------Fetching response-------------------------->
  const response = useSelector((state) => state.warehouse);

  useEffect(() => {
    dispatch(fetchWarehouses())
  }, [])

  useEffect(() => {
    setInitialData(response.warehouses)
  }, [response.warehouses])

  useEffect(() => {
    setFilteredData(initialData.filter(warehouse => warehouse.warehouseName?.toLowerCase().includes(search.toLowerCase())));
  }, [search, initialData]);

  // <-------------------------Sorting-------------------------->

  const toggleSortOrder = (field) => {
    setSortField(field);
    setSortOrder((prevSortOrder) => (prevSortOrder === "normal" ? "asc" : prevSortOrder === "asc" ? "desc" : "normal"));
  };

  const sortedData = [...filteredData]?.sort((a, b) => {
    if (sortField === "warehouse") {
      return sortOrder === "asc" ? a.warehouseName.localeCompare(b.warehouseName) : sortOrder === "desc" ? b.warehouseName.localeCompare(a.warehouseName) : 0;
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
    setOpen(!open)
  }
  const handleStatus = () => {

  }
  const handleEdit = () => {

  }
  const deleteWarehouse = (id) => {
    // dispatch(DeleteWarehouse(id)); Here use Dispatch
    setDeleteOpen(!open);
  };

  const handleDelete = (id) => {
    setDeleteOpen(!deleteOpen);
    setDeleteID(id);
  };


  return (
    <div>
      <AddWarehouse
        open={open}
        setOpen={setOpen}
      // currentId={currentId}
      // setCurrentId={setCurrentId}
      // editCancel={editCancel}
      // setEditCancel={setEditCancel}
      />
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        ID={deleteID}
        deleteFunction={deleteWarehouse}
      />
      {response.loading ?
        <Loading />
        :
        <>
          {response.noData ?
            <DataNotFound title={"No Warehouse Found"} button={"+ Add Warehouse"} handleCreate={handleCreate} />
            :

            <div className="p-4">
              <ListHead
                title={"Warehouse Table"}
                records={response.warehouses.length}
                buttonText={"+ Add Warehouse"}
                searchData={search}
                setSearchData={setSearch}
                handleCreate={handleCreate} />
              <div className="mx-[3%]  ">
                <table className="w-[100%] ">
                  <thead className="">
                    <tr className=" text-[#101418] capitalize leading-normal w-[100%] ">
                      <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700 text-left pl-5">
                        Warehouse
                        <Tooltip title={`Change Order`} placement="bottom">
                          <span onClick={() => toggleSortOrder('warehouse')} className="ml-2 cursor-pointer">
                            <ImportExportIcon sx={{ fontSize: 17 }} />
                          </span>
                        </Tooltip>
                      </th>
                      <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700 text-left">Area</th>
                      <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700 text-center">
                        Date
                        <Tooltip title={`Change Order`} placement="bottom">
                          <span onClick={() => toggleSortOrder('date')} className="ml-2 cursor-pointer">
                            <ImportExportIcon sx={{ fontSize: 17 }} />
                          </span>
                        </Tooltip>
                      </th>
                      <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700 text-center">Status</th>
                      <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700 text-center">Action</th>
                    </tr>
                  </thead>
                  {data.map((value, index) => (
                    <tbody key={index} className="text-gray-600 text-sm font-light w-[100%] border-t-[1px] border-gray-200">
                      <tr className={` bg-white  `}>
                        <td className=" w-[20%] max-md:text-[.7rem] text-left pl-6">
                          <p className="font-[600] text-gray-600 text-[14px]">{value.warehouseName}</p>
                          <p className="font-[400] text-gray-500 text-[13px]">{value.city}</p>
                        </td>
                        <td className=" w-[20%] max-md:text-[.7rem] text-left">
                          <p className="font-[600] text-gray-600 text-[14px]">{value.area}</p>
                          <p className="font-[400] text-gray-500 text-[13px]">{value.address}</p>
                        </td>
                        <td className="py-[2%] px-2 w-[20%] max-md:text-[.7rem] text-center">
                          <span className="font-[400] ">{moment(value.createdAt).format("MMM Do YY")}</span>
                        </td>
                        <td className="py-[2%] px-2 w-[20%] max-md:text-[.7rem] text-center">
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
                        <td className="py-[2%] w-[20%] ">
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
                        <option value={val} key={i} >{val} / page</option>
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

export default Warehouse
