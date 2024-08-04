import connect from "@/mongodb";
import Course from "@/mongodb/models/createCourseModel";
import { NextResponse } from "next/server";

// mongodb connection
connect();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const search = searchParams.get("search");
    const filters = searchParams.get("filters");

    const skip = (page - 1) * limit;
    let filter = {};

    if (search) {
      filter["$text"] = { $search: search };
    }

    if (filters) {
      filter.courseCategory = { $regex: new RegExp(filters, "i") };
    }


    const total = await Course.countDocuments(filter);

    const coursesData = await Course.find(filter).skip(skip).limit(limit);

    return NextResponse.json({ total, coursesData });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
