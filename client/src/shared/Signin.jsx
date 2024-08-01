import Link from 'next/link'
import React from 'react'

const Signin = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#093A3E] to-[#0D6E71] py-5">
        <div className="w-full max-w-md shadow-xl py-8 px-8 bg-white rounded-lg">
          <p className='text-sm font-semibold'>Welcome to <span className='text-[#093A3E]'>Abhyudaya Club</span></p>
          <h1 className='text-[3rem]  font-[500] text-[#093A3E]'>Sign In</h1>

          <div className='mt-6'>
            <p className='text-sm'>Username or Email Address</p>
            <input type="text" placeholder='Username or Email Address' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' />
          </div>

          <div className='mt-6'>
            <p className='text-sm'>Enrollment Number</p>
            <input type="text" placeholder='Enrollment Number' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' />
          </div>

          <div className='mt-6 flex justify-between'>
            <div className='w-[48%]'>
              <p className='text-sm'>Name</p>
              <input type="text" placeholder='Name' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' />
            </div>
            <div className='w-[48%]'>
              <p className='text-sm'>Mobile Number</p>
              <input type="text" placeholder='Mobile Number' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' />
            </div>
          </div>

          <div className='mt-6'>
            <p className='text-sm'>Semester / Year <span className='text-xs text-gray-400'>(optional)</span></p>
            <input type="text" placeholder='Semester / Year' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' />
          </div>

          <div className='mt-6'>
            <p className='text-sm'>Password</p>
            <input type="password" placeholder='Password' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' />
            <a href="#" className='text-xs text-[#093A3E] flex justify-end mt-1'>Forgot Password?</a>
          </div>

          <div className='flex justify-evenly mt-8'>
            <Link href="/login" className='text-md border-2 border-[#093A3E] outline-none py-3 px-12 rounded-lg text-[#093A3E]'>Login
            </Link>
            <button className='text-md bg-[#093A3E] outline-none py-3 px-12 rounded-lg text-white'>Sign in</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin