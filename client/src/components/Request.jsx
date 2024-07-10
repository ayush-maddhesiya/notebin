import React from 'react'

const Requests = () => {
  return (
    <div className='w-full h-full'>
        <h1 className='text-2xl mainf mt-5 ml-5 text-[#093A3E] font-semibold'>Aproove the Requests</h1>
        <div className='flex flex-col gap-2 items-center mt-5 h-[65vh] overflow-auto '>
            <div className='flex gap-8 text-xl border border-[#093A3E] items-center justify-center py-2 mx-10 w-[60%]'>
                Notes title 
                <span className='text-sm'>Subject</span>
                <span className='text-sm'>Year/Semester</span>
                <button className='bg-[#093A3E] text-sm text-white px-3 rounded py-1'>View</button>
                <button className='bg-[#093A3E] text-sm text-white px-3 rounded py-1'>Aproove</button>
                <button className='bg-[#093A3E] text-sm text-white px-3 rounded py-1'>Reject</button>
            </div>
        </div>
    </div>
  )
}

export default Requests