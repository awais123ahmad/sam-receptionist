import React from 'react'
import { PuffLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div>
          <div className="h-[80vh] flex justify-center  items-center">
            <PuffLoader color="#2C71B4" size={90} />
          </div>

        </div>
  )
}

export default Loading
