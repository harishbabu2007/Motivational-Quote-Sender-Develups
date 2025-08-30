"use server";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid";

const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (!sendgridApiKey) {
  throw new Error("SENDGRID_API_KEY environment variable is not set.");
}

export const transporter = nodemailer.createTransport(
  sgTransport({
    apiKey: sendgridApiKey,
  })
);

export async function sendMail(to: string, subject: string, text:string) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
  });
}
