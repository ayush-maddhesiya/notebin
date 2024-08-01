"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/data';
import jsCookie from 'js-cookie';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    semester: '',
    keyword: '',
    file: null,
  });

  const [uploadState, setUploadState] = useState('');

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
    const token = jsCookie.get('token');

    const formDataObj = new FormData();
    formDataObj.append('title', title);
    formDataObj.append('subject', subject);
    formDataObj.append('semester', semester);
    formDataObj.append('keyword', keyword);
    formDataObj.append('file', file);

    setUploadState('Uploading...');

    try {
      const response = await axios.post(`${BASE_URL}api/v1/file/upload`, formDataObj, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUploadState('Uploaded!');
        setFormData({
          title: '',
          subject: '',
          semester: '',
          keyword: '',
          file: null,
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadState('Upload failed. Please try again.');
    }
  };

  return (
    <div className='w-full h-full'>
      <form onSubmit={handleSubmit} className='flex flex-col items-start ml-10 gap-5 mt-[3rem]'>
        <input
          type='text'
          name='title'
          placeholder='Enter Title of the Notes'
          value={formData.title}
          onChange={handleChange}
          className='outline-none rounded px-2 py-1 border border-[#093A3E]'
        />
        <input
          type='text'
          name='subject'
          placeholder='Enter Subject'
          value={formData.subject}
          onChange={handleChange}
          className='outline-none rounded px-2 py-1 border border-[#093A3E]'
        />
        <input
          type='text'
          name='semester'
          placeholder='Enter Semester'
          value={formData.semester}
          onChange={handleChange}
          className='outline-none rounded px-2 py-1 border border-[#093A3E]'
        />
        <input
          type='text'
          name='keyword'
          placeholder='Enter Keywords'
          value={formData.keyword}
          onChange={handleChange}
          className='outline-none rounded px-2 py-1 border border-[#093A3E]'
        />
        <input
          type='file'
          name='file'
          onChange={handleChange}
          className=''
        />
        {uploadState && (
          <div className="mt-3 text-center">
            {uploadState}
          </div>
        )}
        <button type='submit' className='bg-[#093A3E] text-white px-2 rounded py-1'>
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
