"use client";

import axios from "axios";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewAssignment() {
  const params = useParams();
  const [assignment, setAssignment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/create-assignments/${params.id}`);

      if (res.data.assignment) {
        setAssignment(res.data.assignment);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(assignment);

  return (
    <div>
      <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
        <article className="space-y-8  text-gray-50">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-600 md:text-5xl">
              {assignment.description}
            </h1>
            <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-400">
              <div className="flex items-center md:space-x-2">
                <Image
                  src={assignment.photo}
                  alt="student photo"
                  className="w-4 h-4 mr-1 border rounded-full bg-gray-500 border-gray-700"
                />
                <p className="text-sm"><span>Leroy Jenkins</span> • <span>July 19th, 2021</span></p>
              </div>
              <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                4 min read • 1,570 views
              </p>
            </div>
          </div>
          <div className="text-gray-600">
            <span className="text-xl font-bold text-gray-600 ">
              Instructions:
            </span>
            <p>{assignment.instructions}</p>
          </div>
        </article>
        <div>
          {/* <div className="flex flex-wrap py-6 gap-2 border-t border-dashed border-gray-400">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-3 py-1 rounded-sm hover:underline bg-violet-400 text-gray-900"
            >
              #MambaUI
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-3 py-1 rounded-sm hover:underline bg-violet-400 text-gray-900"
            >
              #TailwindCSS
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-3 py-1 rounded-sm hover:underline bg-violet-400 text-gray-900"
            >
              #Angular
            </a>
          </div> */}

          <div className="divider">And</div>

          <div className="space-y-2">
            {/* <h4 className="text-lg font-semibold text-gray-600 text-center ">Submission Details</h4> */}
            <ul className=" space-y-1  ">
              <li>
                <span className="text-xl text-gray-600 font-bold ">Marks:</span>
                <span
                  className={
                    assignment.marks === 0
                      ? "ml-2 text-xl text-red-500 "
                      : "ml-2 text-xl "
                  }
                >
                  {assignment.marks === 0 ? "0(Zero)" : assignment.marks}
                </span>
              </li>
              <li>
                <span className="text-xl text-gray-600 font-bold ">
                  SubmissionStatus:
                </span>
                <span className="ml-2 text-xl text-yellow-300 ">
                  {assignment.submitted}
                </span>
              </li>
              <li>
                {assignment.status === "Pending" ? (
                  <>
                    <span className="text-xl text-gray-600 font-bold ">
                      Due Date:
                    </span>
                    <span className="ml-2 text-xl text-gray-600 ">
                      {assignment.dueDate}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl text-gray-600 font-bold ">
                      Submitted At:
                    </span>
                    <span className="ml-2 text-xl text-gray-600 ">
                      {assignment.submittedDate}
                    </span>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* button section */}
        <div>
          {assignment.status === "Pending" ? (
            <>
              <button className=" transition-all border-none duration-300 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-400 active:scale-95 text-white rounded-md ">
                Give Mark
              </button>
            </>
          ) : (
            <>
              <button className=" transition-all border-none duration-300  px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-400 active:scale-95 text-white rounded-md ">
                Give Mark
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
