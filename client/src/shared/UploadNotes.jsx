import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Upload from '@/components/Upload'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { VscRequestChanges } from "react-icons/vsc";
import { MdFileUpload } from "react-icons/md";
import Requests from '@/components/Request'

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
              <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-full h-full' />
            </div>
            <Link href="/"><FaHome size={25} color='white'/></Link>
            {/* Upload Button */}
            <Link href="#" onClick={handleUploadClick}><MdFileUpload size={25} color='white'/></Link>

            {/* Admin Button */}
            <Link href="#" onClick={handleAdminClick}><VscRequestChanges size={25} color='white' /></Link>

            <Link href="/signin" className='pl-1'><IoLogOut size={25} color='white'/></Link>
          </div>

          <div className='flex flex-col h-full w-[25%] border-r border-[#093A3E] items-center gap-2 pt-5'>
            <h1 className='text-2xl text-[#093A3E] font-semibold mainf tracking-[1px]'>All Notes</h1>
            <div className='w-full h-[70vh] overflow-auto px-2 mt-2'>
              <p className='flex justify-between bg-[#093A3E] text-white px-2 rounded'>Notes Title<a href=''><small>Download</small></a></p>
            </div>
          </div>

          <div className='w-full w-full'>
            {showRequests ? <Requests /> : showUpload ? <Upload /> : null}
          </div>
        </div>
        
        {/* Footer */}
        <Footer/>
      </main>
    </>
  )
}

export default UploadNotes