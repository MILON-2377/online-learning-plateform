import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const id = req.query;
        console.log(id);

        return NextResponse.json({message:"success"});

    } catch (error) {
        çonsole.log(error.message);
        return NextResponse.json({message:"data not loading", error:error.messsage});
    }
}