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
    const parseFilters = filters ? JSON.parse(decodeURIComponent(filters)) : {};

    console.log(teacherId);

    const skip = (page - 1) * limit;
    let filter = {teacherId};

    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { subject: { $regex: new RegExp(search, "i") } },
      ];

      if (isDate(search)) {
        filter.dueDate = new Date(search);
      }
    }

    // if (parseFilters.subject) {
    //   filter.subject = { $regex: new RegExp(parseFilters.subject, "i") };
    // }
    // if (parseFilters.dueDate) {
    //   filter.dueDate = { $regex: new RegExp(parseFilters.dueDate, "i") };
    // }
    // if (parseFilters.status) {
    //   filter.status = { $regex: new RegExp(parseFilters.status, "i") };
    // }
    // if (parseFilters.submitted) {
    //   filter.submitted = { $regex: new RegExp(parseFilters.submitted, "i") };
    // }

    // console.log(filter);
    const total = await Course.countDocuments();
    const coursesData = await Course.find(filter)
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