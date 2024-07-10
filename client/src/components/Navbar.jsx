import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between px-10 py-4 items-center border-b border-zinc-400 bg-[#093A3E] text-white'>
        <div className="logo text-2xl font-bold tracking-[1px]">
          Notebin
        </div>
        <div className='flex gap-8 items-center '>
          <Link href="/">Home</Link>
          <Link href="notes">Notes</Link>
          <a href="/">Contact</a>
          <Link href="signin" className='border-white border text-white px-4 py-1 rounded-full hover:bg-white hover:text-[#093A3E]'>Sign in</Link>
        </div>
      </div>
  )
}

export default Navbar