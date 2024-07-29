import connect from "@/mongodb";
import Assignments from "@/mongodb/models/assignmentsModels";
import { NextResponse } from "next/server";

export async function POST(req){
    await connect();
    try {
        const reqBody = await req.json();
        const {
            title,
            description,
            dueDate,
            subject,
            priority,
            instructions,
          } = reqBody;


        const createAssignments = new Assignments({title, description, dueDate, subject, priority, instructions});
        const saveAssignments = await createAssignments.save();

        return NextResponse.json({message:"Assignments created successfully", saveAssignments });
        
    } catch (error) {
        return NextResponse.json({message:"server responded with an error", error:error.message}, {status:500})
    }
}