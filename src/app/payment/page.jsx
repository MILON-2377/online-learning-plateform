"use client";

import CheckOut from "@/StribePaymentGateWay/CheckoutForm";
import { FaDownload } from "react-icons/fa";
import logo2 from "../../../public/logo2.png";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function PaymentPage() {
  const singleCourse = useSelector((state) => state.courseReducer.singleCourse);

  const fee = singleCourse?.courseFee;
  const discount = singleCourse?.courseDiscount;
  const tax = singleCourse?.tax;

  return (
    <div className=" w-full h-full flex lg:flex-row sm:flex-col items-center justify-between gap-10 p-10 ">
      <div className="w-[95%] mx-auto lg:w-[40%] ">
        {/* header and logo */}
        <div className="flex items-center gap-3 mb-10">
          <div>
            <Image
              className="w-24 h-24 object-cover"
              src={logo2}
              alt="logo"
              priority
            />
          </div>
          <h1 className=" text-3xl font-bold text-cyan-500 ">EduConnect</h1>
        </div>

        {/* payment details */}
        <div className=" flex flex-col gap-4">
          <p className="text-xl font-semibold text-indigo-600">{singleCourse?.title}</p>
          <p className="text-xl flex items-center justify-between text-indigo-500">
            Course Fee
            <span className="text-gray-400 text-xl">${singleCourse?.courseFee ? singleCourse?.courseFee : "0.00"}</span>
          </p>
          <p className="text-xl flex items-center justify-between text-indigo-500">
            Discount
            <span className="text-gray-400 text-xl">${singleCourse?.courseDiscount ? singleCourse?.courseDiscount : "0.00"}</span>
          </p>
          <p className="text-xl flex items-center justify-between text-indigo-500">
            Tax
            <span className="text-gray-400 text-xl">${singleCourse?.tax ? singleCourse?.tax : "0.00"}</span>
          </p>

          <div className="divider"></div>
          <p className="flex items-center justify-between">
            <span className="text-xl text-indigo-500">Total</span>
            <span className="text-xl font-bold text-blue-800 ">${discount || tax ? fee - discount + tax : fee}</span>
          </p>
        </div>

        {/* invoice details */}
        <div className="flex items-center gap-2 mt-10">
          <span>
            <FaDownload className="text-xl text-cyan-500 font-bold " />
          </span>
          <span className="text-xl text-indigo-500 ">
            Download the invoice in PDF format
          </span>
        </div>
      </div>

      {/* divider */}
      <div className="divider sm:divider-vertical lg:divider-horizontal">
        or
      </div>

      {/* checkout form */}
      <div className=" sm:w-[50%] lg:w-[30%] w-[95%]  p-5 mx-auto mt-20 ">
        <CheckOut />
      </div>
    </div>
  );
}
