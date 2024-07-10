import Link from 'next/link';
import React from 'react';

const Signin = () => {
  return (
    <div className="flex justify-center w-full h-[100vh] items-center bg-[#093A3E]">
      <div className="w-[30%] shadow-lg py-8 px-6 bg-white rounded">
        <p className='text-sm font-semibold'>Welcome to <span className='text-[#093A3E]'>Abhyudaya Club</span></p>
        <h1 className='text-[3rem] pl-2 font-[500]'>Sign in</h1>
        <button className='w-full bg-blue-50 py-2 rounded-[10px] mt-6 justify-center text-xs text-blue-500 flex items-center gap-3'>
          <span><img className='w-5 h-5' src="https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png" alt="" /></span>Sign in with Google
        </button>

        <div className='mt-7'>
          <p className='text-sm'>Enter your username or email address</p>
          <input type="text" placeholder='Username or email address'  className='w-full outline-none border border-[#093A3E] rounded-[5px] py-2 px-2 mt-2'/>
        </div>
        <div className='mt-5'>
          <p className='text-m'>Enter your Password</p>
          <input type="password" placeholder='Password'  className='w-full outline-none border border-[#093A3E] rounded-[5px] py-2 px-2 mt-2'/>
          <a href="#" className='text-xs text-[#093A3E] flex justify-end'>Forgot Password</a>
        </div>
        <div className='flex justify-evenly my-6'>
          <Link href="/login" className='text-m bg-[#093A3E] outline-none py-3 px-12 rounded-[8px] text-white'>Login</Link>
          <button className='text-m bg-[#093A3E] outline-none py-3 px-12 rounded-[8px] text-white'>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default Signin;