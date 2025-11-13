import { connectDB } from "@/backend/lib/mongodb";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        
    } catch (error) {

    }
}