import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col w-full h-full p-6 text-[#093A3E]'>
      <h1 className='text-3xl mb-6'>User Profile</h1>
      <div className='w-full max-w-sm'>
        <div className='mb-4'>
          <h2 className='text-xl font-bold'>Name:</h2>
          <p>{user.name}</p>
        </div>
        <div className='mb-4'>
          <h2 className='text-xl font-bold'>Email:</h2>
          <p>{user.email}</p>
        </div>
        <div className='mb-4'>
          <h2 className='text-xl font-bold'>Phone Number:</h2>
          <p>{user.mobileNo}</p>
        </div>
        <div className='mb-4'>
          <h2 className='text-xl font-bold'>Enrollment No:</h2>
          <p>{user.enrollmentNo}</p>
        </div>
        <div className='mb-4'>
          <h2 className='text-xl font-bold'>Semester:</h2>
          <p>{user.semester}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
