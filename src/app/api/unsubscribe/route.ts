import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const client = await clientPromise;
    const db = client.db("motivation-app");
    const users = db.collection("users");

    await users.deleteOne({ email });

    return NextResponse.redirect(new URL("/unsubscribed", req.url));
  } catch (err) {
    console.error("Error unsubscribing:", err);
    return NextResponse.redirect(
      new URL("/unsubscribed", req.url)
    );
  }
}
