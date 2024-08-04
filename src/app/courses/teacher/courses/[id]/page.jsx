"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import Loading from "@/components/Loading/Loading";
import axiosSecureApi from "@/Hooks/ApiRelatedHooks/AxiosSecureApi";
import QuizeId from "@/Hooks/useQuizeId";
import { quizeIdAdd } from "@/redux/reduxReducer/AddQuizes/addQuizeSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ViewCourse() {
  const { user } = useAuth();
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  // data loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecureApi.get(`/course-create/${id}`);
        setCourse(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);


  if (loading) return <Loading />;

  return (
    <div>
      <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
        <article className="space-y-8  text-gray-600">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
              {course?.description}
            </h1>
            <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-400">
              <div className="flex items-center md:space-x-2">
                <p className="text-sm">{user?.userName} • July 19th, 2021</p>
              </div>
              <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                {course?.watchTime} • 1,570 views
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p>
              <span className="text-xl text-green-600 font-bold">
                Total Enrolled :
              </span>
              <span className="text-xl ml-2 font-bold text-yellow-500">
                {course?.totalEnrolled ? course?.totalEnrolled : 0}
              </span>
            </p>
            <p>
              <span className="text-xl text-green-600 font-bold">
                Total watch time :
              </span>
              <span className="text-xl font-bold ml-2 text-yellow-500">
                {course?.totalWatchTime ? course?.totalWatchTime : 0}
              </span>
            </p>
            <p>
              <span className="text-xl text-green-600 font-bold">
                Total Earned :
              </span>
              <span className="text-xl ml-2 font-bold text-yellow-500">
                {course?.totalEarned ? course?.totalEarned*course?.totalEnrolled : 0}
              </span>
            </p>
            
          </div>
          
        </article>
        <div>
          <div className="divider"></div>

          {/* actions buttons */}
          <div className="flex items-center justify-between mb-8 ">
            <button 
            onClick={() => {
              dispatch(quizeIdAdd(course._id));
              router.push('/courses/teacher/courses/add-quize');
            }}
            className="btn">Add Quize</button>
            <button className="btn">Add new videos</button>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Students Comments</h4>
            <div>
              <div className=" w-16 h-16 rounded-full bg-gray-200 "></div>
              <p className="text-gray-600 p-5 ">
                {course.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
