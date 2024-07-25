"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import signUpImg from "../../../public/signup2.jpg";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <div className="bg-gray-100 w-full h-screen flex items-center justify-center  ">
      <div className="flex-1 h-screen">
        <Image
          className="w-full h-full object-cover "
          src={signUpImg}
          alt="signup image"
        />
      </div>
      <form className=" p-5 md:p-10 lg:p-20 w-[95%] md:w-[60%] lg:w-[40%] ">
        <div className="flex flex-col w-full gap-5">
          <label>
            <span className="text-xl font-bold ">Get Started with Your New Account</span>
          </label>

          <select
            {...register("Profession", { required: true })}
            className="select w-full bg-transparent text-gray-400 border-b-[2px] focus:outline-none focus:border-none border-b-white rounded-none "
          >
            <option disabled selected value="">
              Pick your profession
            </option>
            <option>Student</option>
            <option>Teacher</option>
          </select>

          <label className="flex flex-col gap-1">
            <input
              className="px-3 py-1 placeholder:text-gray-400 focus:outline-none bg-transparent border-white border-b-2"
              placeholder="Name"
              {...register("fullName", {
                required: "Required",
              })}
              type="text"
            />
          </label>
          <label className="flex flex-col gap-1">
            <input
              className="px-3 py-1 placeholder:text-gray-400 focus:outline-none bg-transparent border-white border-b-2"
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
              className="px-3 py-1 placeholder:text-gray-400 focus:outline-none bg-transparent border-white border-b-2"
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
            Sign Up
          </button>
        </div>

        {/* sign page link */}
        <p className="mt-5 flex items-center gap-5">
          <span className="text-[18px] ">Already have an account?</span>
          <a
            href="/signup"
            className="text-[18px] text-blue-500 hover:underline "
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
