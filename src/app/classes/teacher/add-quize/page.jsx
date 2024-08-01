"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddQuizes() {
  const [subject, setSubject] = useState("");
  const [quizeName, setQuizeName] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [quizesError, setQuizesError] = useState("");

  const handleNextQuize = () => {
    if (subject.length === 0) {
      return setQuizesError("Subject is required");
    }
    if (quizeName.length === 0) {
      return setQuizesError("quize name is required");
    }
    if (option1.length === 0) {
      return setQuizesError("option1 is required");
    }
    if (option2.length === 0) {
      return setQuizesError("option2 is required");
    }
    if (option3.length === 0) {
      return setQuizesError("option3 is required");
    }
    if (option4.length === 0) {
      return setQuizesError("option4 is required");
    }
    if (correctOption.length === 0) {
      return setQuizesError("correctOption is required");
    }

    const allQuizes = {
      subject,
      quizeName,
      option1,
      option2,
      option3,
      option4,
      correctOption,
    };

    console.log(allQuizes);
  };

  //toastify handle
  useEffect(() => {
    const notify = () => {
      toast(`${quizesError}`);
    };

    if (quizesError.length > 0) {
      notify();
    }
  }, [quizesError]);

  return (
    <div className="p-10 lg:w-[50%] md:w-[90%] w-[95%] mx-auto  ">
      <div className="p-5 border-b border-gray-200 w-full ">
        <h1 className="text-3xl font-bold text-gray-600 text-center ">
          Create a New Quize
        </h1>
      </div>

      <div className="p-5">
        <div className="w-full  ">
          <div className="flex items-center justify-between gap-5 ">
            <div className=" w-full flex flex-col  gap-5 ">
              <label className="flex flex-col gap-1 w-full ">
                <span className="text-gray-600 text-xl font-semibold ">
                  Subject
                </span>
                <select
                  defaultValue=""
                  onChange={(e) => setSubject(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Select subject
                  </option>
                  <option>Math</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>English</option>
                </select>
              </label>

              <label className="flex flex-col gap-1 w-full">
                <span className="text-gray-600 text-xl font-semibold ">
                  Quize Name
                </span>
                <input
                  onChange={(e) => setQuizeName(e.target.value)}
                  className=" w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none "
                  placeholder="Enter quize name"
                  type="text"
                />
              </label>

              <label className="flex flex-col gap-1 w-full">
                <span className="text-gray-600 text-xl font-semibold ">
                  Add Option1
                </span>
                <input
                  onChange={(e) => setOption1(e.target.value)}
                  className=" w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none "
                  placeholder="Enter quize Add Option1"
                  type="text"
                />
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span className="text-gray-600 text-xl font-semibold ">
                  Add Option2
                </span>
                <input
                  onChange={(e) => setOption2(e.target.value)}
                  className=" w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none "
                  placeholder="EnterAdd Option2"
                  type="text"
                />
              </label>
            </div>

            <div className="divider divider-horizontal">or</div>
            <div className=" w-full flex flex-col  gap-5 ">
              <label className="flex flex-col gap-1 w-full">
                <span className="text-gray-600 text-xl font-semibold ">
                  Add Option3
                </span>
                <input
                  onChange={(e) => setOption3(e.target.value)}
                  className=" w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none "
                  placeholder="Enter Add Option3"
                  type="text"
                />
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span className="text-gray-600 text-xl font-semibold ">
                  Add Option4
                </span>
                <input
                  onChange={(e) => setOption4(e.target.value)}
                  className=" w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none "
                  placeholder="Enter Add Option4"
                  type="text"
                />
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span className="text-gray-600 text-xl font-semibold ">
                  Correct Option
                </span>
                <input
                  onChange={(e) => setCorrectOption(e.target.value)}
                  className=" w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none "
                  placeholder="Enter Correct Option"
                  type="text"
                />
              </label>

              <div className="w-full flex gap-5 items-center justify-between py-4 ">
                <button
                  disabled
                  className=" cursor-pointer w-full border border-gray-200 bg-gray-100 active:bg-gray-50 hover:bg-gray-200 px-4 py-3 rounded-md  active:scale-95 transition-all duration-95 "
                >
                  Previous
                </button>
                <button
                  onClick={handleNextQuize}
                  className=" cursor-pointer w-full border border-gray-200 bg-gray-100 active:bg-gray-50 hover:bg-gray-200 px-4 py-3 rounded-md  active:scale-95 transition-all duration-95 "
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className=" mt-5 w-full px-4 py-3 rounded-md bg-blue-700 text-white hover:bg-blue-500 active:bg-blue-400 active:scale-95 transition-all duration-95 ">
          Submit All Quizes
        </button>
      </div>

      {/* react toastify section */}
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}
