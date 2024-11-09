import { Button } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";


const ListHead = ({title, records, buttonText, handleCreate, setSearchData, searchData}) => {
    return (
        <div>
            <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]  ">{title}</h1>
            <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">
                {records} records found
            </h1>
            <div className="flex mt-8 flex-row-reverse justify-between px-[3%]">
                <Button
                    onClick={() => handleCreate()}
                    className="!bg-[#232233]  !h-[2rem] !px-4 !rounded-md !text-white !font-[600] !text-[14px] !normal-case"
                >
                    {buttonText}
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
        </div>
    )
}

export default ListHead
    