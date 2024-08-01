import connect from "@/mongodb";
import recordedClass from "@/mongodb/models/recordedClassModels";
import { NextResponse } from "next/server";

// mongodb connection
connect();

// create recorded class
export async function POST(req) {
  try {
    const reqBody = await req.json();

    // console.log(reqBody)

    const newClass = new recordedClass(reqBody);

    const saveClass = await newClass.save();

    return NextResponse.json({ message: "success", saveClass });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error happend in the create-class api",
      error: error.message,
    });
  }
}

// classes data loading api
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    const filter = { teacherId: email };

    if (search) {
      filter.$or = [
        { teacherId: { $regex: new RegExp(email, "i") } },
        { title: { $regex: new RegExp(search, "i") } },
        { subject: { $regex: new RegExp(search, "i") } },
      ];
    }

    const total = await recordedClass.countDocuments(filter);
    const classesData = await recordedClass.find(filter).skip(skip).limit(10);

    return NextResponse.json({ message: "success", classesData, total });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "class data not loaded , something heppening in the server",
      errro: error.message,
    });
  }
}
