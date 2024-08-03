"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import axiosSecureApi from "@/Hooks/ApiRelatedHooks/AxiosSecureApi";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function CreateCourse() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, watch } = useForm();

  // watch the file inputs
  const videoUrl = watch("videoUrl");
  const thumbnailUrl = watch("thumbnailUrl");

  const onSubmit = async (data) => {

    const formData = new FormData();


    // append form fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("courseCategory", data.courseCategory);
    formData.append("corseLevel", data.corseLevel);
    formData.append("courseFee", data.courseFee);
    formData.append("teacherId", user?.email);
    formData.append("teacherName", user?.userName);


    // append file
    if(videoUrl && videoUrl.length > 0){
      formData.append("videoUrl", videoUrl[0]);
    }

    if(thumbnailUrl && thumbnailUrl.length > 0){
      formData.append("thumbnailUrl", thumbnailUrl[0]);
    }

    try {
      const res = await axiosSecureApi.post("/course-create", {formData});
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }

    // try {
    //   const res = await axios.post("/api/create-class", { ...data, teacherId:user.email, teacherName: user.userName });
    //   if (res.data.saveClass) {
    //     Swal.fire({
    //       title: "Success!",
    //       text: "Recorded class saved successfully",
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     });
    //     reset();
    //   }
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire({
    //     title: "Error!",
    //     text: "There was a problem saving the recorded class",
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   });
    // }
  };

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
            ></textarea>
          </div>

          {/* Teachers name */}
          <div className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">
              Course Category
            </span>
            <select
              defaultValue=""
              {...register("subject", { required: true })}
              className="select border border-gray-200 focus:outline-none w-full "
            >
              <option disabled value="">
                Select course category
              </option>
              <option>Math</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
              <option>English</option>
            </select>
          </div>

          {/* access label */}
          <div className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Course level</span>
            <select
              defaultValue=""
              {...register("accessLevel", { required: true })}
              className="select border border-gray-200 focus:outline-none w-full "
            >
              <option disabled value="">
                Select course level
              </option>
              <option>Beginer</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div className="divider divider-horizontal ">or</div>

        <div className="flex flex-col gap-5">
          {/* Scheduled date */}
          <div className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Course fee</span>
            <input
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none "
              placeholder="Enter course fee"
              {...register("courseFee", { required: true })}
              type="number"
            />
          </div>

          {/* video file uploading */}
          <div className="flex flex-col gap-2">
            <div className=" font-semibold text-gray-600 " >
              Upload video file
            </div>
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              id="file-upload"
              {...register("videoUrl",)}
              type="file"
            />
          </div>

          {/* Thumnail URL */}
          <div className="flex flex-col gap-2">
            <div className=" font-semibold text-gray-600 " >
              Upload thumbnail file
            </div>
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              id="file-upload"
              {...register("thumbnailUrl")}
              type="file"
            />
          </div>

          <button className="btn w-full">Save</button>
        </div>
      </form>
    </div>
  );
}
