"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/data';
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';

const Upload = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    semester: '',
    keyword: '',
    file: null,
  });
  const [uploadState, setUploadState] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, subject, semester, keyword, file } = formData;
    if (!title || !subject || !semester || !keyword || !file) {
      toast.error('Please fill all fields and select a file.');
      return;
    }

    const token = jsCookie.get('token');
    const formDataObj = new FormData();
    formDataObj.append('title', title);
    formDataObj.append('subject', subject);
    formDataObj.append('semester', semester);
    formDataObj.append('keyword', keyword);
    formDataObj.append('file', file);

    setLoading(true);
    setUploadState('Uploading...');

    try {
      const response = await axios.post(`${BASE_URL}api/v1/file/upload`, formDataObj, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUploadState('Uploaded successfully!');
        toast.success('File uploaded successfully!');
        setFormData({
          title: '',
          subject: '',
          semester: '',
          keyword: '',
          file: null,
        });
        if (onUploadSuccess) onUploadSuccess();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadState('Upload failed. Please try again.');
      toast.error('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-full p-6 bg-gray-50'>
      <h2 className="text-2xl font-bold text-[#093A3E] mb-6">Upload New Note</h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-5'>
        <input
          type='text'
          name='title'
          placeholder='Enter Title of the Notes'
          value={formData.title}
          onChange={handleChange}
          className='outline-none rounded px-3 py-2 w-full max-w-md border border-[#093A3E] focus:ring-2 focus:ring-[#093A3E]'
        />
        <input
          type='text'
          name='subject'
          placeholder='Enter Subject'
          value={formData.subject}
          onChange={handleChange}
          className='outline-none rounded px-3 py-2 w-full max-w-md border border-[#093A3E] focus:ring-2 focus:ring-[#093A3E]'
        />
        <input
          type='text'
          name='semester'
          placeholder='Enter Semester'
          value={formData.semester}
          onChange={handleChange}
          className='outline-none rounded px-3 py-2 w-full max-w-md border border-[#093A3E] focus:ring-2 focus:ring-[#093A3E]'
        />
        <input
          type='text'
          name='keyword'
          placeholder='Enter Keywords'
          value={formData.keyword}
          onChange={handleChange}
          className='outline-none rounded px-3 py-2 w-full max-w-md border border-[#093A3E] focus:ring-2 focus:ring-[#093A3E]'
        />
        <input
          type='file'
          name='file'
          onChange={handleChange}
          className='w-full max-w-md'
        />
        {uploadState && (
          <div className={`mt-3 text-center ${uploadState.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
            {uploadState}
          </div>
        )}
        <button 
          type='submit' 
          className='bg-[#093A3E] text-white px-4 py-2 rounded hover:bg-[#0c4c52] transition duration-300 disabled:opacity-50'
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default Upload;