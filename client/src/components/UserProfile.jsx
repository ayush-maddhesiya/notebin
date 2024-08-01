import React from 'react';

const UserProfile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
    enrollmentNo: "123456789"
  };

  return (
    <div className='flex flex-col  w-full h-full p-6 text-[#093A3E]'>
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
          <p>{user.phoneNumber}</p>
        </div>
        <div className='mb-4'>
          <h2 className='text-xl font-bold'>Enrollment No:</h2>
          <p>{user.enrollmentNo}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
