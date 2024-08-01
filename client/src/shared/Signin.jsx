"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { BASE_URL } from '@/constants/data';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enrollmentNo: '',
    mobileNo: '',
    password: '',
    semester: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`${BASE_URL}api/v1/user/signup`, formData);
      const { token, user } = res.data;
      Cookies.set('token', token, { expires: 1 });
      dispatch(loginSuccess({ token, user }));
      router.push('/'); 
      alert('User registered successfully');
    } catch (err) {
      dispatch(loginFailure(err.response.data.msg));
      console.log(err)
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#093A3E] to-[#0D6E71] py-5">
        <div className="w-full max-w-md shadow-xl py-8 px-8 bg-white rounded-lg">
          <p className='text-sm font-semibold'>Welcome to <span className='text-[#093A3E]'>Abhyudaya Club</span></p>
          <h1 className='text-[3rem] font-[500] text-[#093A3E]'>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className='mt-6'>
              <p className='text-sm'>Email Address</p>
              <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Email Address' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' required />
            </div>

            <div className='mt-6'>
              <p className='text-sm'>Enrollment Number</p>
              <input type="text" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} placeholder='Enrollment Number' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' required />
            </div>

            <div className='mt-6 flex justify-between'>
              <div className='w-[48%]'>
                <p className='text-sm'>Name</p>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' required />
              </div>
              <div className='w-[48%]'>
                <p className='text-sm'>Mobile Number</p>
                <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder='Mobile Number' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' required />
              </div>
            </div>

            <div className='mt-6'>
              <p className='text-sm'>Semester / Year <span className='text-xs text-gray-400'>(optional)</span></p>
              <input type="text" name="semester" value={formData.semester} onChange={handleChange} placeholder='Semester / Year' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' />
            </div>

            <div className='mt-6'>
              <p className='text-sm'>Password</p>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2' required />
              <a href="#" className='text-xs text-[#093A3E] flex justify-end mt-1'>Forgot Password?</a>
            </div>

            <div className='flex justify-evenly mt-8'>
              <Link href="/login" className='text-md border-2 border-[#093A3E] outline-none py-3 px-12 rounded-lg text-[#093A3E]'>Login</Link>
              <button type="submit" className='text-md bg-[#093A3E] outline-none py-3 px-12 rounded-lg text-white'>Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signin;
