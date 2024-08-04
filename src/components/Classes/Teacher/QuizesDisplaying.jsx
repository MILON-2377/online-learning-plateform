"use client";

import {
  editQuize,
  removeQuize,
  resetQuize,
} from "@/redux/reduxReducer/AddQuizes/addQuizeSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function QuizesDisplaying() {
  const totalQuizes = useSelector((state) => state.quizes);
  const quizeId = useSelector((state) => state.quizeId);
  const [currentQuize, setCurrentQuize] = useState(1);
  const [quize, setQuize] = useState({});
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [quizeOptions, setQuizeOptions] = useState(["A", "B", "C", "D"]);
  const [isConfirmReach, setConfirmReach] = useState(false);
  const router = useRouter();

  // handle current displaying quize
  const handleNext = () => {
    if (currentQuize === totalQuizes.length) {
      return;
    }

    if (currentQuize === totalQuizes.length - 1) {
      setConfirmReach(true);
    }

    const newCurrentQuize = currentQuize + 1;
    setCurrentQuize(newCurrentQuize);
  };

  //handle previous quize displaying
  const handlePreviousQuizeView = () => {
    if (currentQuize === 1) {
      return;
    }

    const previousQuize = currentQuize - 1;
    setCurrentQuize(previousQuize);
    setConfirmReach(false);
  };

  useEffect(() => {
    setQuize(totalQuizes[currentQuize - 1]);
  }, [currentQuize, totalQuizes]);

  //handle remove quizes
  const handleRemoveQuizes = (id) => {
    dispatch(removeQuize(id));
    handlePreviousQuizeView();
  };

  //   handle edit quize
  const onSubmit = (data) => {
    dispatch(editQuize({ ...data, id: quize.id }));
    setEdit(false);
  };

  // handle data store to the database
  const handleDataStore = async () => {
    try {
      const res = await axios.post("/api/quize-create", {
        totalQuizes,
        id:quizeId,
      });
      if (res.data.message) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Quizzes have been saved successfully.",
          confirmButtonText: "OK",
        });
        router.push("/courses/teacher/courses");
        dispatch(resetQuize("success"));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full p-5 ">
      <div className="flex items-center justify-between ">
        <div className=" flex items-center ">
          <p className="text-blue-700 text-xl font-semibold ">
            Current Quize Number :
          </p>
          <p className=" w-10 h-10 p-2 bg-yellow-500 text-center font-bold text-xl rounded-full text-white ml-2 border border-gray-200 ">
            {totalQuizes.length > 0 ? currentQuize : 0}
          </p>
        </div>

        <div className=" flex items-center gap-2 ">
          <p className="text-blue-700 text-xl font-semibold ">Total quizes:</p>
          <p className=" w-10 h-10 p-2 rounded-full bg-yellow-500 border text-xl font-bold text-center text-white border-gray-200 ">
            {totalQuizes.length}
          </p>
        </div>
      </div>

      <div className="divider"></div>

      <div className=" flex items-center justify-between gap-5 ">
        <button
          onClick={handlePreviousQuizeView}
          className=" w-32 px-4 py-3 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-300 duration-200 "
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className=" w-32 px-4 py-3 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-300 duration-200 "
        >
          Next
        </button>
      </div>

      {/* quizes displaying */}
      <div className=" mt-10 ">
        {totalQuizes.length > 0 ? (
          isEdit ? (
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" flex flex-col gap-5 "
              >
                <div className=" flex items-center justify-between ">
                  <label className=" text-xl text-green-500 font-semibold ">
                    <span>{totalQuizes.length > 0 ? currentQuize : 0}.</span>
                    <input
                      defaultValue={quize?.quizeName}
                      className="px-4 py-3 focus:outline-none border border-gray-200 rounded-md "
                      {...register("quizeName", { required: true })}
                      type="text"
                    />
                  </label>
                  <div className=" flex items-center gap-5 ">
                    <button className="btn">Edit Confirm</button>
                  </div>
                </div>
                <div className=" grid grid-cols-2 gap-5 ">
                  <label>
                    <input
                      defaultValue={quize?.options[0]}
                      {...register("option1", { required: true })}
                      className="px-4 py-3 focus:outline-none border border-gray-200 rounded-md "
                      type="text"
                    />
                  </label>
                  <label>
                    <input
                      defaultValue={quize?.options[1]}
                      {...register("option2", { required: true })}
                      className="px-4 py-3 focus:outline-none border border-gray-200 rounded-md "
                      type="text"
                    />
                  </label>
                  <label>
                    <input
                      defaultValue={quize?.options[2]}
                      {...register("option3", { required: true })}
                      className="px-4 py-3 focus:outline-none border border-gray-200 rounded-md "
                      type="text"
                    />
                  </label>
                  <label>
                    <input
                      defaultValue={quize?.options[3]}
                      {...register("option4", { required: true })}
                      className="px-4 py-3 focus:outline-none border border-gray-200 rounded-md "
                      type="text"
                    />
                  </label>
                  <label className="flex flex-col gap-1 ">
                    <span className="text-xl text-gray-600 font-semibold ">
                      Correct Option
                    </span>
                    <input
                      defaultValue={quize?.correctOption}
                      {...register("correctOption", { required: true })}
                      className="px-4 py-3 focus:outline-none border border-gray-200 rounded-md "
                      type="text"
                    />
                  </label>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className=" flex flex-col gap-5 ">
                <div className=" flex items-center justify-between ">
                  <h1 className=" text-xl text-green-500 font-semibold ">
                    <span>{totalQuizes.length > 0 ? currentQuize : 0}.</span>
                    <span className="ml-3">{quize?.quizeName}</span>
                  </h1>
                  <div className=" flex items-center gap-5 ">
                    <button onClick={() => setEdit(true)} className="btn">
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveQuizes(quize?.id)}
                      className="btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className=" grid grid-cols-2 gap-5 ">
                  {quize?.options?.map((item, index) => (
                    <button
                      key={index}
                      className=" flex items-center gap-1 px-4 py-3 hover:bg-gray-200 rounded-md "
                    >
                      <span className="text-xl font-bold text-sky-800 uppercase ">
                        {quizeOptions[index]})
                      </span>
                      <p className=" text-blue-500 ">{item}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )
        ) : (
          ""
        )}
      </div>

      {/* submit button */}
      <div>
        <button
          onClick={handleDataStore}
          disabled={!isConfirmReach}
          className={` mt-5 w-full px-4 py-3 rounded-md ${
            isConfirmReach
              ? "bg-blue-600 hover:bg-blue-500 active:bg-blue-400 transition-all duration-95 active:scale-95 text-white "
              : "border border-gray-200 text-black font-bold "
          }     `}
        >
          Submit Quizes
        </button>
      </div>
    </div>
  );
}
