import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const client = await clientPromise;
    
    const db = client.db("motivation-app");
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Already subscribed" },
        { status: 400 }
      );
    }

    await users.insertOne({ email, createdAt: new Date() });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error subscribing:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
