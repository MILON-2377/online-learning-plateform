"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";

export default function LogIn() {
  const { logInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [profession, setProfession] = useState("");

  const onSubmit = (data) => {};

  // google login
  const googleLogIn = () => {
    document.getElementById("my_modal_4").showModal();
  };

  const submit = (e) => {
    e.preventDefault();
    logInWithGoogle()
      .then(async (response) => {
        const email = response.user.email;
        const userName = response.user.displayName;
        console.log(response);
        try {
          const res = await axios.post("/api/createUser", {
            userName,
            email,
            profession,
          });

          if (res.data) {
            console.log(res.data);
            // router.push("/");
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <div className="flex flex-col w-5 items-center">
          <div className="w-[2px] h-full bg-gray-200 "></div>
          <span>or</span>
          <div className="w-[2px] h-full bg-gray-200 "></div>
        </div>

        <div className="flex flex-col  w-full gap-4">
          <h1 className="text-xl font-bold">LogIn with Social </h1>
          <button
            onClick={googleLogIn}
            className="px-4 py-1 border flex items-center gap-2  border-gray-200 text-blue-700 hover:bg-gray-300 hover:text-blue-900 rounded-full w-full "
          >
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

      {/* open modal section */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div>
            <form onSubmit={submit} className="flex flex-col gap-1">
              <label className="flex flex-col gap-1">
                <span>Choose your profession</span>

                <select
                  onChange={(e) => setProfession(e.target.value)}
                  className="select w-full bg-transparent text-gray-600 border border-gray-200 focus:outline-none  rounded-md "
                >
                  <option disabled value="">
                    Pick your profession
                  </option>
                  <option>Student</option>
                  <option>Teacher</option>
                </select>
              </label>
              <button className="mt-5 px-4 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-500 w-full ">
                LogIn
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
