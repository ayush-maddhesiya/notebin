import React from "react";
import { GoRocket } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { RiFolderSharedFill } from "react-icons/ri";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const page = () => {
  return (
    <main>
      {/* Navbar */}
      <Navbar />

      {/* Page1 */}
      <div className="page1 bg-[#093A3E] w-full h-auto text-white py-[5rem]">
        <h1 className="text-center text-[2.1rem] font-bold mainf tracking-[-1px]">
          Your Centralized Academic Repository
        </h1>
        <p className="text-center text-zinc-300">
          Here you can find all semester study material
        </p>

        <div className="flex mt-10 justify-center">
          <input
            type="text"
            className="border border-zinc-200 bg-white px-2 w-[30%] text-black outline-none"
            placeholder="Search notes"
          />
          <button className="px-2 py-2 bg-[#008985]">Search</button>
        </div>
        <p className="text-center text-sm my-5">
          Popular searches :{" "}
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

        <div className="flex justify-evenly mt-[4rem]">
          <div className="w-[25%] h-[50vh] bg-white rounded flex flex-col gap-4 text-black items-center justify-center ">
            <GoRocket size={80} color="#008985" />
            <Link href="/notes" className="mainf text-2xl font-semibold">
              Find Notes
            </Link>
            <p className="text-center text-zinc-600 leading-1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Provident, rerum!
            </p>
          </div>
          <div className="w-[25%] h-[50vh] bg-white rounded flex flex-col gap-4 text-black items-center justify-center">
            <MdGroups size={100} color="#008985" />
            <a href="#" className="mainf text-2xl font-semibold">
              Centralized Hub
            </a>
            <p className="text-center text-zinc-600 leading-1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Provident, rerum!
            </p>
          </div>
          <div className="w-[25%] h-[50vh] bg-white rounded flex flex-col gap-4 text-black items-center justify-center">
            <RiFolderSharedFill size={80} color="#008985" />
            <Link href="uploadNotes" className="mainf text-2xl font-semibold">
              Upload Materials
            </Link>
            <p className="text-center text-zinc-600 leading-1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Provident, rerum!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default page;
