import { NextResponse } from "next/server";
import getAllSomething from "@/lib/dbExample";

export async function GET(request: Request) {
    const something = await getAllSomething();

    return NextResponse.json(something);
}