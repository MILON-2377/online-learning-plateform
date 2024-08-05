"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Pagination from "../pagination/Pagination";
import useTotalCoursesDataLoading from "@/dataFatching/useTotalCoursesDataLoading";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "@/AuthProvider/AuthProvider";
import { useDispatch } from "react-redux";
import { addSingleCourse } from "@/redux/reduxReducer/AddCourses/allCoursesSlicer";

// course categories
const courseCategories = [
  {
    id: "1",
    name: "Programming",
  },
  {
    id: "2",
    name: "Web Development",
  },
  {
    id: "3",
    name: "Data Science",
  },
  {
    id: "4",
    name: "Marketing",
  },
  {
    id: "5",
    name: "Design",
  },
  {
    id: "6",
    name: "Business",
  },
  {
    id: "7",
    name: "Finance",
  },
  {
    id: "8",
    name: "Health & Fitness",
  },
  {
    id: "9",
    name: "Personal Development",
  },
];

export default function Features() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState("");
  const dispatch = useDispatch();

  // handle pagination pages
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  // handle data loading
  const { coursesData, refetch, isLoading } = useTotalCoursesDataLoading(
    page,
    search,
    sort,
    filters
  );

  useEffect(() => {
    setCourses(coursesData.coursesData);
    setTotalCourses(coursesData.total);
    setCurrentPage(page);
  }, [coursesData, page]);

  const totalPages = totalCourses ? Math.ceil(totalCourses / 10) : 2;

  // data load pagination changes
  useEffect(() => {
    if (filters) {
      setSearch("");
    }

    refetch();
  }, [filters, page, sort]);

  // search handle
  const searchHandle = (e) => {
    e.preventDefault();
    setFilters("");
    refetch();
    e.target.reset();
  };

  // handle enroll now
  const handleErroll = (item) => {
    dispatch(addSingleCourse(item));
    if (!user) return router.push("/login");

    return router.push("/view-course");
  };

  return (
    <div className="w-[95%] relative md:w-full mx-auto lg:w-full px-5 py-16  bg-orange-100 bg-opacity-10 ">
      <h1 className="text-3xl mb-5 font-bold">Our courses</h1>

      {/* all courses displaying header section */}
      <div className="w-full flex items-center justify-between sm:gap-5 mb-10 ">
        <div className=" border border-gray-200 rounded-md flex items-center gap-5 ">
          {/* data filter section */}
          <select
            onChange={(e) => setFilters(e.target.value)}
            className="select w-full bg-white focus:border-none  focus:outline-none max-w-xs"
            defaultValue="Pick course"
          >
            <option disabled value="Pick course">
              Pick course
            </option>
            {courseCategories?.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>

          {/* data sorting section */}
          <select
            onChange={(e) => setSort(e.target.value)}
            className="select w-full bg-white focus:border-none  focus:outline-none max-w-xs"
            defaultValue="Sorte by"
          >
            <option disabled value="Sorte by">
              Sort by
            </option>
            <option value="Low to high">Low to high</option>
            <option value="High to low">High to low</option>
          </select>
        </div>

        {/* search filed */}
        <form onSubmit={searchHandle} className=" flex items-center ">
          <label className="border relative border-gray-200 px-4 py-3 rounded-md rounded-r-none bg-white  ">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="focus:outline-none border-none focus:border-none bg-transparent "
              type="search"
              placeholder="Search"
            />
            <span
              className={
                search.length > 0 ? "hidden" : "absolute top-4 right-4"
              }
            >
              <FaSearch className={"text-xl text-blue-500  "} />
            </span>
          </label>
          <button
            className={` ${
              search
                ? "transition-all duration-200 bg-blue-600 text-white "
                : ""
            } px-4 py-3 border border-gray-200 rounded-md rounded-l-none border-l-0 `}
          >
            Search
          </button>
        </form>

        {/* pagination */}
        <div className=" sm:hidden lg:block ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              router.push(`/?page=${page}`);
            }}
          />
        </div>
      </div>

      {/* divider */}
      <div className="divider mb-10"></div>

      {/* displaying courses */}
      <div className="grid lg:grid-cols-4 gap-5 mb-24 ">
        {courses?.map((item) => (
          <motion.div
            key={item._id}
            className="h-[400px] bg-white shadow-lg hover:cursor-pointer transition-all duration-200 hover:scale-150 transform "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleErroll(item)}
          >
            <div className="w-full h-[60%]">
              <img
                src={item?.thumbnailUrl}
                className="w-full h-full object-cover"
                alt={item.title}
              />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl text-gray-600 font-semibold">
                  {item.title}
                </h1>
                {/* <p className="text-sm text-gray-600">{item.description}</p> */}
              </div>
              <div>
                <p>
                  <span className="text-xl text-gray-600 font-bold">
                    Price :
                  </span>
                  <span className="text-xl ml-3 text-yellow-600">
                    ${item?.courseFee}
                  </span>
                </p>
                {item?.discountFee ? (
                  <>
                    <p>
                      <span className="text-xl text-gray-600 font-bold">
                        Discount :
                      </span>
                      <span className="text-xl ml-3 text-yellow-600">
                        ${item?.discountFee ? item?.discountFee : 0}
                      </span>
                    </p>
                    <p>
                      <span className="text-xl text-gray-600 font-bold">
                        Total :
                      </span>
                      <span className="text-xl ml-3 text-yellow-600">
                        ${item?.courseFee}
                      </span>
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>

              {/* button section */}
              <div>
                <button className=" px-4 py-3 rounded-md bg-blue-600 text-white ">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* medium device pagination */}
      <div className=" lg:hidden flex items-center justify-center p-10 bg-orange-50 absolute w-full bottom-0 mr-10 ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            router.push(`/?page=${page}`);
          }}
        />
      </div>
    </div>
  );
}
