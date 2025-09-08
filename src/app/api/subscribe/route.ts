import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { transporter } from "@/src/lib/mailer";

async function send_welcome_email(email: string) {
  await transporter.sendMail({
    from: `"Motivation Quotes" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Daily Motivation... :) | FROM DEVLUPS",
    html: `
              <div style="padding:10px;">
              <h2>Thanks for subscribing to QuoteFlow. u will now receive a motivational quote everyday at 7:30am IST</h2>
              <hr />
              <p style="font-size:12px; color:gray;">
                  If you no longer want these emails, 
                  <a href="${process.env.APP_URI}/api/unsubscribe?email=${encodeURIComponent(
                    email
                  )}">
                  Unsubscribe
                  </a>

              </p>
              </div>
          `,
  });
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const client = await clientPromise;
    
    const db = client.db("motivation-app");
    const users = db.collection("users");

    const users_length = (await db.collection("users").find().toArray()).length;

    if (users_length > 100){
      return NextResponse.json( 
        { success: false, error: "Full"},
      )
    }

    const existing = await users.findOne({ email });
    
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Already subscribed" },
      );
    }

    await users.insertOne({ email, createdAt: new Date() });

    await send_welcome_email(email);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error subscribing:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
