import React from 'react'
import NoData from './NoData'
import { Button } from '@mui/material'

const DataNotFound = ({ title, button, handleCreate }) => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
              <div className=" ">
                <NoData />
                <h1 className="text-center font-[600] mb-4">
                  {title}
                </h1>
                <center>
                  <Button
                    onClick={() => handleCreate()}
                    className="!bg-[#232233] !h-[2rem] !px-4 !rounded-md !text-white !font-[600] !text-[14px] !normal-case"
                  >
                    {button}
                  </Button>
                </center>
              </div>
            </div>
  )
}

export default DataNotFound
