"use client";
import FilterAssignments from "@/components/assignments/FilterAssignments";
import Pagination from "@/components/pagination/Pagination";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function AllAssignmentsPage() {
  const [filters, setFilters] = useState({
    subject: "",
    dueDate: "",
    status: "",
    submissionStatus: "",
  });
  const [search, setSearch] = useState("");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply your filtering logic here
    console.log(newFilters);
  };

  return (
    <div>
      {/* header section */}
      <div className="flex items-center justify-between  px-7 py-5 border-b-gray-200 border-b ">
        {/* filter search and sorting section */}
        <div className="flex items-center gap-5 ">
          <FilterAssignments onFilterChange={handleFilterChange} />

          {/* search bar */}
          <div className="">
            <label className="relative ">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className=" px-4 py-[10px]  border border-r-0 rounded-r-none border-gray-200 rounded-md focus:outline-none  "
                placeholder="Search"
                type="search"
              />
              <span
                className={
                  search.length > 0 ? "hidden" : "absolute top-[3px] right-3 "
                }
              >
                <IoSearch className="text-xl text-gray-400" />
              </span>
            </label>
            <button className="px-4 py-[10.5px] rounded-l-none text-white  bg-blue-500  hover:bg-blue-700 rounded-md  active:bg-blue-400 ">
              Search
            </button>
          </div>
        </div>

        {/* pagination section */}
        <Pagination></Pagination>
      </div>
    </div>
  );
}
