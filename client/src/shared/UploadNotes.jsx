import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Upload from '@/components/Upload'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import UserProfile from '@/components/UserProfile'

const UploadNotes = () => {
  const [showRequests, setShowRequests] = useState(false);
  const [showUpload, setShowUpload] = useState(true);

  const handleAdminClick = () => {
    setShowRequests(true);
    setShowUpload(false);
  };

  const handleUploadClick = () => {
    setShowUpload(true);
    setShowRequests(false);
  };

  return (
    <>
      <main>
        {/* Main content */}
        <div className='flex w-full h-[80vh]'>
          <div className='flex flex-col items-center gap-8 h-full pt-5 w-20 bg-[#093A3E]'>
            <div className='w-10 h-10 overflow-hidden rounded-full'>
              <img src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="" className='w-full h-full' />
            </div>
            <Link href="/"><MdHome size={25} color='white'/></Link>
            {/* Upload Button */}
            <Link href="#" onClick={handleUploadClick}><MdFileUpload size={25} color='white'/></Link>

            {/* Profile Button */}
            <Link href="#" onClick={handleAdminClick}><FaCircleUser size={24} color='white' /></Link>

            <Link href="/signin" className='pl-1'><IoLogOut size={25} color='white'/></Link>
          </div>

          <div className='flex flex-col h-full w-[25%] border-r border-[#093A3E] items-center gap-2 pt-5'>
            <h1 className='text-2xl text-[#093A3E] font-semibold mainf tracking-[1px]'>All Notes</h1>
            <div className='w-full h-[70vh] overflow-auto px-2 mt-2'>
              <p className='flex justify-between bg-[#093A3E] text-white px-2 rounded'>Notes Title<a href=''><small>Download</small></a></p>
            </div>
          </div>

          <div className='w-full w-full'>
            {showRequests ? <UserProfile /> : showUpload ? <Upload /> : null}
          </div>
        </div>
        
        {/* Footer */}
        <Footer/>
      </main>
    </>
  )
}

export default UploadNotes