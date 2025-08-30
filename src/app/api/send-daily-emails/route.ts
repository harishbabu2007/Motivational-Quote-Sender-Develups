import { NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("motivation-app");

    const users = await db.collection("users").find().toArray();

    for (const user of users) {
      const quote = "All the Best. This is the quote";

      await transporter.sendMail({
        from: `"Motivation Quotes" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Your Daily Motivation... :) | FROM DEVELUPS",
        html: `
            <div style="padding:10px;">
            <h2>Good Morning! Here's a nice quote to get ur day started....</h2>
            <p>${quote}</p>
            <hr />
            <p style="font-size:12px; color:gray;">
                If you no longer want these emails, 
                <a href="https://your-app.com/api/unsubscribe?email=${encodeURIComponent(
                  user.email
                )}">
                Unsubscribe
                </a>

            </p>
            </div>
        `,
      });
    }

    return NextResponse.json({ success: true, sent: users.length });
  } catch (err: any) {
    console.error("Error sending daily emails...", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
