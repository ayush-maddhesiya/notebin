'use client';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const Logs = () => {
  const initialLogs = [
    { time: '2024-07-30 14:23', user: 'user1', action: 'Uploaded notes', details: 'Physics - Chapter 1' },
    { time: '2024-07-30 14:45', user: 'user2', action: 'Uploaded notes', details: 'Maths - Algebra' },
    { time: '2024-07-30 15:00', user: 'user3', action: 'Uploaded notes', details: 'Chemistry - Organic Chemistry' },
  ];

  const [logs, setLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Most Recent');

  const filteredLogs = logs.filter(log => 
    (log.details.toLowerCase().includes(searchTerm.toLowerCase()) || 
     log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
     log.time.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedLogs = filteredLogs.sort((a, b) => {
    if (sortOrder === 'Most Recent') {
      return new Date(b.time) - new Date(a.time);
    } else if (sortOrder === 'Oldest') {
      return new Date(a.time) - new Date(b.time);
    } else {
      return new Date(b.time) - new Date(a.time);
    }
  });

  return (
   <>
    <Navbar />
    <div className="p-6 min-h-screen bg-[#093A3E] text-white">
      <h2 className="text-3xl font-semibold mb-4">Logs</h2>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <input
          type="text"
          placeholder="Search logs..."
          className="mb-2 md:mb-0 md:mr-2 p-2 rounded bg-[#008985] text-white border-white"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="mb-2 md:mb-0 md:mr-2 p-2 rounded bg-[#008985] text-white border-white"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="Most Recent">Most Recent</option>
          <option value="Oldest">Oldest</option>
          <option value="Newest">Newest</option>
        </select>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <table className="w-full table-auto h-[40vh] overflow-y-auto">
          <thead className="bg-[#008985]">
            <tr>
              <th className="px-4 py-1 text-left">Time</th>
              <th className="px-4 py-1 text-left">User</th>
              <th className="px-4 py-1 text-left">Action</th>
              <th className="px-4 py-1 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map((log, index) => (
              <tr key={index} className="bg-[#093A3E] border-b border-[#008985]">
                <td className="px-4 py-1">{log.time}</td>
                <td className="px-4 py-1">{log.user}</td>
                <td className="px-4 py-1">{log.action}</td>
                <td className="px-4 py-1">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </>
  );
}

export default Logs;
