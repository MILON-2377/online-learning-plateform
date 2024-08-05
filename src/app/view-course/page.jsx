"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import axiosSecureApi from "@/Hooks/ApiRelatedHooks/AxiosSecureApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaDollarSign, FaFolder } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ViewCourse() {
  const { user } = useAuth();
  const singleCourse = useSelector((state) => state.courseReducer.singleCourse);
  const router = useRouter();

  //   handle buy button
  const handleBuyNow = async() => {

    const courseDetails = {
      userId:user?.email,
      courseId:singleCourse._id,
    }

    const res = await axiosSecureApi.post("/buy-course", {...courseDetails});
    console.log(res.data);

    // return router.push(`/payment`);
  };

  return (
    <div className="w-full h-full flex items-center justify-center mt-5 p-10 ">
      <div className=" w-full card lg:card-side ">
        <div className=" sm:w-[95%] lg:w-[40%] lg:h-[550px] sm:h-[400px] ">
          <img
            src={singleCourse?.thumbnailUrl}
            alt="Album"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">{singleCourse?.title}!</h2>
          <p>{singleCourse?.description}.</p>
          <div className="divider"></div>
          <div className="flex flex-col gap-2">
            <p className=" flex items-center justify-between ">
              <span className="text-xl font-semibold ">Course category</span>
              <span className="ml-1 text-[18px] text-cyan-500  ">
                {singleCourse?.courseCategory}
              </span>
            </p>

            <p className=" flex items-center justify-between ">
              <span className="text-xl font-semibold ">Course Fee</span>

              <span className=" flex items-center text-[20px] ">
                <FaDollarSign size={20} color="green" />
                {singleCourse?.courseFee}
              </span>
            </p>
          </div>
          <div className="card-actions justify-end mt-5">
            <button onClick={handleBuyNow} className="btn btn-primary">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
