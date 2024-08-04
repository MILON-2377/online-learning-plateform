"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import Loading from "@/components/Loading/Loading";
import axiosSecureApi from "@/Hooks/ApiRelatedHooks/AxiosSecureApi";
import QuizeId from "@/Hooks/useQuizeId";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function CreateCourse() {
  const { user } = useAuth();
  const id = QuizeId();
  const { register, handleSubmit, reset } = useForm();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //   course data loading handle
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

  const onSubmit = async (data) => {
     try {
        const res = await axiosSecureApi.put(`/course-create/${id}`, data);
        if(res.data.updateCourse){
          router.push("/courses/teacher/courses");
          Swal.fire({
            title: "Update Complete!",
            text: "Your data has been successfully updated!",
            icon: "success"
          });
        }
     } catch (error) {
        console.log(error.message);
     }
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <h1 className="text-4xl text-gray-600 font-bold mt-20 ">
        Create course video
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-5 p-10 lg:w-[50%] mt-5 border-t border-t-gray-200 "
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Title</span>
            <input
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none "
              placeholder="Enter the title"
              defaultValue={course?.title}
              {...register("title", { required: true })}
              type="text"
            />
          </div>

          {/* description */}
          <div className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Description</span>

            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered"
              placeholder="Enter the description"
              defaultValue={course?.description}
            ></textarea>
          </div>

          {/* Teachers name */}
          <div className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">
              Course Category
            </span>
            <select
              defaultValue={course?.courseCategory}
              {...register("subject", { required: true })}
              className="select border border-gray-200 focus:outline-none w-full "
            >
              {courseCatergories?.map((item, index) => (
                <option key={index + 1}>{item}</option>
              ))}
            </select>
          </div>

          {/* access label */}
          <div className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Course level</span>
            <select
              defaultValue={course?.courseLevel}
              {...register("accessLevel", { required: true })}
              className="select border border-gray-200 focus:outline-none w-full "
            >
              <option>Beginer</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div className="divider divider-horizontal ">or</div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Course fee</span>
            <input
              className="px-4 py-2 rounded-md border placeholder:text-black border-gray-200 focus:outline-none "
              defaultValue={course?.courseFee}
              {...register("courseFee", { required: true })}
              placeholder={course?.courseFee}
              type="number"
            />
          </div>

          {/* dicount fee */}
          <div className="flex flex-col gap-2">
            <span className=" font-semibold text-gray-600 ">Discount</span>
            <input
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none "
              placeholder="Discount"
              {...register("discount", { required: true })}
              type="number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className=" font-semibold text-gray-600 ">Discount code</span>
            <input
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none "
              placeholder="Discount code"
              {...register("discountCode", { required: true })}
              type="text"
            />
          </div>

          {/* Thumnail URL */}
          {/* <div className="flex flex-col gap-2">
            <div className=" font-semibold text-gray-600 ">
              Upload thumbnail Picture
            </div>
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              id="file-upload"
              {...register("thumbnailUrl")}
              type="file"
            />
          </div> */}

          <button className="btn w-full">Save</button>
        </div>
      </form>
    </div>
  );
}

// course categories data
const courseCatergories = [
  "Programming",
  "Web Design",
  "Data Science",
  "Marketing",
  "Design",
  "Database",
  "Cloud Computing",
  "Mobile Development",
  "Version Control",
  "Game Development",
  "Cybersecurity",
  "Artificial Intelligence",
  "Networking",
  "Software Engineering",
  "Project Management",
];
