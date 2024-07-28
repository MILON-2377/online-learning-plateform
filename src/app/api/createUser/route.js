import connect from "@/mongodb";
import Users from "@/mongodb/models/userModels";
import { NextResponse } from "next/server";


export async function POST(req){

    await connect();

    try {
        const reqBody = await req.json();
        const { userName, email, profession} = reqBody;
        const newUser = new Users({ userName, email, profession});
        const user = await newUser.save();
    
        return NextResponse.json({message:"success", user});
    } catch (error) {
        return NextResponse.json({error:"something went wrong to create user", error});
    }
}