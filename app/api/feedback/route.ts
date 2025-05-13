import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, type, page, steps, featureTitle, featureBenefit } = body;

    // Validate input
    if (!name || !email || !subject || !message || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare email content based on feedback type
    let emailContent = `
      <h2>New ${type} Submission</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Add additional fields based on feedback type
    if (type === "bug" && page) {
      emailContent += `<p><strong>Page:</strong> ${page}</p>`;
    }
    if (type === "bug" && steps) {
      emailContent += `<p><strong>Steps to Reproduce:</strong></p><p>${steps}</p>`;
    }
    if (type === "feature" && featureTitle) {
      emailContent += `<p><strong>Feature Title:</strong> ${featureTitle}</p>`;
    }
    if (type === "feature" && featureBenefit) {
      emailContent += `<p><strong>Feature Benefit:</strong></p><p>${featureBenefit}</p>`;
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `[${type.toUpperCase()}] ${subject}`,
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Feedback sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending feedback:", error);
    return NextResponse.json(
      { error: "Failed to send feedback. Please try again later." },
      { status: 500 }
    );
  }
} 