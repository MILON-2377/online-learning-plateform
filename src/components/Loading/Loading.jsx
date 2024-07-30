"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>
  );
}
