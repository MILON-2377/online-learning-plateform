"use client";

import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";

export default function LogIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <div className="flex flex-col items-center h-screen w-full justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex lg:w-[50%] gap-6  justify-between p-10 "
      >
        <div className="flex flex-col w-full gap-5">
          <label>
            <span className="text-xl font-bold ">
              LogIn with email and password
            </span>
          </label>
          <label className="flex flex-col gap-1">
            <input
              className="px-3 py-1 placeholder:text-slate-500 focus:outline-none bg-transparent border-gray-200 border-b-2"
              placeholder="Email"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              type="email"
            />
            <span className="text-red-500 text-sm">
              {errors.email && `${errors.email.message}`}
            </span>
          </label>
          <label className="flex flex-col gap-1">
            <input
              className="px-3 py-1 placeholder:text-slate-500 focus:outline-none bg-transparent border-gray-200 border-b-2"
              placeholder="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character",
                },
              })}
              type="password"
            />
            <span className="text-red-500 text-sm ">
              {errors.email && `${errors.password.message}`}
            </span>
          </label>

          <button className="px-3 py-1  bg-blue-800 border-none text-white hover:text-white hover:bg-blue-500 rounded-full w-full">
            LogIn
          </button>
        </div>
        {/* divider */}
        <div class="flex flex-col w-5 items-center">
          <div className="w-[2px] h-full bg-gray-200 "></div>
          <span>or</span>
          <div className="w-[2px] h-full bg-gray-200 "></div>
        </div>

        <div className="flex flex-col  w-full gap-4">
          <h1 className="text-xl font-bold">LogIn with Social </h1>
          <button className="px-4 py-1 border flex items-center gap-2  border-gray-200 text-blue-700 hover:bg-gray-300 hover:text-blue-900 rounded-full w-full ">
            <FaGoogle />
            <span>Google</span>
          </button>
          <button className="px-4 flex items-center gap-2 py-1 border  border-gray-200 text-blue-700 hover:bg-gray-300 hover:text-blue-900 rounded-full w-full ">
            <FaFacebookF />
            <span>Facebook</span>
          </button>

          {/* sign page link */}
          <p className="flex items-center justify-between">
            <span className="text-[18px] ">Do not have an account?</span>
            <a
              href="/signup"
              className="text-[18px] text-blue-500 hover:underline "
            >
              SignUp
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
