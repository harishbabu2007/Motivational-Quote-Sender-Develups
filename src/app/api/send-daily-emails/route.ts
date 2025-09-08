import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { transporter } from "@/src/lib/mailer";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @returns NextResponse
 * @description Find All Prompts and return
 */

async function get_random_quote() {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    return data?.quote;
  } catch (err) {
    console.error("Error fetching quote:", err);
    return "Stay motivated!";
  }
}

async function sendDailyEmails() {
  const client = await clientPromise;
  const db = client.db("motivation-app");

  const users = await db
    .collection("users")
    .find({}, { readConcern: { level: "majority" } })
    .toArray();

  console.log(
    "Users to email:",
    users.map((u) => u.email)
  );

  const batchSize = 50;

  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);

    await Promise.allSettled(
      batch.map(async (user) => {
        try {
          const quote = await get_random_quote();

          await transporter.sendMail({
            from: `"Motivation Quotes" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Your Daily Motivation... :) | FROM DEVLUPS",
            html: `
              <div style="padding:10px;">
                <h2>Good Morning! Here's a quote to start your day:</h2>
                <p>${quote}</p>
                <hr />
                <p style="font-size:12px; color:gray;">
                  If you no longer want these emails, 
                  <a href="${process.env.APP_URI}/api/unsubscribe?email=${encodeURIComponent(user.email)}">
                  Unsubscribe
                  </a>
                </p>
              </div>
            `,
          });

          console.log("Sent to:", user.email);
        } catch (err) {
          console.error("Failed sending to:", user.email, err);
        }
      })
    );
  }

  console.log("Total users emailed:", users.length);
  return users.length;
}

export async function GET() {
  console.log("Cron triggered at:", new Date().toISOString());

  try {
    const totalSent = await sendDailyEmails();
    return NextResponse.json({ success: true, sent: totalSent });
  } catch (err: any) {
    console.error("Error in cron:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
