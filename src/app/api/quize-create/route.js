import connect from "@/mongodb";
import Quizes from "@/mongodb/models/quizesModel";
import { NextResponse } from "next/server";


export async function POST(req) {
  await connect();
  try {
    const reqBody = await req.json();
    
    
    const newDocument = new Quizes(reqBody);

    const savedDocument = await newDocument.save();

    return NextResponse.json({ message: "Success",savedDocument});
  } catch (error) {
    
    console.error("Error saving document:", error.message);
    return NextResponse.json(
      { message: "Error saving document", error: error.message },
      { status: 500 }
    );
  }
}
