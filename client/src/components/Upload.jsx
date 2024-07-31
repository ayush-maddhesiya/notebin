import React from 'react'

const Upload = () => {
  return (
    <div className='w-full h-full'>
        <button className='absolute right-2 top-2 text-l bg-[#093A3E] text-white px-2 rounded py-1'>Share</button>
        <form action="" className='flex flex-col items-start ml-10 gap-5 mt-[3rem]'>
            <input type="text" placeholder='Enter Title of the Notes' className=' outline-none rounded px-2 py-1 border border-[#093A3E]'/>
            <input type="text" placeholder='Enter Subject' className=' outline-none rounded px-2 py-1 border border-[#093A3E]'/>
            <input type="text" placeholder='Enter Year' className=' outline-none rounded px-2 py-1 border border-[#093A3E]'/>
            <input type="text" placeholder='Enter Semester' className=' outline-none rounded px-2 py-1 border border-[#093A3E]'/>
            <input type="text" placeholder='Enter Keywords' className=' outline-none rounded px-2 py-1 border border-[#093A3E]'/>
            <input type="file" placeholder='Select Notes' className=''/>

        </form>
        </div>
  )
}

export default Upload