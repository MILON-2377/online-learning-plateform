"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function MakeClasses() {

  const {user} = useAuth();
  const { register, handleSubmit, reset } = useForm();

  // console.log(user);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/create-class", { ...data, teacherId:user.email, teacherName: user.userName });
      if (res.data.saveClass) {
        Swal.fire({
          title: "Success!",
          text: "Recorded class saved successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem saving the recorded class",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <h1 className="text-4xl text-gray-600 font-bold mt-20 ">Create class video</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-5 p-10 lg:w-[40%] mt-5 border-t border-t-gray-200 "
      >
        <div className="flex flex-col gap-5">
          <label className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Title</span>
            <input
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none "
              placeholder="Enter the title"
              {...register("title", { required: true })}
              type="text"
            />
          </label>

          {/* description */}
          <label className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Description</span>
            <input
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none "
              placeholder="Enter the description"
              {...register("description", { required: true })}
              type="text"
            />
          </label>

          {/* Teachers name */}
          <label className="flex gap-1 flex-col">
          <span className=" font-semibold text-gray-600 ">Subject</span>
            <select
              defaultValue=""
              {...register("subject", { required: true })}
              className="select border border-gray-200 focus:outline-none w-full "
            >
              <option disabled value="">
                Select subject
              </option>
              <option>Math</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
              <option>English</option>
            </select>
          </label>

          {/* access label */}
          <label className="flex gap-1 flex-col">
          <span className=" font-semibold text-gray-600 ">Access level</span>
            <select
              defaultValue=""
              {...register("accessLevel", { required: true })}
              className="select border border-gray-200 focus:outline-none w-full "
            >
              <option disabled value="">
                Select access level
              </option>
              <option>Public</option>
              <option>Private</option>
              <option>Restricted</option>
            </select>
          </label>
        </div>

        <div className="divider divider-horizontal ">or</div>

        <div className="flex flex-col gap-5">
          {/* Scheduled date */}
          <label className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">
              Scheduled Date
            </span>
            <input
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none "
              placeholder="Enter your name"
              {...register("scheduledDate", { required: true })}
              type="date"
            />
          </label>

          {/* duration */}
          <label className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Video URL</span>
            <input
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none "
              placeholder="Enter the video URL"
              {...register("videoURL", { required: true })}
              type="text"
            />
          </label>

          {/* Thumnail URL */}
          <label className="flex gap-1 flex-col">
            <span className=" font-semibold text-gray-600 ">Thumnail URL</span>
            <input
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none "
              placeholder="Enter the thumnail URL"
              {...register("thumnailURL", { required: true })}
              type="text"
            />
          </label>

          <button className="btn w-full">Save</button>
        </div>
      </form>
    </div>
  );
}
