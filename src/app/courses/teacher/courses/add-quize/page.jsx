"use client";

import QuizesDisplaying from "@/components/Classes/Teacher/QuizesDisplaying";
import {
  addQuize,
  resetQuize,
} from "@/redux/reduxReducer/AddQuizes/addQuizeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddQuizes() {
  const [quizeName, setQuizeName] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [quizesError, setQuizesError] = useState("");
  const [allQuizes, setAllQuizes] = useState([]);
  const [quizeNumber, setQuizeNumber] = useState(0);
  const dispatch = useDispatch();
  const quizeSubject = useSelector((state) => state.subject);

  // handle add quize
  const handleAddQuize = (e) => {
    e.preventDefault();

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
      quizeName,
      option1,
      option2,
      option3,
      option4,
      correctOption,
    };
    dispatch(addQuize(allQuizes));

    const quzeNum = quizeNumber + 1;
    setQuizeNumber(quzeNum);
    
    e.target.reset();
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
    <div className="p-10  ">
      <div className=" w-full flex  sm:flex-col lg:flex-row lg:justify-between gap-10 ">
        <div className="w-full p-5 ">
          <div className="w-full  ">
            <h1 className="text-3xl font-bold text-gray-600 text-center ">
              Create a New Quize
            </h1>
          </div>
          <div className="divider"></div>
          <div className="w-full">
            <form
              onSubmit={handleAddQuize}
              className="flex items-center justify-between gap-5 "
            >
              <div className=" w-full flex flex-col  gap-5 ">
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
                    Option1
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
                    Option2
                  </span>
                  <input
                    onChange={(e) => setOption2(e.target.value)}
                    className=" w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none "
                    placeholder="EnterAdd Option2"
                    type="text"
                  />
                </label>
                <label className="flex flex-col gap-1 w-full">
                  <span className="text-gray-600 text-xl font-semibold ">
                    Option3
                  </span>
                  <input
                    onChange={(e) => setOption3(e.target.value)}
                    className=" w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none "
                    placeholder="Enter Add Option3"
                    type="text"
                  />
                </label>
              </div>

              <div className="divider divider-horizontal">or</div>
              <div className=" w-full flex flex-col  gap-5 ">
                <label className="flex flex-col gap-1 w-full">
                  <span className="text-gray-600 text-xl font-semibold ">
                    Option4
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
                <div className="py-1">
                  <p className="py-[22px]"></p>
                  <button
                    className={` ${
                      allQuizes.length > 0 ? "bg-blue-600" : "bg-blue-500"
                    } cursor-pointer w-full border  active:bg-blue-300 hover:bg-blue-400 text-white px-4 py-3 rounded-md  active:scale-95 transition-all duration-95 `}
                  >
                    Add Quize
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className=" hidden lg:flex items-center flex-col justify-between ">
          <div className="h-full w-[2px] bg-gray-200  "></div>
          <span>or</span>
          <div className="h-full w-[2px] bg-gray-200  "></div>
        </div>

        {/* quizes displaying section */}
        <div className="w-full">
          <QuizesDisplaying />
        </div>
      </div>

      {/* react toastify section */}
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}
