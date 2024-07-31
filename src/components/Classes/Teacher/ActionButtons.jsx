"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ActionButtons() {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  const ref = useRef();

  useEffect(() => {
    const hoverHanlde = (e) => {
      if (e.target) {
        setIsHover(false);
      }
    };

    window.addEventListener("click", hoverHanlde);

    return () => window.removeEventListener("click", hoverHanlde);
  }, []);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsHover(true)}
        className="px-4 py-2 rounded-md border border-r-amber-200 font-bold hover:bg-gray-100 active:bg-gray-200  "
      >
        Actions
      </button>

      {/* hover menu */}
      <div
        onMouseLeave={() => setIsHover(false)}
        className={
          isHover
            ? ` absolute right-1 rounded-md top-12 bg-gray-200 p-5 w-[300px] flex flex-col gap-3  z-10 `
            : "hidden"
        }
      >
        <button
          onClick={() => router.push(`/classes/teacher/makeClass`)}
          className=" px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-500 active:scale-95 active:bg-blue-300 transition-all duration-300 "
        >
          create Class
        </button>
        <button
          onClick={() => router.push(`/classes/teacher/makeClass`)}
          className=" px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-500 active:scale-95 active:bg-blue-300 transition-all duration-300 "
        >
          Go Live
        </button>
      </div>
    </div>
  );
}
