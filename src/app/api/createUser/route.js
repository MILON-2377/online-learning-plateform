import connect from "@/mongodb";
import Users from "@/mongodb/models/userModels";
import { NextResponse } from "next/server";


// mongodb connnectiion
connect();

// user create api
export async function POST(req){


    try {
        const reqBody = await req.json();
        const { userName, email, profession} = reqBody;

        const isUserExist = await Users.findOne({email});

        if(isUserExist){
            return NextResponse.json({message:"this email is already used?"});
        }

        const newUser = new Users({ userName, email, profession});
        const user = await newUser.save();
    
        return NextResponse.json({message:"success", user});
    } catch (error) {
        return NextResponse.json({error:"something went wrong to create user", error});
    }
}


// user get api
export async function GET(req){
    try {
        const {searchParams} = new URL(req.url);
        const email = searchParams.get("email");
    
        const user = await Users.findOne({email});
    
        if(!user){
            return NextResponse.json({message:"user not found"}, {status:404});
        }

        return NextResponse.json({message:"success", user});
    } catch (error) {
        return NextResponse.json({error:"something went wrong to find the user", error});
    }

}