"use client";
import { useAuth } from "@/AuthProvider/AuthProvider";
import Loading from "@/components/Loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import useCoursesDataLoading from "@/dataFatching/useCoursesDataLoading";
import axiosSecureApi from "@/Hooks/ApiRelatedHooks/AxiosSecureApi";
import QuizeId from "@/Hooks/useQuizeId";
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
  const [sort, setSort] = useState("");

  // handle pagination pages
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  // fetching data using the tanstack query
  const { coursesData, refetch, isLoading } = useCoursesDataLoading(
    user?.email,
    page,
    search,
    sort
  );

  useEffect(() => {
    setCourses(coursesData.coursesData);
    setTotalCourses(coursesData.total);
    setCurrentPage(page);
  }, [coursesData, page]);

  useEffect(() => {
    refetch();
  }, [page, sort]);

  // total pages handle
  const totalPages = totalCourses ? Math.ceil(totalCourses / 10) : 2;

  // handle search
  const searchHandle = (e) => {
    e.preventDefault();
    refetch();
  };

  // handle delete assignemtns
  const handleDeleteCourse = (id) => {
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
          const deleteRes = await axiosSecureApi.delete(`/course-create/${id}`);

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

  // loading handle
  if (isLoading) return <Loading />;

  return (
    <div>
      {/* header section */}
      <div className="flex items-center justify-between  px-7 py-5 border-b-gray-200 border-b ">
        {/* filter search and sorting section */}
        <div className="flex items-center gap-5">
          {/* filter section */}
          <div className="">
            <label>
              <select
                onChange={(e) => setSort(e.target.value)}
                className="select focus:outline-none text-xl text-gray-600 border border-gray-200 rounded-md  w-full "
                defaultValue="Courses sort by"
              >
                <option disabled value="Courses sort by">
                  Courses sort by
                </option>
                <option value="All">All</option>
                <option>Course Fee Low to High</option>
                <option>Course Fee High to Low</option>
              </select>
            </label>
          </div>

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
            <button
              className={`px-4 py-[10.5px] rounded-l-none text-white ${
                search.length > 0
                  ? "bg-blue-500 transition-all delay-200 "
                  : " bg-gray-200 "
              }  hover:bg-blue-700 rounded-md  active:bg-blue-400 `}
            >
              Search
            </button>
          </form>
        </div>

        {/* pagination section */}
        <div className=" sm:hidden lg:block ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              router.push(`/courses/teacher/courses?page=${page}`);
            }}
          />
        </div>
      </div>

      {/* displaying the assignments */}
      <div className="overflow-x-auto px-10 mb-12 py-7 lg:ml-16 lg:mb-10 lg:mt-5 ">
        <table className="table">
          <thead>
            <tr>
              <th className="text-[18px]">Title</th>
              <th className="text-[18px]">Course Category</th>
              <th className="text-[18px]">Course Level</th>
              <th className="text-[18px]">Course Fee</th>

              <th className="text-red-500 text-[18px] ">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((item) => (
              <tr
                key={item._id}
                className=" hover:bg-gray-100 hover:text-blue-500 duration-200 transition-all "
              >
                <th>{item.title}</th>
                <td>{item?.courseCategory}</td>
                <td>{item?.courseLevel}</td>
                <td className="text-blue-800">${item?.courseFee}</td>
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
                  <button
                    onClick={() => 
                    {
                      router.push(`/courses/teacher/edit-course`);
                      QuizeId(item._id);
                    }
                    }
                    className="bg-yellow-500 text-white p-2 rounded flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteCourse(item._id)}
                    className="bg-red-500 text-white p-2 rounded flex items-center"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination for medium and small devices */}
      <div className=" lg:hidden p-5  bg-gray-100 fixed bottom-0 w-full flex items-center justify-center ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            router.push(`/courses/teacher/courses?page=${page}`);
          }}
        />
      </div>
    </div>
  );
}
