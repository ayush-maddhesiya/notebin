"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoRocket } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { RiFolderSharedFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../slices/notesSlice'; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const Page = () => {
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.items);
  const status = useSelector((state) => state.notes.status);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  const filteredNotes = searchTerm
    ? notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : notes;

  return (
    <main>
      <Navbar />

      <div className="page1 bg-[#093A3E] w-full min-h-screen text-white py-[5rem]">
        <h1 className="text-center text-[2.1rem] font-bold mainf tracking-[-1px]">
          Your Centralized Academic Repository
        </h1>
        <p className="text-center text-zinc-300 mb-10">
          Here you can find all semester study material
        </p>

        <div className="flex justify-center relative" ref={searchRef}>
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              className="border border-zinc-200 bg-white px-10 py-3 w-full text-black outline-none rounded-l transition-all duration-300 focus:ring-2 focus:ring-[#008985]"
              placeholder="Search notes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() => setModal(true)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            {searchTerm && (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            )}
          </div>
          <button className="px-6 py-3 bg-[#008985] rounded-r hover:bg-[#007975] transition-colors duration-300">
            Search
          </button>
        </div>

        {modal && (
          <div
            className="flex-col overflow-y-auto w-[90%] md:w-[60%] lg:w-[40%] shadow-lg absolute left-1/2 border -translate-x-1/2 mx-auto max-h-[60vh] bg-white text-black rounded mt-2"
            ref={modalRef}
          >
            <div className="sticky top-0 bg-white z-10 px-4 py-2 border-b">
              <h3 className="text-lg font-semibold">Search Results</h3>
            </div>
            <div className="p-4">
              {status === 'loading' && <div className="text-center py-3">Loading...</div>}
              {status === 'succeeded' && filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                  <div
                    key={note._id}
                    className={`text-sm mb-1 flex w-full p-2 items-center justify-between rounded ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <div>{highlightText(note.title, searchTerm)}</div>
                    {note.fileUrl ? (
                      <Link
                        href={note.fileUrl}
                        className="bg-[#093A3E] text-white px-3 py-1 rounded hover:bg-[#0c4e54] transition-colors duration-300"
                      >
                        Download
                      </Link>
                    ) : (
                      <span className="bg-gray-300 text-gray-600 px-3 py-1 rounded">
                        No link
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">No results found</div>
              )}
              {status === 'failed' && (
                <div className="text-center py-4 text-red-500">Failed to load notes</div>
              )}
            </div>
          </div>
        )}

        <p className="text-center text-sm my-5">
          Popular searches:{" "}
          <span className="bg-[#326262] px-2 py-1 text-sm rounded-full text-white mr-3">
            DLCD
          </span>
          <span className="bg-[#326262] px-2 py-1 text-sm rounded-full text-white mr-3">
            Maths
          </span>
          <span className="bg-[#326262] px-2 py-1 text-sm rounded-full text-white">
            Physics
          </span>
        </p>

        <div className="flex flex-wrap justify-evenly mt-[4rem]">
          <div className="w-full sm:w-[45%] lg:w-[25%] h-[50vh] bg-white rounded flex flex-col gap-4 text-black items-center justify-center p-6 mb-6">
            <GoRocket size={80} color="#008985" />
            <Link href="/notes" className="mainf text-2xl font-semibold">
              Find Notes
            </Link>
            <p className="text-center text-zinc-600 leading-1">
              Easily search and access a wide range of study materials for all your courses.
            </p>
          </div>
          <div className="w-full sm:w-[45%] lg:w-[25%] h-[50vh] bg-white rounded flex flex-col gap-4 text-black items-center justify-center p-6 mb-6">
            <MdGroups size={100} color="#008985" />
            <a href="#" className="mainf text-2xl font-semibold">
              Centralized Hub
            </a>
            <p className="text-center text-zinc-600 leading-1">
              A single platform to manage and organize all your academic resources efficiently.
            </p>
          </div>
          <div className="w-full sm:w-[45%] lg:w-[25%] h-[50vh] bg-white rounded flex flex-col gap-4 text-black items-center justify-center p-6 mb-6">
            <RiFolderSharedFill size={80} color="#008985" />
            <Link href="/uploadNotes" className="mainf text-2xl font-semibold">
              Upload Materials
            </Link>
            <p className="text-center text-zinc-600 leading-1">
              Contribute to the community by sharing your notes and study materials with others.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Page;