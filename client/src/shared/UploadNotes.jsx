import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Upload from '@/components/Upload'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { MdHome, MdFileUpload, MdDelete } from "react-icons/md";
import UserProfile from '@/components/UserProfile'
import axios from 'axios';
import jsCookie from 'js-cookie';
import { BASE_URL } from '@/constants/data';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadNotes = () => {
  const [showRequests, setShowRequests] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAdminClick = () => {
    setShowRequests(true);
    setShowUpload(false);
  };

  const handleUploadClick = () => {
    setShowUpload(true);
    setShowRequests(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = jsCookie.get('token');
      const response = await axios.get(`${BASE_URL}api/v1/file/userfiles`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error('Failed to fetch notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    jsCookie.remove('token');
    window.location.href = '/';
  };

  const handleDelete = async (noteId) => {
    try {
      const token = jsCookie.get('token');
      await axios.delete(`${BASE_URL}api/v1/file/delete/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Note deleted successfully');
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note. Please try again.');
    }
  };

  return (
    <>
      <main className="min-h-screen">
        <div className='flex w-full min-h-[80vh]'>
          <div className='flex flex-col items-center gap-10 h-[90vh] pt-5 w-20 bg-[#093A3E]'>
            <div className='w-10 h-10 overflow-hidden rounded-full'>
              <img src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="" className='w-full h-full' />
            </div>
            <Link href="/"><MdHome size={25} color='white'/></Link>
            <Link href="#" onClick={handleUploadClick}><MdFileUpload size={25} color='white'/></Link>
            <Link href="#" onClick={handleAdminClick}><FaCircleUser size={24} color='white' /></Link>
            <button onClick={handleLogout} className='pl-1'><IoLogOut size={25} color='white'/></button>
          </div>
          
          <div className='flex flex-col h-full w-[22%] border-r border-[#093A3E] items-center gap-2 pt-5 bg-white'>
            <h1 className='text-2xl text-[#093A3E] font-semibold mainf tracking-[1px]'>All Notes</h1>
            <div className='w-full h-[70vh] overflow-y-auto px-2 mt-2'>
              {loading ? (
                <p className="text-center">Loading notes...</p>
              ) : notes.length === 0 ? (
                <p className="text-center">No notes found.</p>
              ) : (
                notes.map(note => (
                  <div key={note.id} className='flex justify-between bg-[#093A3E] text-white px-2 py-2 rounded mb-2 items-center'>
                    <span className="truncate flex-1 mr-2">{note.title}</span>
                    <div className="flex items-center">
                      <Link href={note.fileUrl} className="mr-2 hover:underline">
                        <small>Download</small>
                      </Link>
                      <button onClick={() => handleDelete(note._id)} className="text-red-400 hover:underline">
                        <small>Delete</small>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className='flex-1 bg-white'>
            {showRequests ? <UserProfile /> : showUpload ? <Upload onUploadSuccess={fetchNotes} /> : null}
          </div>
        </div>
        <Footer/>
      </main>
      <ToastContainer />
    </>
  )
}

export default UploadNotes