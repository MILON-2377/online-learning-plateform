import Course from "@/mongodb/models/createCourseModel";
import { NextResponse } from "next/server";

export async function GET(req){
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    // console.log(id);

    try {
        const courseData = await Course.findById({_id:id});

        if(!courseData){
            return NextResponse.json({message:"there is no data found"});
        }

        return NextResponse.json(courseData);
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message:error.message});
    }
};