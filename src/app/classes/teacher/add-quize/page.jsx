"use client";

export default function AddQuizes() {
  return (
    <div className="p-10">
      <div className="p-5 border-b border-gray-200 lg:w-[50%] md:w-[90%] w-[95%] mx-auto ">
        <h1 className="text-3xl font-bold text-gray-600 text-center ">
          Create a New Quize
        </h1>
      </div>

      <div>
        <form>
          {/* form section */}
          <div>
            <label className="flex flex-col gap-1">
              <span className="text-gray-600 text-xl font-semibold ">Subject</span>
              <select 
              defaultValue=""
              className="select select-bordered w-full max-w-xs">
                <option disabled  value="">
                  Select subject
                </option>
                <option>Math</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
                <option>English</option>
              </select>
            </label>
          </div>

          {/* add quize section */}
          <div className=" flex items-center justify-center ">
            <button className=" px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-500 active:bg-blue-400 active:scale-95 transition-all duration-95 ">
              Add Quize
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
