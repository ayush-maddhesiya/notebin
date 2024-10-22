'use client';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { BASE_URL } from '@/constants/data';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const res = await axios.post(`${BASE_URL}api/v1/user/login`, formData);
      const { token, user } = res.data;
      Cookies.set('token', token, { expires: 1 });
      dispatch(loginSuccess({ token, user }));
      toast.success('User logged in successfully');
      router.push('/');
    } catch (err) {
      dispatch(loginFailure(err.response.data.msg || 'An error occurred'));
      toast.error(err.response.data.msg || 'An error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#093A3E] to-[#0D6E71]">
      <div className="w-full max-w-md shadow-xl py-8 px-8 bg-white rounded-lg">
        <p className='text-sm font-semibold'>Welcome to <span className='text-[#093A3E]'>Abhyudaya Club</span></p>
        <h1 className='text-[3rem] font-[500] text-[#093A3E]'>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className='mt-7'>
            <p className='text-sm'>Email Address</p>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Email Address'
              className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2'
              required
            />
          </div>

          <div className='mt-6'>
            <p className='text-sm'>Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              className='w-full outline-none border border-[#093A3E] rounded-md py-2 px-3 mt-2'
              required
            />
            <a href="#" className='text-xs text-[#093A3E] flex justify-end mt-1'>Forgot Password?</a>
          </div>

          <div className='flex justify-evenly mt-8'>
            <Link href="/signin" className='text-md border-2 border-[#093A3E] outline-none py-3 px-12 rounded-lg text-[#093A3E]'>Sign in</Link>
            <button type="submit" className='text-md bg-[#093A3E] outline-none py-3 px-12 rounded-lg text-white'>Login</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
