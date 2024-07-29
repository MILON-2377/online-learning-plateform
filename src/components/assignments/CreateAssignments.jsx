"use client";

import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateAssignments() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [dueDateRange, setDueDateRange] = useState([null, null]);

  const onSubmit = async (data) => {
    try {
      const assignmentsRes = await axios.post("/api/create-assignments", {
        ...data,
      });

      if (assignmentsRes.data.message) {
        Swal.fire({
          title: "Success!",
          text: "Assignment created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center  mx-auto p-5 flex-col ">
      <div className="p-5">
        <h1 className="text-3xl font-bold ">Create New Assignment</h1>
      </div>
      <div className="divider">or</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full flex flex-col lg:flex-row lg:justify-between gap-5 p-10 "
      >
        <div className="w-full flex flex-col gap-5 ">
          <label className="flex flex-col gap-1 ">
            <span className="text-xl text-gray-500 ">Title</span>
            <input
              {...register("title", { required: "title is required" })}
              className="px-4 py-2 rounded-md border focus:outline-none border-gray-200 "
              placeholder="Enter assignment title"
              type="text"
            />
          </label>

          {/* description */}
          <label className="flex flex-col gap-1 ">
            <span className="text-xl text-gray-500 ">Description</span>
            <textarea
              {...register("description", {
                required: "description is required",
              })}
              className="textarea border border-gray-200 focus:outline-none  "
              placeholder="Enter assignments description"
            ></textarea>
          </label>

          {/* due date  */}
          <div className="w-full">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              <span className="text-xl text-gray-500">Due Date</span>
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="relative w-full">
                <DatePicker
                  {...register("dueDate")}
                  value={dueDateRange[0]}
                  onChange={(newValue) =>
                    setDueDateRange([newValue, dueDateRange[1]])
                  }
                  components={{
                    TextField: (props) => (
                      <TextField
                        {...props}
                        className="mt-1 block w-full px-3 py-1 border -z-10 border-gray-200 rounded-md"
                      />
                    ),
                  }}
                  format="YYYY-MM-DD"
                  required
                />
              </div>
            </LocalizationProvider>
          </div>

          {/* subject/course */}
          <label className="flex flex-col gap-1 ">
            <span className="text-xl text-gray-500 ">Subject</span>
            <select
              defaultValue=""
              {...register("subject", { required: "subject is required" })}
              className="select border border-gray-200 focus:outline-none "
            >
              <option disabled value="">
                Select the subject
              </option>
              <option>Math</option>
              <option>English</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
              <option>History</option>
            </select>
          </label>
        </div>

        <div className="divider lg:divider-horizontal">or</div>

        <div className="w-full flex flex-col gap-5 ">
          {/* attached file */}
          <label className="flex flex-col gap-1 ">
            <span className="text-xl text-gray-500 ">Priority</span>
            <select
              {...register("priority", { required: "priority is required" })}
              defaultValue=""
              className="select border border-gray-200 focus:outline-none w-full "
            >
              <option disabled value="">
                Select priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          {/* instructions */}
          <label className="flex flex-col gap-1 ">
            <span className="text-xl text-gray-500 ">Instructions</span>
            <textarea
              {...register("instructions", {
                required: "instructions is required",
              })}
              className="textarea border border-gray-200 focus:outline-none"
              placeholder="Provide any additional instructions"
            ></textarea>
          </label>

          <button className=" btn bg-blue-700 hover:bg-blue-500 text-white w-full ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
