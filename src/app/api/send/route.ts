import { NextResponse } from "next/server";
import { transporter } from "@/src/lib/mailer";

export async function POST(req: Request) {
  const { to, subject, text } = await req.json();

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error sending mail:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
