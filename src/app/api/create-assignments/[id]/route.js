import { NextResponse } from "next/server";
import connect from "@/mongodb";
import Assignments from "@/mongodb/models/assignmentsModels";

// mongodb connetion
connect();

export async function GET(req) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    const assignment = await Assignments.findById({ _id: id });

    return NextResponse.json({
      message: "success from single assignment data laoding ",
      assignment,
    });
  } catch (error) {
    çonsole.log(error.message);
    return NextResponse.json({
      message: "data not loading",
      error: error.messsage,
    });
  }
}
