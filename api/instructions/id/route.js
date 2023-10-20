import connectMongodb from "@/libs/mongodb";
import Recipe from "@/models/instructions"; // Assuming "Recipe" is the correct model name
import { NextResponse } from "next/server";

export async function upDateInstructions(request, { params }) {
    const { id } = params;
    const { instructions } = await request.json();
    
    try {
        await connectMongodb();
        await Recipe.findByIdAndUpdate(id, { instructions });
        return NextResponse.json({ message: 'Instructions updated' }, { status: 200 });
    } catch (error) {
        return NextResponse.error(error, { status: 500 });
    }
}
