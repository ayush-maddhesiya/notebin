"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookie from 'js-cookie';

const Navbar = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromCookie = Cookie.get('token');
    setToken(tokenFromCookie);
  }, []);

  const handleLogout = () => {
    Cookie.remove('token');
    setToken(null);
    window.location.href = '/';
  };

  return (
    <div className='flex justify-between px-10 py-4 items-center border-b border-zinc-400 bg-[#093A3E] text-white'>
      <div className="logo text-2xl font-bold tracking-[1px]">
        Notebin
      </div>
      <div className='flex gap-8 items-center'>
        <Link href="/">Home</Link>
        <Link href="/notes">Notes</Link>
        <Link href="/contact">Contact</Link>
        {token ? (
          <button onClick={handleLogout} className='border-white border text-white px-4 py-1 rounded-full hover:bg-white hover:text-[#093A3E]'>Logout</button>
        ) : (
          <Link href="/signin" className='border-white border text-white px-4 py-1 rounded-full hover:bg-white hover:text-[#093A3E]'>Sign in</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
