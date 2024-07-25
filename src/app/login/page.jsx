"use client";

import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";

export default function LogIn() {
  const { register } = useForm();

  return (
    <div className="flex flex-col items-center bg-gray-200 h-screen w-full justify-center">
      <form className="flex lg:w-[50%] gap-6  justify-between p-10 ">
        <div className="flex flex-col w-full gap-5">
          <label>
            <span className="text-xl font-bold ">LogIn with email and password</span>
          </label>
          <label className="flex flex-col gap-1">
            <input
              className="px-3 py-1 placeholder:text-white focus:outline-none bg-transparent border-white border-b-2"
              placeholder="Email"
              {...register("email", { required: "email is required" })}
              type="email"
            />
          </label>
          <label className="flex flex-col gap-1">
            <input
              className="px-3 py-1 placeholder:text-white focus:outline-none bg-transparent border-white border-b-2"
              placeholder="password"
              {...register("password", { required: "password is required" })}
              type="password"
            />
          </label>
          <button className="px-3 py-1  bg-blue-800 border-none text-white hover:text-white hover:bg-blue-500 rounded-full w-full">
            LogIn
          </button>
        </div>
        <div className="divider w-1 divider-horizontal text-blue-600 ">OR</div>
        <div className="flex flex-col  w-full gap-4">
          <h1 className="text-xl font-bold">Social logIn </h1>
          <button className="px-4 py-1 border flex items-center gap-2  border-white text-blue-700 hover:bg-gray-300 hover:text-blue-900 rounded-full w-full ">
          <FaGoogle />
            <span>Google</span>
          </button>
          <button className="px-4 flex items-center gap-2 py-1 border  border-white text-blue-700 hover:bg-gray-300 hover:text-blue-900 rounded-full w-full ">
          <FaFacebookF />
            <span>Facebook</span>
          </button>
        </div>
      </form>
    </div>
  );
}
