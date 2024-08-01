"use client";

import MakeClasses from "@/components/Classes/Teacher/MakeClasses";
import axios from "axios";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBeer, FaClock, FaTimes } from "react-icons/fa";

export default function Dynamic() {
  const path = usePathname();

  if (path === "/classes/teacher/create") return CreateClassSchedule();
  if (path === "/classes/teacher/goLive") return GoLiveClass();
  if (path === "/classes/teacher/makeClass") return MakeClass();

  return ViewClassDetails();
}

// view class details
export function ViewClassDetails() {
  const params = useParams();
  const id = params.id;
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/create-class/${id}`);

        setClassData(res.data.classData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-16">
      <div className=" flex flex-col gap-5 lg:w-[50%] md:w-[80%] w-[95%] mx-auto ">
        <h1 className="text-3xl text-gray-600 font-bold ">
          {classData?.description}
        </h1>

        {/* thumnail section */}
        <div>
          <img
            className=" w-full h-[400px] "
            src={classData?.thumbnailURL}
            alt="thumbnail image"
          />
        </div>
      </div>

      <div className="divider lg:w-[50%] md:w-[80%] w-[95%] mx-auto ">or</div>

      {/* students comments box */}
      <div className="flex flex-col gap-5 lg:w-[50%] md:w-[80%] w-[95%] mx-auto">
        <label className="flex items-center gap-2">
          <span>
            <FaBeer className="text-xl text-gray-600 " />
          </span>
          <h1 className="text-2xl font-bold text-gray-600 ">
            Students Comments
          </h1>
        </label>

        <div>
          {classData?.comments?.map((item) => (
            <div className="flex flex-col gap-2" key={item._id}>
              <div className="w-16 h-16 rounded-full">
                <Image
                  className="w-full h-full rounded-full object-cover "
                  src={item?.photo}
                  alt="userPhoto"
                />
              </div>

              <div>
                <span className="text-xl text-gray-600 font-semibold ">
                  Name:{" "}
                </span>
                <span className="text-gray-600 font-medium">
                  {item?.userName}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl text-gray-600 font-semibold ">
                  <FaClock className="text-xl" />
                </span>
                <span className="text-gray-600 font-medium">
                  {item?.timestamp}
                </span>
              </div>

              <div>
                <span className="text-xl text-gray-600 font-semibold ">
                  Description:{" "}
                </span>
                <span className="text-gray-600 font-medium">{item?.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// create class schedule
export function CreateClassSchedule() {
  return <div>hello create class schedule</div>;
}

// go live class
export function GoLiveClass() {
  return <div>go live class</div>;
}

// make class
export function MakeClass() {
  return (
    <div>
      <MakeClasses></MakeClasses>
    </div>
  );
}

