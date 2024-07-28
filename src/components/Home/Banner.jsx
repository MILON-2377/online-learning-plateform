"use client";

import Image from "next/image";
import banner1 from "../../../public/banner.jpg";

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
      <div className="sm:w-[95%] lg:px-5 lg:flex-1 mx-auto flex flex-col gap-4 ">
        <h1 className="text-4xl font-bold ">{banner.title}</h1>
        <p className=" sm:w-[75%] lg:w-full text-xl font-semibold text-slate-600 ">
          {banner.description}
        </p>

        {/* latest course details */}
        <div></div>

        {/* btn section */}
        <div>
          <button className="text-xl px-4 py-2 bg-sky-800 bg-opacity-90 hover:bg-sky-900 hover:bg-opacity-75 hover:text-white text-gray-200 border-none ">
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
  title: "Welcome to LearnAcademy!",
  description:
    "Unlock your potential with our wide range of courses and resources. At LearnAcademy, we offer expertly crafted courses designed to help you excel in your chosen field. Whether you're looking to advance your career, gain new skills, or explore a new subject, our platform provides high-quality educational content and interactive learning experiences. Start your learning journey today and join a community of passionate learners dedicated to personal and professional growth.",
};
