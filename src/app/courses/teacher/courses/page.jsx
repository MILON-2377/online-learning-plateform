"use client";
import { useAuth } from "@/AuthProvider/AuthProvider";
import FilterAssignments from "@/components/assignments/FilterAssignments";
import Loading from "@/components/Loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import useCoursesDataLoading from "@/dataFatching/useCoursesDataLoading";
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

export default function CoursesPage() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  // handle pagination pages
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  // fetching data using the tanstack query
  const { coursesData, refetch, isLoading } = useCoursesDataLoading(
    user?.email,
    page,
    search
  );

  useEffect(() => {
    setCourses(coursesData.coursesData);
    setTotalCourses(coursesData.total);
    setCurrentPage(page);
    // refetch();
  }, [coursesData, page]);

  useEffect(() => {
    refetch();
  }, [page]);

  // total pages handle
  const totalPages = totalCourses ? Math.ceil(totalCourses / 10) : 2;

  // filter handle section

  const handleFilterChange = () => {
    refetch();
  };

  // handle search
  const searchHandle = (e) => {
    e.preventDefault();
    refetch();
  };

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

  // assignemnt edit handle
  //   const assignmentEdit = (id) => {
  //     router.push(`/assignments/teacher/create/${id}`);
  //   };

  //   console.log(courses);

  // loading handle
  if (isLoading) return <Loading />;

  return (
    <div>
      {/* header section */}
      <div className="flex items-center justify-between  px-7 py-5 border-b-gray-200 border-b ">
        {/* filter search and sorting section */}
        <div className="flex items-center gap-5">
          <FilterAssignments onFilterChange={handleFilterChange} />

          {/* search bar */}
          <form onSubmit={searchHandle} className="">
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
          </form>
        </div>

        {/* pagination section */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            router.push(`/courses/teacher/courses?page=${page}`);
          }}
        />
      </div>

      {/* displaying the assignments */}
      <div className="overflow-x-auto lg:ml-16 mb-10 mt-10 ">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Course Category</th>
              <th>Course Level</th>
              <th>Course Fee</th>
              <th>
                <span>
                  <FaEye className="text-xl text-green-600 " />
                </span>
              </th>
              <th>
                <span>
                  <FaEdit className="text-xl text-yellow-500 " />
                </span>
              </th>
              <th className="text-red-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((item) => (
              <tr key={item._id}>
                <th>{item.title}</th>
                <td>{item?.courseCategory}</td>
                <td>{item?.courseLevel}</td>
                <td>${item?.courseFee}</td>
                <td>
                  <a
                    href={`/courses/teacher/courses/${item?._id}`}
                    className="bg-blue-500 text-white p-2 rounded flex items-center"
                  >
                    <FaEye className="mr-2" />
                    View
                  </a>
                </td>
                <td>
                  <button className="bg-yellow-500 text-white p-2 rounded flex items-center">
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                </td>
                <td>
                  <button className="bg-red-500 text-white p-2 rounded flex items-center">
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
