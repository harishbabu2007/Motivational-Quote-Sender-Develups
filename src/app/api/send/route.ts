import { NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

export async function POST(req: Request) {
  const { to, subject, text } = await req.json();

  try {
    await transporter.sendMail({
      from: `"Motivation Quotes" <${process.env.BREVO_FROM}>`,
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error sending mail:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
