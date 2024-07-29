"use client";

import { useRouter } from "next/navigation";

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`/assignments?page=${page}`);
  };

  return (
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        Previos
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`mx-1 px-4 py-2 border border-gray-200 rounded-md ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
