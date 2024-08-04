"use client";

import Image from "next/image";
import banner1 from "../../../public/online1.jpg";

export default function Banner() {
  return (
    <div className=" mt-20 flex lg:flex-row bg-white  sm:flex-col-reverse justify-between">
      <div className=" lg:w-[60%] p-10 ">
        <Image
          className="w-[95%] lg:w-full rounded-full h-[400px] object-cover mx-auto mt-5 "
          src={banner1}
          alt="banner image"
        />
      </div>
      <div className="sm:w-[95%] lg:px-5 lg:flex-1 mx-auto flex flex-col justify-center gap-4 ">
        <h1 className="text-4xl font-bold ">{banner.title}</h1>
        <p className=" sm:w-[75%] lg:w-full text-xl font-semibold text-slate-600 ">
          {banner.description}
        </p>

        {/* latest course details */}
        <div></div>

        {/* btn section */}
        <div className=" ">
          <button className="btn ">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

// banner section
const banner = {
  id: 1,
  title: "Welcome to EduConnect!",
  description:
    "Unlock your potential with our wide range of courses and resources.",
};
