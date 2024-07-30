import connect from "@/mongodb";
import Assignments from "@/mongodb/models/assignmentsModels";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { isDate } from "date-fns";

// mongodb connection
connect();

// create assignments api
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { title, description, dueDate, subject, priority, instructions } =
      reqBody;

    const createAssignments = new Assignments({
      title,
      description,
      dueDate,
      subject,
      priority,
      instructions,
    });
    // console.log(reqBody);
    const saveAssignments = await createAssignments.save();

    return NextResponse.json({
      message: "Assignments created successfully",
      saveAssignments,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "server responded with an error", error: error.message },
      { status: 500 }
    );
  }
}

// get assignments data
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const filters = searchParams.get("filters");
    const search = searchParams.get("search");
    const parseFilters = filters ? JSON.parse(decodeURIComponent(filters)) : {};

    const skip = (page - 1) * limit;

    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { subject: { $regex: new RegExp(search, "i") } },
      ];

      if (isDate(search)) {
        filter.dueDate = new Date(search);
      }
    }

    if (parseFilters.subject) {
      filter.subject = { $regex: new RegExp(parseFilters.subject, "i") };
    }
    if (parseFilters.dueDate) {
      filter.dueDate = { $regex: new RegExp(parseFilters.dueDate, "i") };
    }
    if (parseFilters.status) {
      filter.status = { $regex: new RegExp(parseFilters.status, "i") };
    }
    if (parseFilters.submitted) {
      filter.submitted = { $regex: new RegExp(parseFilters.submitted, "i") };
    }

    // console.log(filter);
    const total = await Assignments.countDocuments();
    const assignmentsData = await Assignments.find(filter)
      .skip(skip)
      .limit(limit);

    //   console.log(assignmentsData);
    return NextResponse.json({ message: "success", total, assignmentsData });
  } catch (error) {
    // console.log(error.messaeg)
    return NextResponse.json({
      message: "something went wrong",
      error: error.message,
    });
  }
}

// delete assignments
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const objectId = new ObjectId(id);
    const deleteAssignments = await Assignments.deleteOne({ _id: objectId });

    return NextResponse.json({ messaeg: "success", deleteAssignments });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "assignments delete errors",
      error: error.message,
    });
  }
}
