"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import ActionButtons from "@/components/Classes/Teacher/ActionButtons";
import Loading from "@/components/Loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import useClassesDataLoading from "@/dataFatching/ClassesData";
import QuizeId from "@/Hooks/useQuizeId";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBook,
  FaCalendarAlt,
  FaEye,
  FaHeading,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function TeacherClasses() {
  const { user } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClasses, setTotalClasses] = useState(0);

  // handle pagination pages
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  // classes data loading
  const { classesData, refetch, isLoading } = useClassesDataLoading(
    user?.email,
    page,
    search
  );

  useEffect(() => {
    setClasses(classesData.classesData);
    setTotalClasses(classesData.total);
    setCurrentPage(page);
  }, [classesData, page]);

  useEffect(() => {
    refetch();
  }, [page]);

  // total pages handle
  const totalPages = totalClasses ? Math.ceil(totalClasses / 10) : 2;

  // handle delete class
  const handleDeleteClass = async (id) => {
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
        try {
          const res = await axios.delete(`/api/create-class/${id}`);
          if (res.data.message === "delete success") {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };

  // handle search funtioality
  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
    e.target.reset();
  };


  // handle quize id 
  const quizeIdHandle = (id) => {
    QuizeId(id);
  }

  // loading handle
  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      {/* classes header */}
      <div className="p-5 border-b border-b-gray-200 flex items-center justify-between ">
        {/* manage class schedule */}
        <div className=" hidden lg:flex items-center gap-5 ">
          <button
            onClick={() => router.push(`/classes/teacher/makeClass`)}
            className=" px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-500 active:scale-95 active:bg-blue-300 transition-all duration-300 "
          >
            create Class
          </button>
          <button
            onClick={() => router.push(`/classes/teacher/makeClass`)}
            className=" px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-500 active:scale-95 active:bg-blue-300 transition-all duration-300 "
          >
            Go Live
          </button>
        </div>

        {/* search bar  */}
        <div className=" flex items-center justify-between w-full lg:w-[40%] ">
          <form onSubmit={handleSearch} className=" flex items-center gap-4">
            <label className="relative">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-3 w-full rounded-full border border-gray-200 focus:outline-none "
                placeholder="Search"
                type="search"
              />
              <span
                className={
                  search.length > 0
                    ? "hidden"
                    : " absolute top-[18px] right-4  "
                }
              >
                <FaSearch className="text-[18px] text-gray-400" />
              </span>
            </label>
            <button className="btn ">Search</button>
          </form>

          {/* action section */}
          <div className="lg:hidden block  ">
            <ActionButtons />
          </div>
        </div>

        {/*pagination section*/}
        <div className=" hidden lg:flex items-center lg:gap-0  gap-5">
          {/* pagination section */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              router.push(`/classes/teacher?page=${page}`);
            }}
          />
        </div>
      </div>

      {/* displaying classes data */}
      <div className=" p-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
        {classes?.map((item) => (
          <div key={item._id} className="card bg-base-100 w-full shadow-md ">
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
                <span className="text-gray-800 font-bold">Subject:</span>

                <p className="text-gray-800 font-bold ">{item.subject}</p>
              </div>
              <div className="flex items-center gap-2 ">
                <span>
                  <FaCalendarAlt className="text-green-500 text-xl" />
                </span>
                <span className="text-green-500 font-bold">Upload Date:</span>
                <p className="text-gray-800 font-bold ">{item.uploadDate}</p>
              </div>

              <div className="divider">or</div>

              <div className="card-actions justify-end">
                <Link
                onClick={() => quizeIdHandle(item._id) }
                href='/classes/teacher/add-quize'
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <FaPlus className="mr-2" /> {/* Add icon */}
                  Add Quiz
                </Link>
                <button
                  onClick={() => router.push(`/classes/teacher/${item._id}`)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <FaEye className="mr-2" /> {/* Add the icon here */}
                  View
                </button>
                <button
                  onClick={() => handleDeleteClass(item._id)}
                  className="bg-red-500 text-white p-2 rounded flex items-center"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pagination for medium device */}
      <div className=" p-5 fixed bottom-0 lg:hidden bg-base-100 shadow-3xl w-full flex items-center justify-center ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            router.push(`/classes/teacher?page=${page}`);
          }}
        />
      </div>
    </div>
  );
}
