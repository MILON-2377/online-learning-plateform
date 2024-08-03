import connect from "@/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { isDate } from "date-fns";
import Course from "@/mongodb/models/createCourseModel";

// mongodb connection
connect();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get("email");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const filters = searchParams.get("filters");
    const search = searchParams.get("search");
    // const parseFilters = filters ? JSON.parse(decodeURIComponent(filters)) : {};

    const skip = (page - 1) * limit;
    let filter = {};
    let sort = {};

    // apply teacherId filter
    if (teacherId) {
      filter.teacherId = teacherId;
    }

    if (search) {
      filter["$text"] = { $search: search };
    }

    // sorting apply
    if (filters) {
      if (filters === "Course Fee Low to High") {
        sort.courseFee = 1;
      } else {
        sort.courseFee = -1;
      }
    }

    // console.log(filter);
    const total = await Course.countDocuments();
    const coursesData = await Course.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    //   console.log(coursesData);
    return NextResponse.json({ message: "success", total, coursesData });
  } catch (error) {
    // console.log(error.messaeg)
    return NextResponse.json({
      message: "something went wrong",
      error: error.message,
    });
  }
}
