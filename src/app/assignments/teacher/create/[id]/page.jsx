"use client";

import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading/Loading";

export default function EditAssignmentPage() {
  const params = useParams();
  const [assignemnt, setAssignment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataFetching = async () => {
      try {
        const res = await axios.get(`/api/create-assignments/${params.id}`);
        if (res.data) {
          setAssignment(res.data.assignment);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    };

    dataFetching();

  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dueDate: assignemnt.dueDate,
    },
  });
  const [dueDateRange, setDueDateRange] = useState([null, null]);

  const onSubmit = (data) => {
    console.log(data);
  };


  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-center  mx-auto p-5 flex-col ">
        <div className="p-5">
          <h1 className="text-3xl font-bold ">Edit Assignment</h1>
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
                placeholder={`${assignemnt?.title}`}
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
                placeholder = {`${assignemnt?.description}`}
              ></textarea>
            </label>

            <div className="w-full">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                <span className="text-xl text-gray-500">Due Date</span>
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="relative w-full">
                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <DatePicker
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputRef={ref}
                            className="mt-1 block w-full px-3 py-1 border -z-10 border-gray-200 rounded-md"
                          />
                        )}
                      />
                    )}
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
                <option disabled value={assignemnt.subject}>
                  {assignemnt?.subject}
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
                <option disabled value={assignemnt.priority}>
                  {assignemnt.priority}
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
                placeholder = {`${assignemnt?.instructions}`}
              ></textarea>
            </label>

            <button className=" btn bg-blue-700 hover:bg-blue-500 text-white w-full ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
