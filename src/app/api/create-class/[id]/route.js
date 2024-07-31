import recordedClass from "@/mongodb/models/recordedClassModels";
import { NextResponse } from "next/server";


export async function GET(req){
    try {
        const {pathname} = new URL(req.url);
        const id = pathname.split("/").pop();

        const classData = await recordedClass.findById({_id:id});

        return NextResponse.json({message:"success", classData});
    } catch (error) {
        
        return NextResponse.json({message:"error in the server when try to load classes data", error:error.message});
    }
}


// delete class data api
export async function DELETE(req){
    try {
        const {pathname} = new URL(req.url);
        const id = pathname.split("/").pop();

        const deleteClass = await recordedClass.findByIdAndDelete({_id:id});

        if(!deleteClass){
            return NextResponse.json({message:"class does not deleted "});
        };

        return NextResponse.json({message:"delete success", deleteClass});

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message:"delete class not work ", error:error.message});
    }
}