"use client";

import FiltersItemsCatch from "@/Hooks/useFiltersItemsCatch";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

export default function FilterAssignments({ onFilterChange }) {
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [submitted, setSubmissionStatus] = useState("");

  const handleFilterChange = () => {
    FiltersItemsCatch({
      subject,
      dueDate,
      status,
      submitted,
    });

    onFilterChange();
  };

  return (
    <div className=" flex items-center ">
      <div className="px-4 py-1 rounded-md border border-gray-200 hover:bg-gray-100 flex items-center ">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className=" flex items-center ">
            <span>Choose filters</span>
            <MdArrowDropDown className="text-4xl " />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu border border-gray-200 relative top-12 -right-36 bg-gray-100 z-10  w-80 rounded-md p-5 "
          >
            <li className="">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block bg-base-100 w-full  "
              >
                <option value="" disabled>
                  Subjects
                </option>
                <option value="">All</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                {/* Add more subjects as needed */}
              </select>
            </li>
            <li className="">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full rounded-md "
              />
            </li>
            <li className="">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md  "
              >
                <option value="" disabled>
                  Status
                </option>
                <option value="">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </li>
            <li className="">
              <select
                value={submitted}
                onChange={(e) => setSubmissionStatus(e.target.value)}
                className="mt-1 block w-full rounded-md "
              >
                <option value="" disabled>
                  Submission Status
                </option>
                <option value="submitted">Submitted</option>
                <option value="not_submitted">Not Submitted</option>
              </select>
            </li>
            <li
              onClick={handleFilterChange}
              className="px-4 py-2 mt-5 text-center cursor-pointer rounded-md bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-400 "
            >
              Apply Filters
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
