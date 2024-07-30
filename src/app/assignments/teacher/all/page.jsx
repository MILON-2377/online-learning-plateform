"use client";
import FilterAssignments from "@/components/assignments/FilterAssignments";
import Pagination from "@/components/pagination/Pagination";
import useAssignmentsData from "@/dataFatching/AssignmentsData";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaBook,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaEye,
  FaHeading,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";

export default function AllAssignmentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [assignments, setAssignments] = useState([]);

  // handle pagination pages
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  // fetching data using the tanstack query
  const { assignmentsData, refetch } = useAssignmentsData(page);

  useEffect(() => {
    setAssignments(assignmentsData.assignmentsData);
    setTotalAssignments(assignmentsData.total);
    setCurrentPage(page);
    // refetch();
  }, [assignmentsData, page]);

  useEffect(() => {
    refetch();
  }, [page]);

  // total pages handle
  const totalPages = totalAssignments ? Math.ceil(totalAssignments / 10) : 2;

  // filter handle section

  const [search, setSearch] = useState("");

  const handleFilterChange = () => {
    refetch();
  };

  // handle search
  const searchHandle = () => {};

  // handle delete assignemtns
  const handleDeleteAssignments = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleteRes = await axios.delete(
            `/api/create-assignments?id=${id}`
          );

          if (deleteRes.data) {
            refetch();
          }

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* header section */}
      <div className="flex items-center justify-between -z-50  px-7 py-5 border-b-gray-200 border-b ">
        {/* filter search and sorting section */}
        <div className="flex items-center gap-5">
          <FilterAssignments onFilterChange={handleFilterChange} />

          {/* search bar */}
          <div className="-z-20">
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            router.push(`/assignments/teacher/all?page=${page}`);
          }}
        />
      </div>

      {/* displaying the assignments */}
      <div className=" p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {assignments?.map((item) => (
          <div key={item._id} className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-2 ">
                <span>
                  <FaHeading className="text-gray-300 text-xl " />
                </span>
                {/* <span className="text-xl font-bold ">Title:</span> */}

                <h2 className=" text-gray-800 font-bold ">
                  <span>{item.title}</span>
                </h2>
              </div>
              <div className="flex items-center gap-2 ">
                <span>
                  {/* <FaInfoCircle className="text-gray-300 text-2xl" /> */}
                  <FaBook className="text-gray-300 text-xl" />
                </span>
                <p className="text-gray-800 font-bold ">{item.subject}</p>
              </div>
              <div className="flex items-center gap-2 ">
                <span>
                  <FaCalendarAlt className="text-gray-300 text-xl" />
                </span>
                <p className="text-gray-800 font-bold ">{item.dueDate}</p>
              </div>
              <div className="flex items-center gap-2 ">
                <span>
                  {item.submitted === "not submitted" ? (
                    <FaClock className="text-gray-300 text-xl" />
                  ) : (
                    <FaCheckCircle className="text-gray-300 text-xl" />
                  )}
                </span>
                <p className="text-gray-800 font-bold ">
                  {item.submitted === "not submitted" ? "Pending" : "Complete"}
                </p>
              </div>
              <div className="card-actions justify-end">
                <button className="bg-yellow-500 text-white p-2 rounded flex items-center">
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAssignments(item._id)}
                  className="bg-red-500 text-white p-2 rounded flex items-center"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
                <button 
                onClick={() => router.push(`/assignments/teacher/all/${item._id}`) }
                className="bg-blue-500 text-white p-2 rounded flex items-center">
                  <FaEye className="mr-2" />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
