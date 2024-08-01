import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-auto bg-[#093A3E]'>
        <div className='text-white flex justify-between pb-[1rem] pt-[4rem] mx-[3rem]'>
        <div className="logo text-2xl font-bold tracking-[1px]">
          Notebin
        </div>
            <div className='flex gap-5'>
            <Link href="/">Home</Link>
            <Link href="/notes">Notes</Link>
            <Link href="#">Help</Link>
            <Link href="#">Contact</Link>
            </div>
        </div>
        <div className='text-white flex gap-20 justify-center py-3 border-t border-zinc-300 mx-10'>
            Copyright@Abhyudaya - 2024
        </div>
    </div>
  )
}

export default Footer