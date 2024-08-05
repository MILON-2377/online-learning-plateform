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
    const sorts = searchParams.get("sort");

    const skip = (page - 1) * limit;
    const filter = {};
    const sort = {};

    if (search) {
      filter["$text"] = { $search: search };
    }

    if (filters) {
      filter.courseCategory = { $regex: new RegExp(filters, "i") };
    }

    if (sorts) {
      if (sorts === "Low to high") {
        sort.courseFee = 1;
      } else {
        sort.courseFee = -1;
      }
    }

    const total = await Course.countDocuments();

    const coursesData = await Course.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ total, coursesData });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
