'use client'
import Link from 'next/link';
import React from 'react';

const Signin = () => {
  const handleGoogleSignIn = () => {
   window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#093A3E]">
      <div className="w-1/3 shadow-lg py-8 px-6 bg-white rounded">
        <p className='text-sm font-semibold'>Welcome to <span className='text-[#093A3E]'>Abhyudaya Club</span></p>
        <h1 className='text-3xl pl-2 font-medium'>Sign in</h1>
        
        <button 
          className='w-full bg-blue-50 py-2 rounded mt-6 flex items-center gap-3 text-xs text-blue-500 justify-center'
          onClick={handleGoogleSignIn}
        >
          <img className='w-5 h-5' src="https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png" alt="Google icon" />
          Sign in with Google
        </button>

        <div className='mt-7'>
          <p className='text-sm'>Enter your username or email address</p>
          <input type="text" placeholder='Username or email address' className='w-full outline-none border border-[#093A3E] rounded py-2 px-2 mt-2'/>
        </div>
        
        <div className='mt-5'>
          <p className='text-sm'>Enter your Password</p>
          <input type="password" placeholder='Password' className='w-full outline-none border border-[#093A3E] rounded py-2 px-2 mt-2'/>
          <Link href="#" className='text-xs text-[#093A3E] flex justify-end'>Forgot Password</Link>
        </div>
        
        <div className='flex justify-evenly my-6'>
          <Link href="/login">
            <div className='text-sm bg-[#093A3E] py-3 px-12 rounded text-white'>Login</div>
          </Link>
          <button className='text-sm bg-[#093A3E] py-3 px-12 rounded text-white'>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
