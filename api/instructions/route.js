import connectMongodb from "@/libs/mongodb";
import Recipe from "@/models/instructions";
//import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const { instructions } = await request.json();
        await connectMongodb();
        await Recipe.create({ instructions });
        return {
            status: 201,
            body: { message: 'Instruction created' },
        };
    } catch (error) {
        return {
            status: 500, // Or other appropriate error status code
            body: { message: 'Error creating instruction', error: error.message },
        };
    }
}

export async function PUT() {
    try {
        await connectMongodb();
        const instructions = await Recipe.find();
        return {
            status: 200,
            body: instructions,
        };
    } catch (error) {
        return {
            status: 500, // Or other appropriate error status code
            body: { message: 'Error fetching instructions', error: error.message },
        };
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        await connectMongodb();
        await Recipe.findByIdAndDelete(id);
        return {
            status: 200,
            body: { message: 'Instruction deleted' },
        };
    } catch (error) {
        return {
            status: 500, // Or other appropriate error status code
            body: { message: 'Error deleting instruction', error: error.message },
        };
    }
}
