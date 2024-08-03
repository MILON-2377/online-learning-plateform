"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const total = Number(totalPages);

  if (isNaN(total) || total <= 1) return null;

  const pageNumbers = Array.from({ length: total }, (_, index) => index + 1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      {pageNumbers.slice(0,2).map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`mx-1 px-4 py-2 border border-gray-200 rounded-md ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
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
