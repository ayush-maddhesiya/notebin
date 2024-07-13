import Link from 'next/link';
import React from 'react';

const Signup = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#093A3E]">
      <div className="w-1/3 shadow-lg py-8 px-6 bg-white rounded">
        <p className='text-sm font-semibold'>Welcome to <span className='text-[#093A3E]'>Abhyudaya Club</span></p>
        <h1 className='text-3xl pl-2 font-medium'>Sign-up</h1>

        <div className='mt-5'>
          <p className='text-sm'>Enter your username or email address</p>
          <input type="text" placeholder='Username or email address' className='w-full outline-none border border-[#093A3E] rounded py-2 px-2 mt-2'/>
        </div>

        <div className='mt-5 flex justify-between'>
          <div className='w-[48%]'>
            <p className='text-sm'>User name</p>
            <input type="text" placeholder='User name' className='outline-none border border-[#093A3E] rounded py-2 px-2 mt-2 w-full'/>
          </div>
          <div className='w-[48%]'>
            <p className='text-sm'>Contact Number</p>
            <input type="text" placeholder='Contact Number' className='outline-none border border-[#093A3E] rounded py-2 px-2 mt-2 w-full'/>
          </div>
        </div>

        <div className='mt-5'>
          <p className='text-sm'>Enter your Password</p>
          <input type="password" placeholder='Password' className='w-full outline-none border border-[#093A3E] rounded py-2 px-2 mt-2'/>
          <Link href="#" className='text-xs text-[#093A3E] flex justify-end'>Forgot Password</Link>
        </div>
        
        <div className='flex justify-evenly my-6'>
          <Link href="/signin">
            <div className='text-sm bg-[#093A3E] py-3 px-12 rounded text-white'>Sign in</div>
          </Link>
          <button className='text-sm bg-[#093A3E] py-3 px-12 rounded text-white'>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
