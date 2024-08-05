import connect from "@/mongodb";
import BuyCourses from "@/mongodb/models/buyCourseModel";
import { NextResponse } from "next/server";


// mongodb connection
connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const {userId,courseId} = reqBody;

        const courseArray = Array.isArray(courseId) ? courseId : [courseId];

        const user = await BuyCourses.findOne({userId});

        if(!user){
            const newDocument = new BuyCourses(reqBody);
            const saveDocument = await newDocument.save();

            return NextResponse.json(saveDocument);
        }

        const updateQuery = {
            $push: {courseId: {$each:courseArray}},
        }
        const updateDocument = await BuyCourses.findOneAndUpdate({userId},updateQuery, {new:true});


        return NextResponse.json(updateDocument);
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message:error.message});
    }   
}