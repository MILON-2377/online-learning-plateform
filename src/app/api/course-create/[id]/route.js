import connect from "@/mongodb";
import Course from "@/mongodb/models/createCourseModel";
import { NextResponse } from "next/server";

// mongodb connection
connect();

export async function GET(req) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  // console.log(id);

  try {
    const courseData = await Course.findById({ _id: id });

    if (!courseData) {
      return NextResponse.json({ message: "there is no data found" });
    }

    return NextResponse.json(courseData);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message });
  }
}

// delete course api
export async function DELETE(req) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  try {
    const deleteCourse = await Course.findByIdAndDelete({ _id: id });

    if (!deleteCourse) {
      return NextResponse.json({ message: "course does not deleted" });
    }

    return NextResponse.json({
      message: "course delete success",
      deleteCourse,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message });
  }
}

// update course
export async function PUT(req) {
  try {
    const reqBody = await req.json();
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    const filter = { _id: id };

    const updateData = {
      $set: reqBody,
    }

    const updateCourse = await Course.findOneAndUpdate(filter, updateData, {
      new: true,
      upsert: true,
    });

    if (!updateCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "success", updateCourse });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message });
  }
}
