'use client';
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/data";
import Cookies from "js-cookie";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Most Recent");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/v1/log/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) =>
    Object.values(log).some((value) =>
      typeof value === "object"
        ? Object.values(value).some((nestedValue) =>
            nestedValue
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        : value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedLogs = filteredLogs.sort((a, b) => {
    if (sortOrder === "Most Recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === "Oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="bg-yellow-300 text-black">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen bg-gradient-to-b from-[#093A3E] to-[#005F63] text-white">
        <h2 className="text-4xl font-bold mb-6 text-center">Activity Logs</h2>
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <input
            type="text"
            placeholder="Search logs..."
            className="mb-4 md:mb-0 md:mr-4 p-3 rounded-lg bg-[#008985] text-white placeholder-gray-300 border border-[#00A9A5] focus:outline-none focus:ring-2 focus:ring-[#00A9A5] transition duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 rounded-lg bg-[#008985] text-white border border-[#00A9A5] focus:outline-none focus:ring-2 focus:ring-[#00A9A5] transition duration-300 ease-in-out"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Most Recent">Most Recent</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error: {error}</div>
          ) : (
            <table className="w-full table-auto">
              <thead className="bg-[#00A9A5] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Enrollment No.</th>
                  <th className="px-4 py-3 text-left">Mobile</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Action</th>
                  <th className="px-4 py-3 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {sortedLogs.map((log, index) => (
                  <tr
                    key={index}
                    className={`bg-[#005F63] hover:bg-[#007A7E] transition duration-300 ease-in-out ${
                      searchTerm &&
                      Object.values(log)
                        .flat()
                        .some((value) =>
                          value
                            .toString()
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        ? "bg-yellow-100 text-black"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      {highlightText(new Date(log.createdAt).toLocaleString(), searchTerm)}
                    </td>
                    <td className="px-4 py-3">
                      {highlightText(log.user.name, searchTerm)}
                    </td>
                    <td className="px-4 py-3">
                      {highlightText(log.user.enrollmentNo, searchTerm)}
                    </td>
                    <td className="px-4 py-3">
                      {highlightText(log.user.mobileNo, searchTerm)}
                    </td>
                    <td className="px-4 py-3">
                      {highlightText(log.user.email, searchTerm)}
                    </td>
                    <td className="px-4 py-3">
                      {highlightText(log.action, searchTerm)}
                    </td>
                    <td className="px-4 py-3">
                      {highlightText(log.details, searchTerm)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Logs;
